<?php
// Параметри підключення до бази даних
$hostname = "localhost";
$username = "root";
$password = "";
$dbname = "wallet_db";

$referringPage = $_SERVER['HTTP_REFERER'];
echo $referringPage;

// Function to redirect back to the referring page
function redirect() {
  global $referringPage;
  header('Location: ' . $referringPage);
  exit;
}

// Створюємо підключення
$conn = new mysqli($hostname, $username, $password, $dbname);

// Перевіряємо підключення
if ($conn->connect_error) {
  echo "Підключення не вдалося: " . $conn->connect_error;
} else {
  echo "Підключення успішне";
};

  // $sql = "TRUNCATE TABLE transactions";
  // if ($conn->query($sql) === TRUE) {
  //     echo "Всі записи успішно видалені.<br>";
  // } else {
  //     echo "Помилка видалення записів: " . $conn->error . "<br>";
  // };

  // // Встановити наступне значення для автоінкрементного поля
  // $sql = "ALTER TABLE transactions AUTO_INCREMENT = 1";
  // if ($conn->query($sql) === TRUE) {
  //     echo "Значення автоінкрементного поля успішно встановлено на 1.<br>";
  // } else {
  //     echo "Помилка встановлення значення автоінкрементного поля: " . $conn->error . "<br>";
  // }

// Перевірка, чи подано форму
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Очистка та перевірка даних з форми
    $sign = $_POST['sign'];
    $amount = $_POST['amount'];
    $date = $_POST['date'];
    $time = $_POST['time'];

    // Розпаковуємо дані категорії
    $categoryData = json_decode($_POST['category'], true);
    $category_color = $categoryData['color'];
    $category_class = $categoryData['class'];
    $category_icon = $categoryData['icon'];
    $category_name = $categoryData['name'];

    // Підготовка SQL-запиту на вставку
    $sql = "INSERT INTO transactions (sign, amount, category_color, category_class, category_icon, category_name,date, time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    // Перевірка, чи запит був успішно підготовлений
    if ($stmt === FALSE) {
        die ("Помилка підготовки запиту: " . $conn->error);
    }

    $stmt->bind_param('sdssssss', $sign, $amount, $category_color, $category_class, $category_icon, $category_name, $date, $time);
    $stmt->execute();

    // Перевірте, чи вдалося вставити запис
    if ($stmt->affected_rows > 0) {
        echo "Запис додано успішно.<br>";
    } else {
        die ("Помилка додавання запису: " . $stmt->error . "<br>");
    }

    // Закрийте підготований запит та підключення
    $stmt->close();
    $conn->close(); 

    echo "<h1>Введені дані:</h1><p>Значок: $sign</p><p>Сума: $amount</p><p>Категорія: $category</p><p>Дата: $date</p><p>Час: $time</p>";
    redirect();

} else {
  $conn->close();
};