<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'Exception.php';
require 'SMTP.php';
require 'PHPMailer.php';

$mail = new PHPMailer(true);

$mail->charset = 'UTF-8';
$mail->isSMTP();
$mail->SMTPAuth = true;
$mail->Username = PROVIDER_USER;
$mail->Password = PROVIDER_PASSWORD;
$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; 
$mail->Port = 465;  
$mail->isHTML(true);

switch (PROVIDER) {
    case GOOGLE:
        $mail->Host = 'smtp.gmail.com';
        break;
    case YANDEX:
        $mail->Host = 'smtp.yandex.ru';
        break;
    case MAILRU:
        $mail->Host = 'smtp.mail.ru';
        break;
    case OTHER:
        if (defined('PROVIDER_SMTP')) $mail->Host = PROVIDER_SMTP;
        if (defined('PROVIDER_PORT')) $mail->Port = PROVIDER_PORT;  
        break;
}