export const cart = [];

export function addToCart(productId) {
  let matchingItem;
      
  // Check if item added is in the cart
  cart.forEach(cartItem => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });

  // Get the quantity selected
  const selector = document.querySelector(
    `.js-quantity-selector-${productId}`
  );
  const quantity = Number(selector.value);

  // Add item to the cart
  if (matchingItem) {
    // If item in the cart, update quantity
    matchingItem.quantity += quantity;

  } else {
    // Else place the item in the cart
    cart.push({
      productId,
      quantity
    });
  }
}