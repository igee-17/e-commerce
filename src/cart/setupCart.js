// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from "../utils.js";
import { openCart } from "./toggleCart.js";
import { findProduct } from "../store.js";
import addToCartDOM from "./addToCartDOM.js";
// set items

// selecting the needed elements
const cartItemCountDOM = getElement(".cart-item-count");
const cartItemsDOM = getElement(".cart-items");
const cartTotalDOM = getElement(".cart-total");

let cart = getStorageItem("cart");

export const addToCart = (id) => {
  let item = cart.find((cartItem) => cartItem.id === id);
  if (!item) {
    let product = findProduct(id);
    product = { ...product, amount: 1 };
    cart = [...cart, product];
    addToCartDOM(product);
  } else {
    // update item
    const amount = increaseAmount(id);
    const elements = [...cartItemsDOM.querySelectorAll(".cart-item-amount")];
    const element = elements.find((item) => item.dataset.id === id);
    element.textContent = amount;
  }
  // ADD ONE TO THE ITEM COUNT
  displayCartItemCount();
  // DISPLAY CART TOTALS
  displayCartTotal();
  // SET CART TO LOCAL STORAGE
  setStorageItem("cart", cart);
  openCart();
};

function displayCartItemCount() {
  const amount = cart.reduce((acc, cartItem) => {
    return (acc += cartItem.amount);
  }, 0);
  cartItemCountDOM.textContent = amount;
}

function displayCartTotal() {
  const total = cart.reduce((acc, cartItem) => {
    return (acc += cartItem.price * cartItem.amount);
  }, 0);
  cartTotalDOM.textContent = `Total: ${formatPrice(total)}`;
}

// since we want to update some things on different pages where the 'setupCart' module is used(all the pages actually) we define a function that would run automatically on the different pages where this module is imported

function displayCartItemsDOM() {
  cart.forEach((cartItem) => addToCartDOM(cartItem));
}

function increaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount + 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;
}
function decreaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount - 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;
}

function removeItem(id) {
  cart = cart.filter((cartItem) => cartItem.id !== id);
}

function setupCartFunctionality() {
  cartItemsDOM.addEventListener("click", function (e) {
    const element = e.target;
    const parent = e.target.parentElement;
    const id = element.dataset.id;
    const parentID = parent.dataset.id;
    if (element.classList.contains("cart-item-remove-btn")) {
      removeItem(id);
      parent.parentElement.remove();
    }

    // INCREASE FUNCTIONALITY::
    if (parent.classList.contains("cart-item-increase-btn")) {
      const newAmount = increaseAmount(parentID);
      parent.nextElementSibling.textContent = newAmount;
    }
    // DECREASE FUNCTIONALITY::
    if (parent.classList.contains("cart-item-decrease-btn")) {
      const newAmount = decreaseAmount(parentID);
      if (newAmount === 0) {
        removeItem(parentID);
        parent.parentElement.parentElement.remove();
      }
      parent.previousElementSibling.textContent = newAmount;
    }

    // FUNCTIONS THAT WE WANT TO RUN BY DEFAULT(update the number of items in the cart, recalculate the total and update the new cart array)
    displayCartItemCount();
    displayCartTotal();
    setStorageItem("cart", cart);
  });
}

const init = () => {
  // display amount of cart items
  displayCartItemCount();
  // display total
  displayCartTotal();
  // add all cart items from local storage to the dom on page load
  displayCartItemsDOM();
  // setup functionality of the cart
  setupCartFunctionality();
};
init();
