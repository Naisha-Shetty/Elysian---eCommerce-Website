function validateForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const cpassword = document.getElementById("cpassword").value;
    const error_message = document.getElementById("error-message");

    if (name.trim() === "") {
        error_message.innerHTML = "Name is required.";
        error_message.style.display = 'block';
        return false;
    }

    if (email.trim() === "") {
        error_message.innerHTML = "Email is required.";
        error_message.style.display = 'block';
        return false;
    }

    const phonePattern = /^(\d{10}|-{9})$/;
    if (!phone.match(phonePattern)) {
        error_message.innerHTML = "Invalid phone number format.";
        error_message.style.display = 'block';
        return false;
    }

    if (password.trim() === "") {
        error_message.innerHTML = "Password is required.";
        error_message.style.display = 'block';
        return false;
    }

    if (password !== cpassword) {
        error_message.innerHTML = "Passwords do not match.";
        error_message.style.display = 'block';
        return false;
    }

    error_message.innerHTML = "";

    window.location.href = "..\Login Page\login.html";

    return true;
}
