import { getElement } from "../utils.js";
import display from "../displayProducts.js";

const setupCompanies = (store) => {
  let companies = ["all", ...new Set(store.map((item) => item.company))];
  const companiesDOM = getElement(".companies");
  companiesDOM.innerHTML = companies
    .map((company) => {
      return `<button class="company-btn">${company}</button>`;
    })
    .join("");
  // const element = getElement(".company-btn")
  companiesDOM.addEventListener("click", function (e) {
    const element = e.target;
    if (element.classList.contains("company-btn")) {
      if (element.textContent === "all") {
        let newStore = [...store];
        display(newStore, getElement(".products-container"));
      } else {
        let newStore = store.filter(
          (product) => product.company === element.textContent
        );
        display(newStore, getElement(".products-container"), true);
      }
    }
  });
};

export default setupCompanies;
