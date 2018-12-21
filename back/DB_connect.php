<?php
include("config.php");
$servername = $SQL_SERVER;
$username = $SQL_USER;
$password = $SQL_PASS;
$db = $SQL_DB;
// Create connection
$conn = new mysqli($servername, $username, $password, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>
