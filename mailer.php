<?
// Получатель письма
define('RECEIVER', 'because.ahaha@gmail.com');


// --------------------------------------------------------------------------------------------------


header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=utf-8');

require 'PHPMailer/loader.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

try {

    $mail->setFrom(
        !empty($_POST['email']) ? $_POST['email'] : RECEIVER, 
        !empty($_POST['name']) ? $_POST['name'] : ''
    );
    $mail->addAddress(RECEIVER);

    foreach ($_POST as $key => $value) {
        $_POST[$key] = htmlspecialchars($value);
    }

    if (!empty($_POST['subject'])) {
        $mail->Subject = $_POST["subject"];
    }

    $message = '';
    if (!empty($_POST['name'])) $message .= "<p>Имя: <b>{$_POST['name']}</b></p>";
    if (!empty($_POST['email'])) $message .= "<p>Email: <b>{$_POST['email']}</b></p>";
    if (!empty($_POST['phone'])) $message .= "<p>Телефон: <b>{$_POST['phone']}</b></p>";
    if (!empty($_POST['message'])) {
        $_POST['message'] = nl2br($_POST['message']);
        $message .= "<p>Сообщение:</p><p>{$_POST['message']}</p>";
    }

    if (!empty($message)) {
        $mail->Body = $message;
        $mail->send();
    }

    echo json_encode([]);

} catch (Exception $e) {
    echo json_encode([
        'error' => $mail->ErrorInfo
    ]);
}