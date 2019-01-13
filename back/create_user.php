<?php
//TODO: PREVENT SQL INJECTION

$start_coins = 0;
$name = $_REQUEST["name"];
$failed = 0;
$err = "";

//======= Check username is valid =======
if (!isset($_REQUEST)){
$err = "no name entered";
  $failed = 1;
}

check_fail();
//Length
if(strlen($name) < 4){
  $err = $err + "too short \n";
  $failed = 1;
}

if(strlen($name) > 20){
  $err = $err + "too long \n";
  $failed = 1;
}
check_fail();

//======= Check username is taken =======
//connect
include("DB_connect.php");
$sql = "SELECT iduser FROM users WHERE name = '$name'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $err .= "username taken \n";
    $failed = 1;
} else {

}
check_fail();

//======= Generate code =======
$code = gen_code();

//======= Insert into DB =======
$sql = "INSERT INTO users (name, code, coins) VALUES ('$name', '$code', $start_coins)";

if ($conn->query($sql) === TRUE) {
    echo $code;
} else {
    $err .= "DB error :(";
    $failed = 1;
}
check_fail();
//======================= Functions =====================
function check_fail(){
  global $failed;
  global $err;
  if($failed == 1){
    echo 'error: ' + $err;
    exit();
  }
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
