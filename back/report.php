<?php
include("general.php");
include("DB_connect.php");
$ID = $_GET["id"];
echo $ID;
_log($ID . " has been reported");
if(increasePostReports($ID)){

}else{
  _log("error reporting");
}

 ?>
