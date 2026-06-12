// ============================================================
// EXERCISE: Functions & Parameters
// ============================================================

// Formats a price with a currency symbol (RETURN version)
function formatPrice(amount, currency) {
  return `${currency} ${amount.toFixed(2)}`;
}

// ============================================================

// TODO 1: call formatPrice() with a price of your choice
console.log(formatPrice(15, "$"));

// ============================================================

// TODO 2: discount function
function discount(price, percent) {
  const reducedPrice = price - (price / 100) * percent;
  console.log(`Price after discount: CHF ${reducedPrice.toFixed(2)}`);
}

// TODO 3: call discount() with two examples
discount(100, 20);
discount(50, 10);

// ============================================================

// Example call using return value
const myNewPrice = formatPrice(1000, "CHF");
console.log("myNewPrice:", myNewPrice);

// ============================================================

const cart = [
  { name: "Tomatoes", price: 2.5 },
  { name: "Bread", price: 4.2 },
  { name: "Olive Oil", price: 8.9 },
];

// TODO 5: print cart
function printCart(cartItems) {
  for (let i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];
    console.log(`${item.name} — ${formatPrice(item.price, "CHF")}`);
  }
}

// TODO 6: call printCart
printCart(cart);