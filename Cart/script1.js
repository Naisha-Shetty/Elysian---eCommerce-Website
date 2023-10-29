function displayCart() {

    fetch('cart_data.json')
        .then(response => response.json())
        .then(data => {

            const cartItems = data;

            const tableBody = document.getElementById('cart-items');

            let subtotal = 0;

            cartItems.forEach((item, index) => {
                const row = tableBody.insertRow();
                const nameCell = row.insertCell(0);
                const sizeCell = row.insertCell(1);
                const priceCell = row.insertCell(2);
                const quantityCell = row.insertCell(3);
                const subtotalCell = row.insertCell(4);
                const actionCell = row.insertCell(5);

                nameCell.innerHTML = item.name;
                sizeCell.innerHTML = item.size;
                priceCell.innerHTML = item.price;

                const quantityInput = document.createElement('input');
                quantityInput.type = 'number';
                quantityInput.id = 'qid';
                quantityInput.value = item.quantity;
                quantityInput.min = 1;
                quantityInput.addEventListener('change', function () {

                    cartItems[index].quantity = parseInt(quantityInput.value);

                    saveCartData(cartItems);

                    calculateSubtotal(item, subtotalCell);
                    subtotal = calculateTotal(cartItems);
                    updateSubtotal(subtotal);
                    updateTotal(subtotal);
                });
                quantityCell.appendChild(quantityInput);
                quantityCell.id='qcellid';

                const removeButton = document.createElement('button');
                removeButton.innerText = 'Remove';
                removeButton.id = 'remove';
                removeButton.addEventListener('click', function () {

                    cartItems.splice(index, 1);

                    saveCartData(cartItems);

                    tableBody.deleteRow(index);

                    calculateSubtotal(item, subtotalCell);
                    subtotal = calculateTotal(cartItems);
                    updateSubtotal(subtotal);
                    updateTotal(subtotal);
                });
                actionCell.appendChild(removeButton);
                actionCell.id='removecell';

                calculateSubtotal(item, subtotalCell);
                subtotal += item.subtotal;
            });

            updateSubtotal(subtotal);
            updateTotal(subtotal);
        })
        .catch(error => {
            console.error(error);
});
}

function saveCartData(data) {
    fetch('save_cart.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(responseData => {
        console.log(responseData);
    })
    .catch(error => {
        console.error(error);
    });
}

function calculateSubtotal(item, cell) {
    item.subtotal = item.price * item.quantity;
    cell.textContent = item.subtotal.toFixed(2);
}

function calculateTotal(cartItems) {
    let total = 0;
    cartItems.forEach(item => {
        total += item.subtotal;
    });
    return total;
}

function updateSubtotal(subtotal) {
    const subtotalElement = document.getElementById('subtotal');
    subtotalElement.textContent = subtotal.toFixed(2);
}

function updateTotal(subtotal) {
    const taxes = 0.18 * subtotal; // 18% taxes
    const shipping = 10.00; // Shipping charge
    const total = subtotal + taxes + shipping;
    
    const taxesElement = document.getElementById('taxes');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');
    
    taxesElement.textContent = taxes.toFixed(2);
    shippingElement.textContent = shipping.toFixed(2);
    totalElement.textContent = total.toFixed(2);
}

displayCart();