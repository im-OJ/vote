<?php
//TODO: PREVENT SQL INJECTION

//confirms the user and code match, allowing user to log in

$code = $_REQUEST["code"];

include("DB_connect.php");
//$code = mysqli_real_escape_string($connect, $code);
echo query_DB("SELECT name FROM users WHERE code = '$code'");

 ?>
