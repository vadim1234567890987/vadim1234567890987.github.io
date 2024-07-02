$(document).ready(function () {
  var output = $('#output');
  var outputSum = $('#outputSum span');
  var maxRecords = 5;
  var deletedRecords = [];
  var total_sum = $('.total_sum');

  // Функція для завантаження записів
  function loadRecords() {
    $.ajax({
      url: 'view_records.php',
      dataType: 'json',
      success: function (response) {
        var data = response.records;
        currentSum = response.totalSum;
        total_sum.text(currentSum.toLocaleString('uk-UA', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/\s/g, ' ') + ' грн');
        outputSum.text(currentSum.toLocaleString('uk-UA', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/\s/g, ' ') + ' грн');
        data.forEach(function (record) {
          if (output.children().length >= maxRecords) {
            var lastRecord = output.children().last();
            var lastRecordId = lastRecord.data('id');
            updateRecordVisibility(lastRecordId);
            lastRecord.remove();
          }
          var amount = parseFloat(record.amount).toLocaleString('uk-UA', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/\s/g, ' ');
          var timeAgo = calculateTimeAgo(record.date + ' ' + record.time);
          var signClass = record.sign === '+' ? 'positive' : 'negative';
          var li = `<li data-id="${record.id}" class="saved_record">
                      <div>
                        <div class="icon-option" name="icon_option" type="html">
                          <div class="icon-circle" style="background-color: ${record.category_color}; font-size: 23px;">
                            <span class="${record.category_class}">${record.category_icon}</span>
                          </div>
                          <span class="label">${record.category_name}</span>
                        </div>
                      </div>
                      <div style="padding-left: 10px">
                        <p class="amount time ${signClass}"><b>${record.sign} ${amount} грн</b></p>
                        <p class="timeAgo">${timeAgo}</p>
                      </div>
                    </li>`;
          output.prepend(li);
        });
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error(textStatus, errorThrown);
      }
    });
  }

  function calculateTimeAgo(dateTime) {
    var now = new Date();
    var past = new Date(dateTime);
    var diff = now - past;
    var seconds = Math.floor(diff / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);

    if (days > 0) return `${days} ${getNoun(days, 'день', 'дні', 'днів')} тому`;
    if (hours > 0) return `${hours} ${getNoun(hours, 'годину', 'години', 'годин')} тому`;
    if (minutes > 0) return `${minutes} ${getNoun(minutes, 'хвилину', 'хвилини', 'хвилин')} тому`;
    if (seconds < 60) return `щойно`;
  }

  function getNoun(number, one, few, many) {
    const absNumber = Math.abs(number);
    if (absNumber % 10 === 1 && absNumber % 100 !== 11) {
      return one;
    }
    if (absNumber % 10 >= 2 && absNumber % 10 <= 4 && (absNumber % 100 < 10 || absNumber % 100 >= 20)) {
      return few;
    }
    return many;
  }

  // Функція для зміни видимості запису
  function updateRecordVisibility(recordId) {
    $.ajax({
      url: 'update_visibility.php',
      method: 'POST',
      data: { record_id: recordId },
      success: function () {
        console.log('Запис успішно оновлено.');
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error(textStatus, errorThrown);
      }
    });
  }
  // Завантаження записів при завантаженні сторінки
  loadRecords();

  // Подія для кнопки "Очистити"
  $('#clearRecords').click(function () {

    $('#output .saved_record').each(function () {
      var id = $(this).data('id');
      deletedRecords.push(id);
    });

    $.ajax({
      url: 'delete_records.php',
      method: 'POST',
      data: { deleted_ids: deletedRecords },
      success: function () {
        $('#output').empty();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error(textStatus, errorThrown);
      }
    });
  });
});
