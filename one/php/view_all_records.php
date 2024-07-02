<?php
$hostname = "localhost";
$username = "root";
$password = "";
$dbname = "wallet_db";

$conn = new mysqli($hostname, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Отримуємо записи, які мають visible = TRUE для відображення
$sql = "SELECT * FROM transactions";
$result = $conn->query($sql);

$allRecords = array();

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $allRecords[] = $row;
  }
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($allRecords);
?>
