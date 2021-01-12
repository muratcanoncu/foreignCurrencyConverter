"use strict";
const urlApi = "https://api.exchangerate-api.com/v4/latest/";
// From elements
let fromCurrency = document.querySelector("#from_currency");
let fromAmount = document.querySelector("#from_amount");
// to elements
let toCurrency = document.querySelector("#to_currency");
let toAmount = document.querySelector("#to_amount");

//! Above Side
function fromFunction() {
  fetch(`${urlApi}${fromCurrency.value}`)
    .then((response) => response.json())
    .then((data) => {
      let targetCurrency = data.rates[toCurrency.value];
      toAmount.value = Number(fromAmount.value) * targetCurrency;
    });
}
fromCurrency.addEventListener("change", fromFunction);
fromAmount.addEventListener("change", fromFunction);
//! Below Side
function toFunction() {
  fetch(`${urlApi}${fromCurrency.value}`)
    .then((response) => response.json())
    .then((data) => {
      let targetCurrency = data.rates[toCurrency.value];

      fromAmount.value = Number(toAmount.value) / targetCurrency;
    });
}
toCurrency.addEventListener("change", toFunction);
toAmount.addEventListener("change", toFunction);

//!  exchange button
let fromOptions = document.querySelectorAll("#from_currency option");
let toOptions = document.querySelectorAll("#to_currency option");
let exchangeBtn = document.querySelector("#exchange");
exchangeBtn.addEventListener("click", function () {
  fetch(`${urlApi}${fromCurrency.value}`)
    .then((response) => response.json())
    .then((data) => {
      let fromCurrencyName = fromCurrency.value;
      let fromCurrencyAmount = fromAmount.value;
      let toCurrencyName = toCurrency.value;
      let toCurrencyAmount = toAmount.value;
      for (let i = 0; i < fromOptions.length; i++) {
        fromOptions[i].removeAttribute("selected");
        if (fromOptions[i].value == toCurrencyName) {
          fromOptions[i].setAttribute("selected", "");
          fromAmount.value = toCurrencyAmount;
        }
        toOptions[i].removeAttribute("selected");
        if (toOptions[i].value == fromCurrencyName) {
          toOptions[i].setAttribute("selected", "");
          toAmount.value = fromCurrencyAmount;
        }
      }
    });
});
