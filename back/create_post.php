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


$name = generateRandomString();
$path = $_FILES['userfile']['name'];
$ext = pathinfo($path, PATHINFO_EXTENSION);
$uploadFileName = $name."_".uniqid() . $ext;
$uploadFile = $uploadFileName;
define('UPLOAD_DIR', 'p/');

if ($_FILES["userfile"]["error"] > 0){
  exit_with_error("error code: " . $_FILES["userfile"]["error"]);
}

if (move_uploaded_file($_FILES['userfile']['tmp_name'],UPLOAD_DIR.$uploadFileName)) {

} else {
    exit_with_error("Problem submitting file");
}


$user_ID = get_ID_with_code($code);

if(store_post_info($user_ID, $uploadFile) == TRUE){
  exit_with_success("File submitted");
}else{
  exit_with_error("DB Error");
}



function generateRandomString($length = 20) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

?>
