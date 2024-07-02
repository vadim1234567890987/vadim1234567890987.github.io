$(document).ready(function () {
  function loadRecords() {
    $.ajax({
      url: 'view_all_records.php',
      dataType: 'json',
      success: function (allRecords) {
        // Сортуємо записи за датою
        allRecords.sort(function (a, b) {
          return new Date(b.date) - new Date(a.date);
        });

        var recordList = $('.main_panel_records');
        var currentDate = '';
        var dailySum = 0;
        var dailyRecords = [];

        allRecords.forEach(function (record, index) {
          var signClass = record.sign === '+' ? 'positive' : 'negative';
          var formattedDate = formatDate(record.date);

          // Якщо дата змінилась, додаємо заголовок з датою та записами
          if (currentDate !== formattedDate) {
            if (currentDate !== '') {
              // Додаємо заголовок дати з підсумковою сумою та відповідні записи
              var dateHeader = `<div class="transaction_header">
                                  <div class="transaction_date">${currentDate}</div>
                                  <div class="total_sum">${dailySum.toLocaleString('uk-UA', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/\s/g, ' ')} грн</div>
                                </div>`;
              recordList.append(dateHeader);
              dailyRecords.forEach(function (dailyRecord) {
                recordList.append(dailyRecord);
              });
            }
            currentDate = formattedDate;
            dailySum = 0;
            dailyRecords = [];
          }

          // Оновлюємо щоденну суму
          var amount = parseFloat(record.amount);
          if (record.sign === '+') {
            dailySum += amount;
          } else {
            dailySum -= amount;
          } 

          // Форматуємо суму
          var formattedAmount = amount.toLocaleString('uk-UA', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/\s/g, ' ');

          var insertRecord = `
          <div class="transaction_item_container" style="${index === allRecords.length - 1 || allRecords[index + 1].date !== record.date ? '' : 'margin-top: 9.8px;'}">
            <div class="transaction_item_checkbox">
              <input type="checkbox"> 
            </div>
            <div class="transaction_item" style="cursor: pointer" data-id="${record.id}" data-transaction='{"sign": "${record.sign}", "amount": "${amount}", "category": "${record.category_name}", "category_color": "${record.category_color}", "category_icon": "${record.category_icon}", "category_class": "${record.category_class}", "date": "${record.date}", "time": "${record.time}"}'>
              <div>
                <div class="transaction_category">
                  <div class="icon-option" name="icon_option" type="html">
                    <div class="icon-circle" style="background-color: ${record.category_color}; font-size: 23px;">
                      <span class="${record.category_class}">${record.category_icon}</span>
                    </div>
                    <span class="label">${record.category_name}</span>
                  </div>
                </div>
              </div>
              <div style="margin: 14px 0 0 8px; font-size: 10px;"><b>${record.time}</b></div>
              <div class="amount ${signClass}" style="margin-left: auto">${record.sign} ${formattedAmount} грн</div>
              <div class="dropdown_records">
                <button class="dropbtn">⋮</button>
                <div class="dropdown-content">
                  <a href="#" class="edit-record">Редагувати</a>
                  <a href="#" class="delete-record">Видалити</a>
                </div>
              </div>
            </div>
          </div>`;
          dailyRecords.unshift(insertRecord);
        });

        // Додаємо останній заголовок дати з підсумковою сумою та відповідні записи
        if (currentDate !== '') {
          var dateHeader = `<div class="transaction_header">
                              <div class="transaction_date">${currentDate}</div>
                              <div class="total_sum">${dailySum.toLocaleString('uk-UA', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/\s/g, ' ')} грн</div>
                            </div>`;
          recordList.append(dateHeader);
          dailyRecords.forEach(function (dailyRecord) {
            recordList.append(dailyRecord);
          });
        }
      }
    });
  }

  function formatDate(dateString) {
    var today = new Date();
    var date = new Date(dateString);

    var day = date.getDate();
    var monthNames = ['Січня', 'Лютого', 'Березня', 'Квітня', 'Травня', 'Червня', 'Липня', 'Серпня', 'Вересня', 'Жовтня', 'Листопада', 'Грудня'];
    var month = monthNames[date.getMonth()];

    var yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Сьогодні';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Учора';
    } else {
      return `${day} ${month}`;
    }
  }

  loadRecords();

  // function changeForm(transaction) {
  //   $('#shake_menu').removeClass('shake_animation');
  //   if ($('.screen').length === 0) {
  //     $('.menu_btn').append($('#formTemplate').html());
  //   } else {
  //     $('.screen').css('display', 'block');
  //   }
  //   // Заповнюємо поля форми даними транзакції
  //   $('#inpSum').val(transaction.amount);
  //   $('#sign').val(transaction.sign);
  //   $('#selectedItem').html(`
  //       <div class="icon-option" name="icon_option" type="html">
  //           <div class="icon-circle" style="background-color: ${transaction.category_color}; font-size: 23px;">
  //               <span class="${transaction.category_class}">${transaction.category_icon}</span>
  //           </div>
  //           <span class="label">${transaction.category}</span>
  //       </div>
  //   `);
  //   $('#categoryInput').val(transaction.category);
  //   $('#dataToday').val(transaction.date);
  //   $('#timePicker').val(transaction.time);

  //   // Зміна тексту заголовку форми
  //   $('.header_window span:first-child').text('ЗМІНИТИ ЗАПИС');

  //   // Заміна кнопок
  //   $('#submitButton').text('Зберегти');
  //   $('#submitButton1').replaceWith('<button class="to_add_a_record-btn" type="button" id="returnButton">Повернути</button>');

  //   // Додавання обробника події для кнопки "Повернути"
  //   $('#returnButton').on('click', function () {
  //     $('.screen').css('display', 'none');
  //   });

  //   $('#inpSum').focus();
  //   $('body').css({ 'overflow': 'hidden' });
  //   $('.record_form_menu a').removeClass('selected selectedNot');
  //   $('.point.1').addClass('selected');
  //   currentSelection = 'Витрати';
  // }

  // $(document).on('click', '.transaction_item', function () {
  //   var transaction = JSON.parse($(this).attr('data-transaction'));
  //   changeForm(transaction);
  // });
});
