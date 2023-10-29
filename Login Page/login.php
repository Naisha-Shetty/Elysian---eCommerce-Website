<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $password = $_POST["password"];

    // Read user data from JSON file
    $userData = file_exists('..\Registration page\users.json') ? json_decode(file_get_contents('..\Registration page\users.json'), true) : [];

    foreach ($userData as $user) {
        if ($user['email'] === $email && password_verify($password, $user['password'])) {
            session_start();
            $_SESSION["user_id"] = $user['id'];
            $_SESSION["user_name"] = $user['name'];
            echo "Login successful!";
            return;
        }
    }

    echo "Incorrect email or password.";
}
?>
