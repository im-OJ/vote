<?php


include("general.php");
include("DB_connect.php");
require("Rating.php");


$winnerID = $_REQUEST["winnerID"];
$loserID = $_REQUEST["loserID"];
$code = $_REQUEST["code"];

if(store_vote($winnerID, $loserID, $code)){

}else{
  exit_with_error("DB error");
}

$winnersRank = getPostRank($winnerID);
$losersRank = getPostRank($loserID);

$rating = new Rating($winnersRank, $losersRank,RATING::WIN, RATING::LOST);
$results = $rating->getNewRatings();

$winnersNewRank = $results['a'];
$losersNewRank = $results['b'];

if(updatePostRank($winnerID, $winnersNewRank) && updatePostRank($loserID, $losersNewRank)){
  _log("New vote cast: " . $winnerID . ">"  . $loserID);
  exit_with_success();

}else{
  exit_with_error("error storing votes");
}


 ?>
