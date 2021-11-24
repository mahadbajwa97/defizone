<?php


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');

$processed= str_replace('&gt;','>',str_replace( '&lt;','<', htmlentities($_POST['data'])));



$fp = fopen('../dist/banner.xml', 'w');
fwrite($fp, $processed);
fclose($fp);

$fp = fopen('../src/favicons/banner.xml', 'w');
fwrite($fp, $processed);
fclose($fp);

$fp = fopen('banner.xml', 'w');
fwrite($fp, $processed);
fclose($fp);
header("Location: {$_SERVER['HTTP_REFERER']}");
exit;
 ?>
