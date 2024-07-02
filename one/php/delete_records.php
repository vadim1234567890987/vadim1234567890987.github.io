<?php
$hostname = "localhost";
$username = "root";
$password = "";
$dbname = "wallet_db";

$conn = new mysqli($hostname, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Підключення не вдалося: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $deleted_ids = isset($_POST['deleted_ids']) ? $_POST['deleted_ids'] : array();

    if (!empty($deleted_ids)) {
        $sql = "UPDATE transactions SET visible = FALSE WHERE id = ?";
        $stmt = $conn->prepare($sql);

        if ($stmt === FALSE) {
            die ("Помилка підготовки запиту: " . $conn->error);
        }

        foreach ($deleted_ids as $id) {
            $stmt->bind_param('i', $id);
            $stmt->execute();
        }

        if ($stmt->affected_rows > 0) {
            echo "Записи успішно оновлено.<br>";
        } else {
            die ("Помилка оновлення записів: " . $stmt->error . "<br>");
        }

        $stmt->close();
    }

    $conn->close(); 
} else {
    $conn->close();
}
?>
