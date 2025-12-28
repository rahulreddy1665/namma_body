<?php
/**
 * Contact Form Email Handler
 * 
 * This script handles contact form submissions and sends emails using PHP's mail() function.
 * Configure your email settings in .env file.
 * 
 * Security: Add rate limiting and CAPTCHA in production.
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
echo "Hello World";
// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo "Method not allowed";
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// Load environment variables (if using .env file)
// For production, set these in your server's environment or php.ini
$recipient_email = $_ENV['CONTACT_EMAIL'] ?? getenv('CONTACT_EMAIL') ?? 'your-email@example.com';
$sender_email = $_ENV['SMTP_FROM'] ?? getenv('SMTP_FROM') ?? 'noreply@yourdomain.com';
$site_name = $_ENV['SITE_NAME'] ?? getenv('SITE_NAME') ?? 'Namma Body';

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Validate input
if (!isset($input['name']) || !isset($input['email']) || !isset($input['message'])) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Missing required fields']);
    exit;
}

$name = trim($input['name']);
$email = trim($input['email']);
$message = trim($input['message']);
$program = isset($input['program']) ? trim($input['program']) : '';

// Basic validation
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'All fields are required']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid email address']);
    exit;
}

// Sanitize inputs to prevent email injection
$name = filter_var($name, FILTER_SANITIZE_STRING);
$email = filter_var($email, FILTER_SANITIZE_EMAIL);
$message = filter_var($message, FILTER_SANITIZE_STRING);
$program = filter_var($program, FILTER_SANITIZE_STRING);

// Prepare email
$subject = "New Contact Form Submission from {$site_name}";
if (!empty($program)) {
    $subject .= " - Interest in: {$program}";
}

$email_body = "New contact form submission:\n\n";
$email_body .= "Name: {$name}\n";
$email_body .= "Email: {$email}\n";
if (!empty($program)) {
    $email_body .= "Program Interest: {$program}\n";
}
$email_body .= "\nMessage:\n{$message}\n";
$email_body .= "\n---\n";
$email_body .= "This email was sent from the contact form on {$site_name}";

// Email headers
$headers = [];
$headers[] = "From: {$site_name} <{$sender_email}>";
$headers[] = "Reply-To: {$name} <{$email}>";
$headers[] = "X-Mailer: PHP/" . phpversion();
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-Type: text/plain; charset=UTF-8";

// Send email
$mail_sent = mail($recipient_email, $subject, $email_body, implode("\r\n", $headers));

if ($mail_sent) {
    http_response_code(200);
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Failed to send email. Please try again later.']);
}
?>

