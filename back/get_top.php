<?php

include("DB_connect.php");
$result = query_DB("SELECT * FROM posts WHERE time BETWEEN CURDATE()-INTERVAL 1 WEEK AND CURDATE() ORDER BY rank DESC");
echo($result);
 ?>
