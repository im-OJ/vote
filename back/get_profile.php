<?php

include("DB_connect.php");
include("general.php");

$code = $_REQUEST["code"];

$id = get_ID_with_code($code);

echo query_DB("SELECT URL, time, rank, idpost from posts WHERE iduser=" . $id);
 ?>
