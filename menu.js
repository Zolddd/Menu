// Initialize an empty array to hold the cart items
let cart = [];

// Function to add an item to the cart
function addToCart(itemName, itemPrice) {
    // Check if the item already exists in the cart
    const existingItem = cart.find(item => item.name === itemName);

    if (existingItem) {
        // Increment the quantity if the item is already in the cart
        existingItem.quantity += 1;
    } else {
        // Add new item to the cart with quantity 1
        cart.push({ name: itemName, price: itemPrice, quantity: 1 });
    }

    // Update the cart display
    updateCartDisplay();
}

// Function to remove an item from the cart
function removeFromCart(itemName) {
    // Find the item in the cart
    const itemIndex = cart.findIndex(item => item.name === itemName);

    if (itemIndex !== -1) {
        // Decrease the quantity or remove the item if quantity reaches 0
        cart[itemIndex].quantity -= 1;
        if (cart[itemIndex].quantity === 0) {
            cart.splice(itemIndex, 1);
        }
    }

    // Update the cart display
    updateCartDisplay();
}

// Function to update the cart display
function updateCartDisplay() {
    const cartContainer = document.getElementById('cart-display');
    cartContainer.innerHTML = ''; // Clear the current cart display

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>The cart is empty.</p>';
    } else {
        // Display each item in the cart
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item-display');
            itemElement.innerHTML = `
                <p>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</p>
                <button class="remove-from-cart" data-name="${item.name}">Remove</button>
            `;
            cartContainer.appendChild(itemElement);
        });

        // Add event listeners for the remove buttons
        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', (event) => {
                const itemName = event.target.getAttribute('data-name');
                removeFromCart(itemName);
            });
        });
    }
}

// Add event listeners to 'Add to Cart' buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        const itemElement = event.target.closest('.cart-item');
        const itemName = itemElement.querySelector('.lines p').innerText; // Get item name
        const itemPriceText = itemElement.querySelector('.lines p:nth-child(2)').innerText.match(/\$([\d.]+)/);
        const itemPrice = itemPriceText ? parseFloat(itemPriceText[1]) : 0; // Extract item price from text
        addToCart(itemName, itemPrice);
    });
});

// Create a container to display the cart and add it to the body
const cartDisplayContainer = document.createElement('div');
cartDisplayContainer.id = 'cart-display';
document.body.appendChild(cartDisplayContainer);

// Apply CSS styles to the cart display
const style = document.createElement('style');
style.textContent = `
    #cart-display {
        position: fixed;
        bottom: 0;
        right: 0;
        background-color: white;
        border: 1px solid #ccc;
        padding: 20px;
        width: 300px;
        max-height: 300px;
        overflow-y: auto;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        font-family: 'Exo 2', sans-serif;
    }
    #cart-display p {
        margin: 10px 0;
    }
    .cart-item-display {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid #ddd;
    }
    .remove-from-cart {
        background-color: red;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 5px;
        cursor: pointer;
    }
    .remove-from-cart:hover {
        background-color: darkred;
    }
`;
document.head.appendChild(style);
