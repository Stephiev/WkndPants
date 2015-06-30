//retrieves localStorage data for form fields
$(document).ready(function () {
  function init() {
    $('.stored').each(function(){
      var name = $(this).attr('name');
      var val = $(this).val();
      if (localStorage[name]) {
        $(this).val(localStorage[name]);
      }
    });
  }
  init();
});
//stores form data on keyup with class of "stored"
$('.stored').change(function () {
  localStorage[$(this).attr('name')] = $(this).val();
});

// cart
var cart = [ ];

var shoppingCart = [
  {"style": "The Basics", "quantity": [0, 0, 0]},
  {"style": "Purple Mountain", "quantity": [0, 0, 0]},
  {"style": "WKND Commander", "quantity": [0, 0, 0]},
  {"style": "Aztec Mint", "quantity": [0, 0, 0]}
];

var parseSize = function(size) {
  if (size == 'size_S') {
    return 0;
  } else if (size == 'size_M') {
    return 1;
  } else if (size == 'size_L') {
    return 2;
  };
};

$('#aztec_mint_cart').on('click', function(e){
  e.preventDefault();
  var size = $('#aztec_mint_size').val();
  var qty = $('#aztec_mint_qty').val();
  var sizeVal = parseSize(size);
  shoppingCart[3].quantity[sizeVal] += eval(qty);
  console.log(shoppingCart[3].style + ", " + shoppingCart[3].quantity);
});

$('#the_basics_cart').on('click', function(e){
  e.preventDefault();
  var size = $('#the_basics_size').val();
  var qty = $('#the_basics_qty').val();
  var sizeVal = parseSize(size);
  shoppingCart[0].quantity[sizeVal] += eval(qty);
  console.log(shoppingCart[0].style + ", " + shoppingCart[0].quantity);
});

$('#purple_mountain_cart').on('click', function(e){
  e.preventDefault();
  var size = $('#purple_mountain_size').val();
  var qty = $('#purple_mountain_qty').val();
  var sizeVal = parseSize(size);
  shoppingCart[1].quantity[sizeVal] += eval(qty);
  console.log(shoppingCart[1].style + ", " + shoppingCart[1].quantity);
});

$('#wknd_cmdr_cart').on('click', function(e){
  e.preventDefault();
  var size = $('#wknd_cmdr_size').val();
  var qty = $('#wknd_cmdr_qty').val();
  var sizeVal = parseSize(size);
  shoppingCart[2].quantity[sizeVal] += eval(qty);
  console.log(shoppingCart[2].style + ", " + shoppingCart[2].quantity);
});

$('#log').on('click', function() {
  console.log(shoppingCart[0].style + ", " + shoppingCart[0].quantity);
  console.log(shoppingCart[1].style + ", " + shoppingCart[1].quantity);
  console.log(shoppingCart[2].style + ", " + shoppingCart[2].quantity);
  console.log(shoppingCart[3].style + ", " + shoppingCart[3].quantity);
});
