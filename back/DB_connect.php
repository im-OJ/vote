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

// Returns JSON of query
function query_DB($query){
  global $conn;
  $sql = $query;
  $result = $conn->query($sql);
  $dbdata = array();
  while ( $row = $result->fetch_assoc())  {
    $dbdata[]=$row;
  }
  return json_encode($dbdata);
}

function get_ID_with_code($code){
  global $conn;
  $sql = "SELECT iduser FROM users WHERE code='$code'";
  $result = $conn->query($sql);
  $dbdata = array();
  while ( $row = $result->fetch_assoc())  {
    return $row["iduser"];
  }
}
?>
