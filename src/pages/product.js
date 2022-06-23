// global imports
import "../toggleSidebar.js";
import "../cart/toggleCart.js";
import "../cart/setupCart.js";
// specific
import { addToCart } from "../cart/setupCart.js";
import { singleProductUrl, getElement, formatPrice } from "../utils.js";

// selections
const loading = getElement(".page-loading");
const centerDOM = getElement(".single-product-center");
const pageTitleDOM = getElement(".page-hero-title");
const imgDOM = getElement(".single-product-img");
const titleDOM = getElement(".single-product-title");
const companyDOM = getElement(".single-product-company");
const priceDOM = getElement(".single-product-price");
const colorsDOM = getElement(".single-product-colors");
const descDOM = getElement(".single-product-desc");
const cartBtn = getElement(".addToCartBtn");

// cart product
let productID;

// show product when page loads
window.addEventListener("DOMContentLoaded", async function () {
  const urlID = window.location.search;

  //   HANDLING FETCH ERROR
  // successful fetch request would have the response(without calling json() on the response yet) having a status greater than 200 but less than 299
  // in an api, the statusText would usually have a successful('ok') or error message('not found')
  //   here, catch is used an error that would occur due to network failure and the fetch request could not be performed
  // the if and else statement handles the error where the network is fine but there's something wrong with the url passed in, for which status would have a value other than 200-299
  //   CHANGE VALUE OF 'urlID' TO SEE HOW ERROR WOULD BE HANDLED
  try {
    const response = await fetch(`${singleProductUrl}${urlID}`);
    if (response.status >= 200 && response.status <= 299) {
      const product = await response.json();
      console.log(product);
    } else {
      console.log(response.status, response.statusText);
      centerDOM.innerHTML = `
    <div>
    <h3 class="error">sorry, something went wrong</h3>
    <a href="index.html" class="btn">back home</a>
    </div>
    `;
    }
  } catch (error) {
    console.log(error);
  }
  loading.style.display = "none";
});