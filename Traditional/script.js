const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach((button) => {
    button.addEventListener('click', function () {
        if (button.classList.contains('clicked')) {

            button.classList.remove('clicked');
            button.textContent = 'Add to Cart';
        } else {

            button.classList.add('clicked');
            button.textContent = 'Added to Cart';


            const id = button.getAttribute('data-id');
            const name = button.getAttribute('data-name');
            const price = button.getAttribute('data-price');
            const size = document.getElementById('size').value;

            const cartItem = {
                id,
                name,
                price,
                size,
                quantity: 1,
            };

            fetch('../Cart/save_cart.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cartItem),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
        }
    });
});
