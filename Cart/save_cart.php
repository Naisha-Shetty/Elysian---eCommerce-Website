<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json_data = file_get_contents('php://input');

    if (!empty($json_data)) {
        $json_file_path = 'cart_data.json';
        $existing_data = file_get_contents($json_file_path);
        $existing_cart = json_decode($existing_data, true) ?: [];
        $new_cart_item = json_decode($json_data, true);

        if ($new_cart_item) {
            $existing_cart[] = $new_cart_item;
            $new_json_data = json_encode($existing_cart, JSON_PRETTY_PRINT);
            file_put_contents($json_file_path, $new_json_data);
            echo json_encode(['message' => 'Cart data saved successfully']);
        } else {
            http_response_code(400); // Bad Request
            echo json_encode(['error' => 'Invalid JSON data']);
        }
    } else {
        http_response_code(400); // Bad Request
        echo json_encode(['error' => 'Empty JSON data']);
    }
} else {
    http_response_code(400); // Bad Request
    echo json_encode(['error' => 'Invalid request']);
}
?>
