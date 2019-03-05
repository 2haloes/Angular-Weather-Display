<?
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_TIMEOUT, 1);
  curl_setopt($ch, CURLOPT_URL, $_GET['api']);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
  if (FALSE === ($retval = curl_exec($ch))) {
    error_log(curl_error($ch));
  } else {
    printf($retval);
  }
  // $outdata = file_get_contents($_GET['api']);
  // printf("{Test: 'Hello!'}");
?>
