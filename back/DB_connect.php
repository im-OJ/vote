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
  while ($row = $result->fetch_assoc())  {
    $dbdata[]=$row;
  }
  return json_encode($dbdata);
}

function select($query){
  global $conn;
  $sql = $query;

  $result = $conn->query($sql);

  $dbdata = array();
  while ($row = $result->fetch_assoc())  {
    $dbdata[]=$row;
  }
  return $dbdata;
}

function get_ID_with_code($code){
  global $conn;
  $sql = "SELECT iduser FROM users WHERE code='$code'";

  $result = $conn->query($sql);

  $dbdata = array();
  while ( $row = $result->fetch_assoc())  {
    return $row["iduser"];
  }
  return 0;
}

function store_post_info($iduser, $URL){
  $query = "INSERT into posts (iduser, URL) VALUES ($iduser,\"$URL\")";
  global $conn;
  $sql = $query;
  if ($conn->query($sql) === TRUE) {
    return TRUE;
  }else{
    return FALSE;

  }
}

function store_vote($winnerID, $loserID, $code){
  global $conn;
  $success = FALSE;
  $voterID = get_ID_with_code($code);
  $query = "INSERT into votes (postID, up, voterID) VALUES ($winnerID,1,$voterID)";
  //echo $query . "<br>";
  if ($conn->query($query) === TRUE) {
    $success = TRUE;
  }else{

  }
  $query = "INSERT into votes (postID, up, voterID) VALUES ($loserID, 0, $voterID)";
  //  echo $query . "<br>";
  if ($conn->query($query) === TRUE) {
    $success = TRUE;
  }else{
    $success = FALSE;

  }

  return $success;
}


function updatePostRank($postID, $newRank){
  global $conn;
  $query = "UPDATE posts SET rank = $newRank WHERE idpost = $postID";

  if ($conn->query($query) === TRUE) {
    return TRUE;
  }else{

    return FALSE;

  }
}

function increasePostReports($postID){
  global $conn;

  $query = "UPDATE posts SET reports = reports +  1 WHERE idpost = $postID";
  echo $query;
  if ($conn->query($query) === TRUE) {
    return TRUE;
  }else{
    echo mysqli_error();
    return FALSE;

  }
}

function getPostRank($postID){
  global $conn;
  global $conn;
  $sql = "SELECT rank FROM posts WHERE idpost=$postID";

  $result = $conn->query($sql);

  $dbdata = array();
  while ( $row = $result->fetch_assoc())  {
    return $row["rank"];
  }
  return 0;
}

?>
