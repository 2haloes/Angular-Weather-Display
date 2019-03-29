<?
$errorReturn = '{"currently": {"icon": "API-ERROR"}}';

if (extension_loaded('curl')) {
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_TIMEOUT, 1);
  curl_setopt($ch, CURLOPT_URL, str_replace('_', '&', $_GET['api']));
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
  if (FALSE === ($retval = curl_exec($ch))) {
    error_log(curl_error($ch));
    printf($errorReturn);
  } else {
    printf($retval);
  }
} elseif (condition) {
  $retval = file_get_contents(str_replace('_', '&', $_GET['api']));
  if ($retval !== false) {
    printf($retval);
  } else {
    error_log('file_get_contents: Error retriving data from DarkSky API');
    printf($errorReturn);
  }
} else {
  error_log('Angular Weather Display: Cannot find compatible API download method');
  printf($errorReturn);
}
?>
