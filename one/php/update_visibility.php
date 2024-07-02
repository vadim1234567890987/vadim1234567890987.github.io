// update_visibility.php
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
    $record_id = isset($_POST['record_id']) ? $_POST['record_id'] : '';

    if (!empty($record_id)) {
        $sql = "UPDATE transactions SET visible = FALSE WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $record_id);
        $stmt->execute();
        $stmt->close();
    }

    $conn->close(); 
    echo "Запис успішно оновлено.";
} else {
    $conn->close();
}
?>

