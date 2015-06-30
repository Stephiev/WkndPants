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
var cart = [];

var cartItem = function(style, size, qty) {
  this.style = style;
  this.price = 32;
  this.size = size;
  this.qty = qty;
};

$('#aztec_mint_cart').on('click', function(e){
  e.preventDefault();
  var style = 'aztec';
  var size = $('#aztec_mint_size').val();
  var qty = $('#aztec_mint_qty').val();
  var order = new cartItem(style, size, qty);
  cart.push(order);
});

$('#the_basics_cart').on('click', function(e){
  e.preventDefault();
  var style = 'basics';
  var size = $('#the_basics_size').val();
  var qty = $('#the_basics_qty').val();
  var order = new cartItem(style, size, qty);
  cart.push(order);
});

$('#purple_mountain_cart').on('click', function(e){
  e.preventDefault();
  var style = 'purple';
  var size = $('#purple_mountain_size').val();
  var qty = $('#purple_mountain_qty').val();
  var order = new cartItem(style, size, qty);
  cart.push(order);
});

$('#wknd_cmdr_cart').on('click', function(e){
  e.preventDefault();
  var style = 'wknd_cmdr';
  var size = $('#wknd_cmdr_size').val();
  var qty = $('#wknd_cmdr_qty').val();
  var order = new cartItem(style, size, qty);
  cart.push(order);
});

$('#log').on('click', function() {
  cart.filter(function(cartItem){
    $.each(cartItem, function(){
      console.log(cartItem.style + ", " + cartItem.size + ", " + cartItem.qty);
    });
  });
});

