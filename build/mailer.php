<?php
// Получатель письма
define('EMAIL', 'because.ahaha@gmail.com'); 



// --------------------------------------------------------------------------------------------------



header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=utf-8');

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
if (!empty($_POST['email'])) {
    $headers .= 'From: '. $_POST['email'] . "\r\n";
}

foreach ($_POST as $key => $value) {
    $_POST[$key] = htmlspecialchars($value);
}

$message = '';
if (!empty($_POST['subject'])) $message .= "<p>Форма: <b>{$_POST['subject']}</b></p><br>";
if (!empty($_POST['name'])) $message .= "<p>Имя: <b>{$_POST['name']}</b></p>";
if (!empty($_POST['email'])) $message .= "<p>Email: <b>{$_POST['email']}</b></p>";
if (!empty($_POST['phone'])) $message .= "<p>Телефон: <b>{$_POST['phone']}</b></p>";
if (!empty($_POST['message'])) {
    $_POST['message'] = nl2br($_POST['message']);
    $message .= "<p>Сообщение:</p><p>{$_POST['message']}</p>";
}

if (!empty($message)) {
    mail(EMAIL, $_POST["subject"], $message, $headers);
    echo json_encode([]);
} else {
    echo json_encode([
        'error' => 'Message is empty'
    ]);
}