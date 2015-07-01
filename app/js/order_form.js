var billingCheckbox = document.getElementById("billing_shipping_same");
var firstName = document.getElementById("shipping_firstname").value;

var lastName = document.getElementById("shipping_lastname").value;

var addressOne = document.getElementById("shipping_street1").value;

var addressTwo = document.getElementById("shipping_street2").value;

var shippingCity = document.getElementById("shipping_city").value;

var shippingState = document.getElementById("shipping_state").value;

var shippingZip = document.getElementById("shipping_zip").value;
console.log(shippingState);
console.log(shippingZip);

function addToBilling() {
  if(billingCheckbox.checked) {

document.getElementById("billing_firstname").value.innerHTML = firstName;
document.getElementById("billing_lastname").innerHTML = lastName;
document.getElementById("billing_street1").textContent = addressOne;
document.getElementById("billing_street2").textContent = addressTwo;
document.getElementById("billing_city").textContent = shippingCity;
document.getElementById("billing_state").textContent = shippingState;
document.getElementById("billing_zip").innerHTML = shippingZip;
} else {
  }
}
billingCheckbox.addEventListener('change', addToBilling, false);
