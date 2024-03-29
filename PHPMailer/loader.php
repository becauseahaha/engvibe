<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'Exception.php';
// require 'SMTP.php';
require 'PHPMailer.php';

$mail = new PHPMailer(true);

$mail->charset = 'UTF-8';
// $mail->isSMTP();
// $mail->SMTPAuth = true;
// $mail->Username = PROVIDER_USER;
// $mail->Password = PROVIDER_PASSWORD;
// $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; 
// $mail->Port = 465;  
$mail->isHTML(true);