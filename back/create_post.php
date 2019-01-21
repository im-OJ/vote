<?php
include("DB_connect.php");
include("general.php");
//TODO filetype/size/etc. checks, change file name

if(isset($_REQUEST)){
  $code = $_REQUEST["code"];
}else{
  exit_with_error("No user code");
}
$user_ID = get_ID_with_code($code);
$uploaddir = 'posts/';
$uploadfile = $uploaddir . basename($_FILES['userfile']['name']);



if (move_uploaded_file($_FILES['userfile']['tmp_name'], $uploadfile)) {

} else {
   exit_with_error("There was a problem uploading this file :(");
}

store_post_info($user_ID, $uploadfile);


//Insert into posts (address, userID, )


?>
