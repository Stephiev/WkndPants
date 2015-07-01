$(document).ready(function(){
  if (JSON.parse(localStorage.getItem('cartStored')) == true) {
    console.log(shoppingCart[0].style + ", " + shoppingCart[0].quantity);
    console.log(shoppingCart[1].style + ", " + shoppingCart[1].quantity);
    console.log(shoppingCart[2].style + ", " + shoppingCart[2].quantity);
    console.log(shoppingCart[3].style + ", " + shoppingCart[3].quantity);

    if (shoppingCart[0].quantity[0] > 0) {
      $('.cart_heading').after('<li>'+ shoppingCart[0].style + ' ' + 'Small' + ' ' + '$32' + ' ' + '<input type="number" class="cart_qty_input" value="' + shoppingCart[0].quantity[0] + '"></input><button class="delete">X</button><li>');
};
  } else {
    $('.cart_heading').after('<li>Your cart is empty<li>')
  }
});


