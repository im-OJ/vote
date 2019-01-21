
<?php
function exit_with_error($error){
  $response_arr = array('success' => 0, 'error' => $error);
  echo json_encode($response_arr);
  exit();
}
function exit_with_success($note=0){
  if($note != 0){
    $response_arr = array('success' => 1);
  }else{
    $response_arr = array('success' => 1, 'response' => $note);
  }
  echo json_encode($response_arr);
  exit();
}

?>
