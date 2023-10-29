<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"]; 
    $phone = $_POST["phone"];
    $password = password_hash($_POST["password"], PASSWORD_BCRYPT);

    $userData = file_exists('users.json') ? json_decode(file_get_contents('users.json'), true) : [];

    foreach ($userData as $user) {
        if ($user['email'] === $email) {
            echo "Email already exists.";
            return;
        }
    }

    $userId = uniqid();

    $newUser = [
        'id' => $userId,
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'password' => $password,
    ];

    $userData[] = $newUser;

    if (file_put_contents('users.json', json_encode($userData, JSON_PRETTY_PRINT)) !== false) {

        header("Location:..\Login Page\login.html");
        exit; 
    } else {
        echo "Error saving user data.";
    }
}
?>
