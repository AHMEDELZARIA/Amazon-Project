export let cart = [{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 2
}, {
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 1
}];

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

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach(cartItem => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
}