document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission
        
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;

        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Check if name and message are not empty
        if (name.trim() === '' || message.trim() === '') {
            alert('Name and message are required fields.');
            return;
        }

        const formData = new FormData(contactForm);

        fetch('contact.php', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.text())
            .then(data => {
                successMessage.textContent = 'Your Query has been submitted! Our team will get back to you in 3-4 working days.';
                successMessage.style.color = 'green';
            })
            .catch(error => {
                console.error('Error:', error);
                successMessage.textContent = 'Error submitting the form.';
                successMessage.style.color = 'red';
            });

        
        // Simulate form submission (you can replace this with your actual submission logic)
        setTimeout(function () {
            successMessage.style.display = 'block';
        }, 2000); // Display success message after 2 seconds
    });
});
