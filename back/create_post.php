<?php

include("DB_connect.php");
include("general.php");

$code = "";
//TODO filetype/size/etc. checks, change file name

if(isset($_REQUEST["code"])){
  $code = $_REQUEST["code"];
}else{
  exit_with_error("No user code");
}
echo("hello");
$path = $_FILES['userfile']['name'];
$ext = pathinfo($path, PATHINFO_EXTENSION);
$user_ID = get_ID_with_code($code);
$uploaddir = 'p/';
$uploadfile = $uploaddir . generateRandomString(20) . "." . $ext;



if (move_uploaded_file($_FILES['userfile']['tmp_name'], $uploadfile)) {
  echo("file up");//TODO error uploading local file
} else {
   exit_with_error("There was a problem uploading this file :(");
}

if(store_post_info($user_ID, $uploadfile)){
  exit_with_success("File submitted");
}else{
  exit_with_error("DB Error");
}



function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

?>
