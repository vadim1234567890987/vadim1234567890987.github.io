$(document).ready(function() {
  
  var currentPage = window.location.pathname; // Отримуємо шлях до поточної сторінки
  $('.menu_list_link').each(function () {
    var linkPage = $(this).attr('href'); // Отримуємо шлях посилання з меню
    if (currentPage.startsWith('/') && linkPage === currentPage.substring(1)) {
      $(this).addClass('bold'); // Додаємо клас активного пункту меню
    }
  });

  // Відкривання й закривання субменю
  $('.menu_btn').click(function() {
    if ($('.submenu').css('display') === 'none') {
      $('.submenu').addClass('show');
    } else {
      $('.submenu').removeClass('show');
    }
    $('#body').click(function (event) {
      if (event.target.closest('#menu') === null && event.target.closest('.profile_listbox_position') === null) {
        $('.submenu').removeClass('show');
      }
    });
  });

  const currentDate = new Date();

  const months = [
    'Січень', 'Лютий', 'Березень', 'Квітень',
    'Травень', 'Червень', 'Липень', 'Серпень',
    'Вересень', 'Жовтень', 'Листопад', 'Грудень'
  ];

  let currentMonthIndex = currentDate.getMonth();
  const prevMonthButton = $('#prevMonth');
  const nextMonthButton = $('#nextMonth');
  const currentMonthElement = $('#currentMonth');

  function updateMonth() {
    currentMonthElement.text(months[currentMonthIndex] + ' 2024');
  }

  prevMonthButton.click(function () {
    if (currentMonthIndex > 0) {
      currentMonthIndex--;
      updateMonth();
    }
  });

  nextMonthButton.click(function () {
    if (currentMonthIndex < months.length - 1) {
      currentMonthIndex++;
      updateMonth();
    }
  });

  // Ініціалізація при завантаженні сторінки
  updateMonth();

  $('#out').click(function () {
    $('#end').toggleClass('show');
    $('#body').css('display', 'none');
  });
});