// ✅ Selecting all important elements
const container = document.querySelector('.container');
const cartPanel = document.getElementById('cartPanel');
const cartItemsDiv = document.getElementById('cartItems');
const closeCart = document.getElementById('closeCart');
const cartCount = document.getElementById('cart-count');
const cartIcon = document.getElementById('cart-icon');
const totalPriceEl = document.getElementById('totalPrice');
const checkoutBtn = document.getElementById('checkoutBtn');

// ✅ Get cart data from localStorage (if empty → make new array)
let cart = JSON.parse(localStorage.getItem('cart')) || [];
cartCount.textContent = cart.length;

// ✅ Fetch products from API using Axios
axios('https://fakestoreapi.com/products')
  .then((res) => {
    res.data.forEach((item) => {
      // ✅ Create product card for each item
      container.innerHTML += `
        <div class="card">
          <img src="${item.image}" alt="${item.title}">
          <h3>${item.title}</h3>
          <h4>💲${item.price}</h4>
          <button onclick="addToCart('${item.image}', '${item.title}', ${item.price})">
            Add to Cart
          </button>
        </div>
      `;
    });
  })
  .catch((err) => console.log('Error:', err));

// ✅ Function: Add item to cart
function addToCart(image, title, price) {
  const product = { image, title, price }; // Create product object
  cart.push(product); // Add product to array
  localStorage.setItem('cart', JSON.stringify(cart)); // Save to storage
  cartCount.textContent = cart.length; // Update count
  showCartItems(); // Refresh cart items
  cartPanel.classList.add('show'); // Open cart panel
}

// ✅ Function: Display all cart items
function showCartItems() {
  cartItemsDiv.innerHTML = ""; // Clear old items
  let total = 0;

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>No items in cart 🛒</p>";
    totalPriceEl.textContent = "Total: $0.00";
    return;
  }

  // ✅ Loop through all cart items
  cart.forEach((item, i) => {
    total += item.price; // Add each item price
    cartItemsDiv.innerHTML += `
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <img src="${item.image}" alt="">
        <div style="flex:1;margin-left:10px;">
          <p>${item.title}</p>
          <strong>$${item.price}</strong>
        </div>
        <button onclick="removeItem(${i})">❌</button>
      </div>
    `;
  });

  // ✅ Update total price
  totalPriceEl.textContent = `Total: $${total.toFixed(2)}`;
}

// ✅ Function: Remove item from cart
function removeItem(index) {
  cart.splice(index, 1); // Delete one item
  localStorage.setItem('cart', JSON.stringify(cart)); // Update storage
  cartCount.textContent = cart.length;
  showCartItems(); // Refresh list
}

// ✅ Checkout Button click event
checkoutBtn.onclick = () => {
  let total = cart.reduce((sum, item) => sum + item.price, 0);

  if (cart.length === 0) {
    alert("🛒 Your cart is empty!");
  } else {
    alert(`✅ Purchase successful! Total amount: $${total.toFixed(2)}`);
    cart = []; // Empty the cart
    localStorage.removeItem('cart');
    cartCount.textContent = 0;
    showCartItems();
  }
};

// ✅ Open & Close Cart Panel
cartIcon.onclick = () => cartPanel.classList.add('show');
closeCart.onclick = () => cartPanel.classList.remove('show');

// ✅ Run when page loads
showCartItems();
