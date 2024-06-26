import * as cartModule from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

// Display correct cart quantity upon load up
updateCartQuantity();

let productsHTML = '';

// Generate the HTML for the all the product listings
products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${formatCurrency(product.priceCents)}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});

// Set the HTML for all the product listings
document.querySelector('.js-products-grid').innerHTML = productsHTML;

// Make the add to cart buttons interactive
document.querySelectorAll('.js-add-to-cart')
.forEach(button => {
    let addedMessageTimeoutId;
    
    button.addEventListener('click', () => {
      const { productId } = button.dataset;
      cartModule.addToCart(productId);
      updateCartQuantity();
      addedMessageTimeoutId = showAddedMessage(productId, addedMessageTimeoutId);
    });
  });

function updateCartQuantity() {
  const cartQuantity = cartModule.calculateCartQuantity();

  document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity;
}

function showAddedMessage(productId, addedMessageTimeoutId) {
  // Get this products unique added to cart message
  const addedMessage = document.querySelector(
    `.js-added-to-cart-${productId}`
  );
  
  // Make it visible
  addedMessage.classList.add('added-to-cart-visible');
  
  // Clear the previous timeout if present
  if (addedMessageTimeoutId) {
    clearTimeout(addedMessageTimeoutId);
  }

  // Remove visibility after 2 seconds
  const timeoutId = setTimeout(() => addedMessage.classList.remove('added-to-cart-visible'), 2000);

  addedMessageTimeoutId = timeoutId;

  return addedMessageTimeoutId;
}
  