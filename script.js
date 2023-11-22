const products = [
    { id: 1, name: "Product 1", price: 10.00, image: "./Images/product1.jpg" },
    { id: 2, name: "Product 2", price: 15.00, image: "./Images/product2.png" },
    { id: 3, name: "Product 3", price: 20.00, image: "./Images/product3.jpg" }
];

const cart = [];

document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.querySelector(".products");
    const cartButton = document.getElementById("cart-button");
    const closeModal = document.getElementById("closeModal");
    const modal = document.getElementById("cartModal");

    // Create product elements
    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.className = "product";
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3 style="text-decoration:underline">${product.name}</h3>
            <p>Price: &#8377;${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productContainer.appendChild(productElement);
    });

    // Open cart modal
    cartButton.addEventListener("click", () => {
        modal.style.display = "block";
    });

    // Close cart modal
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Add a product to the cart
    window.addToCart = (productId) => {
        const product = products.find(p => p.id === productId);
        if (product) {
            cart.push(product);
            updateCart();
        }
    };


    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    // Update the cart and total price
    function updateCart() {
        cartCount.textContent = cart.length;
        cartItems.innerHTML = "";

        let totalPrice = 0;

        cart.forEach(product => {
            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";
            cartItem.innerHTML = `
                
                <div>
                    <h3>${product.name}</h3>
                    <p>Price: &#8377;${product.price.toFixed(2)}</p>
                </div>
                <button onclick="removeFromCart(${product.id})">Remove</button>
            `;
            cartItems.appendChild(cartItem);
            totalPrice += product.price;
        });

        cartTotal.textContent = totalPrice.toFixed(2);
    }

    const cartTotal = document.getElementById("cart-total");
    // Remove a product from the cart
    window.removeFromCart = (productId) => {
        const index = cart.findIndex(product => product.id === productId);
        if (index !== -1) {
            cart.splice(index, 1);
            updateCart();
        }
    };
});