<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form data
    $name = $_POST["name"];
    $email = $_POST["email"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];

    // Check if all form fields have values
    if (!empty($name) && !empty($email) && !empty($subject) && !empty($message)) {
        // Create an array to store the form data
        $formData = array(
            "name" => $name,
            "email" => $email,
            "subject" => $subject,
            "message" => $message
        );

        // Specify the file path
        $jsonFile = "form_data.json";

        // Read existing JSON data from the file (if it exists)
        $data = [];
        if (file_exists($jsonFile)) {
            $jsonContent = file_get_contents($jsonFile);
            $data = json_decode($jsonContent, true);
        }

        // Add the new form data to the existing data
        $data[] = $formData;

        // Encode the updated data as JSON and write it back to the file
        $jsonData = json_encode($data, JSON_PRETTY_PRINT);

        if ($jsonData !== false) {
            if (file_put_contents($jsonFile, $jsonData) !== false) {
                // Respond with a success message
                echo "Form data saved successfully!";
            } else {
                echo "Error saving form data to the file.";
            }
        } else {
            echo "Error encoding form data to JSON.";
        }
    } else {
        echo "Invalid data. Please fill in all fields.";
    }
} else {
    echo "Invalid request!";
}
?>
