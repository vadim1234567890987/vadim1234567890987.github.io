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
$sqlVisible = "SELECT * FROM transactions WHERE visible = TRUE";
$resultVisible = $conn->query($sqlVisible);

$records = array();

if ($resultVisible->num_rows > 0) {
    while($row = $resultVisible->fetch_assoc()) {
        $records[] = $row;
    }
}

// Отримуємо всі записи для обчислення загальної суми
$sqlAll = "SELECT * FROM transactions";
$resultAll = $conn->query($sqlAll);

$totalSum = 0;

if ($resultAll->num_rows > 0) {
    while($row = $resultAll->fetch_assoc()) {
        if ($row['sign'] === '+') {
            $totalSum += floatval($row['amount']);
        } else {
            $totalSum -= floatval($row['amount']);
        }
    }
}

$conn->close();

$response = array(
    'records' => $records,
    'totalSum' => $totalSum
);

header('Content-Type: application/json');
echo json_encode($response);
?>
