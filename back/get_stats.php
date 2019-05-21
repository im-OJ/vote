<?php
include("global.php");
include("DB_connect.php");

$code = $_REQUEST["code"];
$imageID = $_REQUEST["imageid"];


$stats = array();

//get data from posts table
$result = select("SELECT * from posts WHERE idpost = $imageID");

$stats["rank"] = $result[0]["rank"];
$stats["datetime"] = $result[0]["time"];
//get win data from votes mysql_list_tables
$result = select("SELECT * from votes WHERE postID = $imageID AND up = 1");
$stats["wins"] = sizeof($result);

//get loss  data from votes mysql_list_tables
$result = select("SELECT * from votes WHERE postID = $imageID AND up = 0");
$stats["losses"] = sizeof($result);

$stats["total"] = $stats["wins"] + $stats["losses"];

echo json_encode($stats);
_log("image stats sent to a user");
 ?>
