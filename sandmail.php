<?php

$to = 'medvedev31031993@mail.ru';
$from = trim($_POST['email']);


$message = htmlspecialchars($_POST['message']);
$message = urldecode($message);
$message = trim($message);

$headers = "From: $from" . "\r\n" .
"Replay to: $from" . "\r\n" .
"X=Mailer: PHP/" . phpversion();

if (mail($to, $message, $headers)) {
  echo "<script>$('#popup-small').modal('show')</script>";
} else {
  echo 'Письмо не отправлено';
}
?>
