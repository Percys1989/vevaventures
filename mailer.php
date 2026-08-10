<?php
// --- Config ---
$to = "Software.contact@vevaventures.com";
$subject = "New VEVA Founders List Signup";

// Only accept POST requests
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    exit("Method not allowed");
}

if (!empty($_POST["fwebsite"])) {
    header("Content-Type: application/json");
    echo json_encode(["success" => true]);
    exit;
}

// --- Collect + sanitize fields ---
function clean($value) {
    $value = trim($value);
    $value = str_replace(["\r", "\n"], " ", $value); // prevent header injection
    return htmlspecialchars($value, ENT_QUOTES, "UTF-8");
}

$name      = isset($_POST["fname"]) ? clean($_POST["fname"]) : "";
$email     = isset($_POST["femail"]) ? clean($_POST["femail"]) : "";
$phone     = isset($_POST["fphone"]) ? clean($_POST["fphone"]) : "";
$role      = isset($_POST["frole"]) ? clean($_POST["frole"]) : "";
$units     = isset($_POST["funits"]) ? clean($_POST["funits"]) : "";
$referral  = isset($_POST["freferral"]) ? clean($_POST["freferral"]) : "";
$challenge = isset($_POST["fchallenge"]) ? clean($_POST["fchallenge"]) : "";

// --- Basic validation ---
$errors = [];
if ($name === "") $errors[] = "Name is required.";
if ($email === "" || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "A valid email is required.";

header("Content-Type: application/json");

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(["success" => false, "errors" => $errors]);
    exit;
}

// --- Build the email ---
$body = "New Founders List signup:\n\n";
$body .= "Name: $name\n";
$body .= "Email: $email\n";
$body .= "Phone: $phone\n";
$body .= "Role: $role\n";
$body .= "Properties/Units: $units\n";
$body .= "Referred by: $referral\n";
$body .= "Biggest challenge: $challenge\n";

$headers = "From: VEVA Website <Software.contact@vevaventures.com>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = mail($to, $subject, $body, $headers);

if ($sent) {
    echo json_encode(["success" => true]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "errors" => ["Could not send email. Please try again later."]]);
}