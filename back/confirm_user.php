<?php
//TODO: PREVENT SQL INJECTION
include("DB_connect.php");
include("general.php");
//confirms the user and code match, allowing user to log in
if(!isset($_REQUEST["code"])){
  exit_with_error("no code entered " . var_dump($_POST));
}


$code = $_REQUEST["code"];
$result = get_ID_with_code($code);

if($result > 0){
  _log($result . " confirmed");
  exit_with_success();

}
exit_with_error("person not found");
 ?>
