$(document).ready(function () {

  var currentSelection;

  // "Витрати", "Дохід"...
  $(document).on('click', '.record_form_menu a', function () {
    currentSelection = $(this).text();
    // Підсвічуємо обраний пункт
    $('.record_form_menu a').removeClass('selected').removeClass('selectedNot');
    if (currentSelection === 'Витрати' || currentSelection === 'Дохід') {
      $('#inpSum').focus();
    }
    $(this).addClass(currentSelection === 'Переказ' ? 'selectedNot' : 'selected');
    updateIcon(currentSelection);
  });

  function updateIcon(currentSelection) {
    const inpSum = $('.input');
    const shakeMenu = $('#shake_menu');
    const signField = $('#sign');
    let sign = ''; 
    
    // Зміна значка "+, -"
    if (currentSelection === 'Витрати') {
      sign = '−';
      inpSum.css('--input-before-content', '"−"');
      shakeMenu.removeClass('shake_animation');
    } else if (currentSelection === 'Дохід') {
      sign = '+';
      inpSum.css('--input-before-content', '"+"');
      shakeMenu.removeClass('shake_animation');
    } else if (currentSelection === 'Переказ') {
      sign = '✖';
      inpSum.css('--input-before-content', '"✖"');
      shakeMenu.addClass('shake_animation');
    }
    signField.val(sign);
  };

  // Функція для обробки кліку на кнопки
  function showForm() {
    $('#shake_menu').removeClass('shake_animation');
    if ($('.screen').length === 0) {
      $('.header_data').append($('#formTemplate').html());
      renderCategories();
      DateTimePickers();
    } else {
      $('.screen').css('display', 'block');
    }
    $('#inpSum').focus();
    $('body').css({ 'overflow': 'hidden' });
    // $('.header_window span:first-child').text('ДОДАТИ ЗАПИС');
    $('.record_form_menu a').removeClass('selected selectedNot');
    $('.point.1').addClass('selected');
    // $('#submitButton').text('Зберегти');
    // $('#submitButton1').text('Додати і створити ще один');
    currentSelection = 'Витрати';
    renderCategories();
    DateTimePickers();
  }

  // Прив'язка функції до кнопок "+ запис"
  $('#addEntry, #addEntry1').click(showForm);

  // Випадання списку категорій
  $(document).on('click', '#FMLeft', function () {
    $('#category_select').toggle();
  });

  // Вибір категорії
  $(document).on('click', '.selectItem', function () {
    const categoryData = {
      color: $(this).find('.icon-circle').css('background-color'),
      class: $(this).find('span').attr('class'),
      icon: $(this).find('.category-icon').text(),
      name: $(this).find('.label').text()
    };

    // Оновлюємо відображення вибраного елемента
    const selectItemHTML = $(this).html();
    $('#selectedItem').html(selectItemHTML);

    // Зберігаємо значення вибраної категорії у прихованому input у вигляді JSON-об'єкта
    $('#categoryInput').val(JSON.stringify(categoryData));
  });

  // Генерування списку категорій
  function renderCategories() {
    const categoriesHTML = categories.map(category => `
    <li class="selectItem" style="padding: 5.6px 14px;">
      <div class="icon-option" name="icon_option" type="html">
        <div class="icon-circle" style="background-color: ${category.color}; font-size: 23px;">
          <span class="${category.class}">${category.icon}</span>
        </div>
        <span class="label">${category.name}</span>
      </div>
    </li>
  `).join('');
    $('.categories').html(categoriesHTML)
  };
  renderCategories();
  
  // Встановлення дати
  function DateTimePickers() {
    $('#dataToday').val(new Date().toISOString().slice(0, 10));
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    const currentTimeString = `${currentHour}:${currentMinute}`;
    
    flatpickr("#timePicker", {
      enableTime: true,
      dateFormat: "H:i", // Формат виведення тільки часу з секундами
      defaultDate: currentTimeString,
    });
  }
  
  // Функція для закриття меню
  function closeMenu() {
    $('#add_entry-btn').css({ 'display': 'none' });
    $('body').css({ 'overflow': 'auto' });
    $('.record_form_menu a').removeClass('selected selectedNot');
    $('.point.1').addClass('selected');
    $('.input').css('--input-before-content', '"−"');
    $('#inpSum').val('');
    $('#selectedItem').text('Обрати');
  }

  // Прив'язка функції до кнопки закриття меню
  $(document).on('click', '#close', closeMenu);
  
  // При кліці ховати певні елементи
  $(document).on('click', '.screen', function (event) {
    if (event.target.closest('.field_main.left') === null && event.target.closest('.add_record_form_window') === null) {
      $('#category_select').css('display', 'none');
      $('#add_entry-btn').css('display', 'none');
      $('body').css('overflow', 'auto');
    } else if (event.target.closest('.field_main.left') === null) {
      $('#category_select').css('display', 'none');
    }
  });
  
  // Дії при натисканні кнопки Enter
  $(document).keydown(function (event) {
    const form = $('#add_entry-btn');
    if (event.key === 'Enter' && form.css('display') === 'block') {
      event.preventDefault(); // Щоб уникнути додаткової обробки Enter (наприклад, відправлення форми)
      $('#submitButton').click();
    }
  });

  // Дії при нажиманні кнопки +
  $(document).keyup(function (event) {
    if (event.key === '+') {
      $('#add_entry-btn').css({ 'display': 'block' });
      $('#inpSum').focus();
      $('body').css({ 'overflow': 'hidden' });
      $('.record_form_menu a').removeClass('selected selectedNot');
      $('.point.1').addClass('selected');
      currentSelection = 'Витрати';
      return false;
    };
  });

  // Дії при натисканні кнопки +
  $(document).keyup(function (event) {
    if (event.key === '+') {
      showForm()
      return false;
    }
  });

  // Дії при натисканні клавіш + та -
  $(document).keydown(function (event) {
    const categorySelect = $('#category_select');
    const screenDisplay = $('.screen').css('display');
    if (event.key === '+' && screenDisplay == 'block') {
      categorySelect.css({ 'display': 'block' });
    } else if (event.key === '-') {
      if (categorySelect.css('display') === 'none') {
        closeMenu()
      } else {
        categorySelect.css({ 'display': 'none' });
      }
    }
  });

  // Заборона введення лишніх знаків
  $(document).on('keyup', '#inpSum', function (e) {
    if (e.key === '-' || e.key === '+') {
      e.preventDefault();
      $(this).val($(this).val().replace(/[-+]/g, ''));
    }
  });

  $(document).on('click', '#submitButton , #submitButton1', function (event) {
    var selectedItem = $('#selectedItem').text().trim();
    var inpSum = $('#inpSum').val().trim();
    var shake_animation = $('#shake_menu');
    var errorSel = $('#errorSel');
    var errorSum = $('#errorSum');
    var fmLeft = $('#FMLeft');

    var valid = true;

    // Перевірка вибору категорії
    if (selectedItem === "Обрати") {
      shake_animation.addClass('shake_animation');
      errorSel.css({ 'display': 'block' });
      fmLeft.css({ 'border': '1px solid rgb(254, 59, 44)' });
      valid = false;
    } else {
      errorSel.css({ 'display': 'none' });
      fmLeft.css({ 'border': '1px solid rgb(204, 210, 219)' });
    }

    // Перевірка суми
    if (inpSum === "" || inpSum === "0" || isNaN(inpSum) || parseFloat(inpSum) <= 0) {
      shake_animation.addClass('shake_animation');
      errorSum.css({ 'display': 'block' });
      valid = false;
    } else {
      errorSum.css({ 'display': 'none' });
    }

    // Якщо форма заповнена некоректно, блокувати відправку
    if (!valid) {
      event.preventDefault();
    }
  });
});
