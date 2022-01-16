<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;



require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->SetLanguage('ru', 'PHPMailer/language/');
$mail->IsHTML(true);

$mail->setFrom('from@example.com', 'Mailer');
$mail->addAddress('medvedev31031993@mail.ru', 'Joe User');
$mail->Subject = 'Проверка отправки';

$body = '<h1> Встречайте супер письмо!!!</h1>';

if(trim(!empty($_POST['name']))){
  $body.='<p><strong> Имя:'.$_POST['name'].'</p>';
}
if(trim(!empty($_POST['email']))){
  $body.='<p><strong> E-mail:'.$_POST['email'].'</p>';
}

$mail->Body = $body;

// отправка
if (!$mail->send()) {
  $message = 'Ошибка';
} else {
  $message = 'Данные отправлены';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);

?>
