<?php
include('general.php');
include("DB_connect.php");
$NUM_PAIRS = 100;
$timeout = 0;
$MINIMUM_SHARE_SCORE = 900;
error_reporting(1);
$code = $_REQUEST["code"];
$id = get_ID_with_code($code);



$response = query_DB("SELECT * FROM `posts` ORDER BY idpost DESC");


$response = json_decode($response);

$pairs = array();
$used = array();
$pairs_found = 0;

foreach($response as $image){
  //find first image
  if(!in_array($image,$used)){
    $first_image = $image;
    array_push($used, $image);
//    echo "first image: " . $image->idpost . "<br>";
    //find partner
    foreach($response as $image2){
//      echo "--looking at: $image2->idpost <br>";

      if(!in_array($image2,$used)){
//        echo "----found candidate<br>";
        if($image2 != $first_image){
//          echo "------second image: " . $image2->idpost . "<br>";
          if(isRankNear($first_image, $image2)){
            array_push($pairs, array($first_image, $image2));
            array_push($used, $image2);
//            echo "pair found <br>";
            $timeout = 0;
            $pairs_found++;
            break;
          }
        }
      }else{
//        echo "---already used";
      if($timeout > 5){
        $pairs_found = $pairs_found + $NUM_PAIRS;
      }
      $timeout++;
      }
    }
  }

    if($pairs_found > $NUM_PAIRS){
      break;
    }
}
//echo "<br><br>";

//Printing
for($i = 0; $i < sizeof($pairs); $i++){
//  echo $pairs[$i][0]->URL . " vs " . $pairs[$i][1]->URL . "<br>";
}
//echo "<br><br>";

_log("new images sent to a user");
shuffle($pairs);
echo json_encode($pairs);




function isRankNear($image1, $image2){
  $difference = abs($image1->rank - $image2->rank);
  if($difference < 25){
    return TRUE;
  }else{
    return FALSE;
  }
}
 ?>
