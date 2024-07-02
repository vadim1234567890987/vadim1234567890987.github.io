<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "wallet_db";

// Створюємо з'єднання
$conn = new mysqli($servername, $username, $password, $dbname);

// Перевірка з'єднання
if ($conn->connect_error) {
    die("З'єднання не вдалося: " . $conn->connect_error);
}

// Отримуємо дані з POST-запиту
$id = $_POST['id'];
$amount = $_POST['amount'];
$sign = $_POST['sign'];
$category = $_POST['category'];
$date = $_POST['date'];
$time = $_POST['time'];

// Оновлюємо запис у базі даних
$sql = "UPDATE records SET amount=?, sign=?, category=?, date=?, time=? WHERE id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("dsssii", $amount, $sign, $category, $date, $time, $id);

if ($stmt->execute()) {
    echo "Запис оновлено успішно!";
} else {
    echo "Помилка: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
