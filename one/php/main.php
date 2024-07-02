<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@500;700&family=Roboto+Serif:opsz,wght@8..144,300;8..144,400;8..144,500;8..144,700&display=swap"
    rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
  <script src="https://cdn.jsdelivr.net/npm/flatpickr/dist/l10n/uk.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
  <script src="jquery-3.7.1.js"></script>
  <title>Wallet by BudgetBakers</title>
</head>
  <body> 
    <div class="end" id="end">
      <div class="text_END">The END</div>
    </div>
    <div class="container" id="body">
      <div class="html_container">
        <div class="body_container">
          <div class="header">
            <div class="header_container">
              <a href="main.php" class="logo">
                <div class="logo_img"></div>
              </a>
              <nav class="menu_nav">
                <ul class="menu_list">
                  <li>
                    <a href="main.php" class="menu_list_link" id="main">
                      Головна панель
                    </a>
                  </li>
                  <li>
                    <a href="#" class="menu_list_link">
                      Рахунки
                    </a>
                  </li>
                  <li>
                    <a href="records.php" class="menu_list_link" id="records">
                      Записи
                    </a>
                  </li>
                  <li>
                    <a href="#" class="menu_list_link">
                      Аналітика
                    </a>
                  </li>
                  <li>
                    <a href="#" class="menu_list_link">
                      Інвестиції
                    </a>
                  </li>
                  <li>
                    <a href="#" class="menu_list_link">
                      Імпорти
                    </a>
                  </li>
                </ul>
              </nav>
              <div class="header_data">
                <button class="add_entry" type="button" id="addEntry">
                  ＋ Запис
                </button>
                <button class="menu_btn" style="background-color: transparent; cursor: pointer;">
                  <div class="profile">
                    <div class="profile_listbox_position">
                      <div class="profile_listbox">
                        <div class="profile_listbox-img">
                          <img src="images/profile.svg" alt="img" class="profile-images">
                        </div>
                        <div class="email">
                          <span class="email_input">
                            vadimzinkiv321@gmail.com
                          </span>
                        </div>
                      </div>
                      <i aria-hidden="true" class="dropdown"></i>
                    </div>
                  </div>
                </button>
                <template id="formTemplate">
                  <div class="screen" id="add_entry-btn">
                    <div class="add_record_form_window" id="shake_menu">
                      <div class="container">
                        <div class="header_window">
                          <span>ДОДАТИ ЗАПИС</span>
                          <span class="add-record-close" id="close">
                            <div style="cursor: pointer;">&#10006;</div>
                          </span>
                        </div>
                      </div>
                      <div class="window_content">
                        <div class="container">
                          <div class="form_main">
                            <form class="form" id="form" action="process_form.php" method="post">
                              <div class="main_color_panel">
                                <div class="form_centered">
                                  <div class="row">
                                    <div class="main_form_column">
                                      <div class="record_form_menu">
                                        <a href="#" class="point 1">Витрати</a>
                                        <a href="#" class="point 2">Дохід</a>
                                        <a href="#" class="point 3">Переказ</a>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class="second_form_column">
                                      <div class="field">
                                        <div class="field icon-select">
                                          <label>Рахунок</label>
                                          <div aria-invalid="true" name="accountId" role="listbox" aria-disabled="false" aria-expanded="false" class="selection_dropdown">
                                            <div class="text">
                                              <div class="icon-option">
                                                <div class="icon-square">
                                                  <span class="account-icon"></span>
                                                </div>
                                                <div class="label account">Готівка</div>
                                              </div>
                                            </div>
                                            <i class="dropdown icon"></i>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="field_two">
                                        <div class="fields">
                                          <div class="field-amount">
                                            <label>Сума</label>
                                            <div class="input">
                                              <input type="hidden" name="sign" id="sign" value="−">
                                              <input id="inpSum" class="input_sum" name="amount" placeholder="0" type="number" inputmode="numeric">
                                            </div>
                                          </div>
                                          <div class="field-currency">
                                            <label>Валюта</label>
                                            <div class="selection_dropdown1">
                                              <div class="text">UAH</div>
                                              <i class="dropdown icon"></i>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="error error-message">
                                          <div class="error content" id="errorSum" style="display: none;">Сума не коректна!</div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="main-white-panel">
                                <div class="panel_container">
                                  <div class="panel_points">
                                    <div class="two_together top">
                                      <div class="one">
                                        <div class="container">
                                          <div class="category">
                                            <label class="label points">Категорія</label>
                                            <div class="field_main left" id="FMLeft" role="listbox">
                                              <div class="field_select left" id="selectedItem" type="text">Обрати</div>
                                              <input type="hidden" id="categoryInput" name="category">
                                              <i class="dropdown icon field_select" id="i"></i>
                                              <div class="menu transition visible" id="category_select">
                                                <div class="selector-content">
                                                  <ul class="categories" type="text"></ul>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div>
                                            <div class="content" id="errorSel" style="color: red; display: none;">Оберіть категорію</div>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="one">
                                        <div class="container">
                                          <div class="labels">
                                            <label class="label points">Мітки</label>
                                            <div class="field_main right points">
                                              <div class="field_select">
                                                <option value="">Обрати</option>
                                              </div>
                                              <i class="dropdown icon pontis"></i>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="two_together bottom">
                                      <div class="field-date">
                                        <label class="label points">Дата</label>
                                        <div class="datepicker left">
                                          <input class="datepicker date" style="background-image: none;" name="date" type="date" id="dataToday">
                                        </div>
                                      </div>
                                      <div class="field-date">
                                        <label class="label points">Час</label>
                                        <input class="datepicker right choose_time" id="timePicker" name="time" type="time">
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="button_to_add_a_record">
                                  <div class="container">
                                    <button class="to_add_a_record-btn" type="submit" id="submitButton">Додати запис</button>
                                    <div class="container-btn">
                                      <div class="create-new-after-save" id="submitButton1">Додати і створити ще один</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
                <div id="menu" data-target="one" class="submenu">
                  <ul class="ul_submenu">
                    <li>
                      <div role="option" aria-checked="false" aria-selected="true">
                        <div class="container" style="display: flex;">
                          <div class="item_vaucher_img"></div>
                          <div class="item item_vaucher">Додати ваучер</div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <a role="option" aria-checked="false" href="#" style="pointer-events: all;" class=>
                        <div class="item item_update">
                          <div class="item_update_img">
                            <img src="images/update.png" alt="update-img"
                              style="width: 20px; height: 20px; margin-right: 14px; display: block; flex-shrink: 0;">
                          </div>
                          <div>Оновитись</div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a role="option" aria-checked="false" aria-selected="false" href="#" style="pointer-events: all;">
                        <div class="item item_settings">
                          <div class="item_settings_img" style="width: 20px; height: 20px; font-size: 20px;"></div>
                          <div style="margin-left: 14px;">Налаштування</div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a role="option" aria-checked="true" aria-selected="false" href="#" style="pointer-events: all;">
                        <div class="item item_help">
                          <div class="item_help_img">
                            <img src="images/help.png" alt="help-img"
                              style="width: 20px; height: 20px; font-size: 20px; margin-right: 14px; display: block; flex-shrink: 0;">
                          </div>
                          <div>Допомога</div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <div role="option" aria-checked="true" aria-selected="false" style="pointer-events: all;" id="out">
                        <div class="item item_out">
                          <div class="item_out_img">
                            <img src="images/out.png" alt="out-img"
                              style="width: 20px; height: 20px; font-size: 20px; margin-right: 14px; display: block; flex-shrink: 0;">
                          </div>
                          <div>Вийти</div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="header_bottom">
            <div class="header_bottom_position">
              <div class="cash_balance">
                <div class="cash_balance_list">
                  <!-- <i aria-hidden="true" class="pencil alternate icon"></i> -->
                  <div class="icon">
                    <div class="icon_square simple">
                      <span class="icon-cash-img"></span>
                    </div>
                  </div>
                  <div class="cash_container">
                    <div class="cash">
                      <span class="cash_name">
                        Готівка
                      </span>
                    </div>
                    <div class="sum" id="outputSum">
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="add_account">
                <button type="button" class="add_account_btn">
                  <div class="add_account_text">
                    + Додати рахунок
                  </div>
                </button>
              </div>
            </div>
          </div>
          <main class="main">
            <div class="main_container">
              <div class="header_main main">
                <button class="prev_month-btn" id="prevMonth"><img class="switch-btn" src="images/prev_month.png" alt=""></button>
                <div class="cost_range">
                  <div class="container">
                    <div id="currentMonth" class="selection-inner">Цього місяця</div>
                  </div>
                  <i aria-hidden="true" class="caret right large fitted"></i>
                </div>
                <button class="next_month-btn" id="nextMonth"><img class="switch-btn" src="images/next_month.png" alt=""></button>
              </div>
              <div class="container">
                <div class="main_panel">
                  <div class="recent entries">
                    <div class="container">
                      <div class="before"></div>
                      <div class="ellipsis">
                        <div class="dropdown_basic">
                          <div class="text"></div>
                          <i class="ellipsis vertical"></i>
                          <div class="left visible menu transition" style="display: none;">
                            <div class=_item">
                              <span class="text">Видалити з головної панелі</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="basic_menu">
                        <div class="basic_menu_header">
                          <h2>Останні записи</h2>
                          <div class="basic_menu_bth">
                            <button class="circular compact add__entry" id="clearRecords" name="id" type="button">Очистити</button>
                          <a href="records.php" class="circular compact add__entry">Записи</a>
                          </div>
                        </div>
                        <div>
                          <div class="record_date"></div> 
                        </div>
                      </div>
                      <div class="basic_menu_content">
                        <div class="container">
                          <ul id="output"></ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </
      </div>
    </div>

    <script src="jquery-3.7.1.js"></script>
    <script src="main.js"></script>
    <script src="categories.js"></script>
    <script src="form.js"></script>
    <script src="display_records.js"></script>
    
    </body>
    
    </html>