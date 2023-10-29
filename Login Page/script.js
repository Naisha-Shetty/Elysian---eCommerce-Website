document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const error_message = document.querySelector(".error-message");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = form.elements.email.value;
        const password = form.elements.password.value;

        fetch("login.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
        })
        .then(response => response.text())
        .then(data => {
            if (data === "Login successful!") {
                // Redirect to homepage.html
                window.location.href = "../Main/main.html";
            } else {
                error_message.textContent = data;
                error_message.style.display = 'block';
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
    });
});