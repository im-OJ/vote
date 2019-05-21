<?php

include("general.php");
if (!isset($_REQUEST["name"])){
$err = "no name entered";
  $failed = 1;
}
check_fail();

$start_coins = 0;
$name = $_REQUEST["name"];
$failed = 0;
$err = "";

//======= Check username is valid =======

check_fail();
//Length
if(strlen($name) < 4){
  $err = $err . "too short";
  $failed = 1;
}

if(strlen($name) > 20){
  $err = $err . "too long";
  $failed = 1;
}
check_fail();

//======= Check username is taken =======
//connect
include("DB_connect.php");
$sql = "SELECT iduser FROM users WHERE name = '$name'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $err .= "username taken";
    $failed = 1;
} else {

}
check_fail();

//======= Generate code =======
$code = gen_code();

//======= Insert into DB =======
$sql = "INSERT INTO users (name, code) VALUES ('$name', '$code')";

if ($conn->query($sql) === TRUE) {
    $response_arr = array('success' => 1, 'code' => $code);
    echo json_encode($response_arr);
} else {
    $err .= "DB error :(";
    echo $conn->error;
    $failed = 1;
}
check_fail();
_log("New user created:" . $name);
//======================= Functions =====================
function check_fail(){
  global $failed;
  global $err;

  if($failed == 1){
    $response_arr = array('success' => 0, 'error' => $err);
    echo json_encode($response_arr);
    exit();
  }
}

function output(){

}

function gen_code(){
  $length = 30;
  $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}
 ?>
