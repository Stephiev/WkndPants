//retrieves localStorage data for form fields
$(document).ready(function(){
  function init(){
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
//stores form data on change with class of "stored"
$('.stored').change(function(){
  localStorage[$(this).attr('name')] = $(this).val();
});

// pants.html
var shoppingCart = [
  {
    "style": "The Basics",
    "sizes": {
      "small": 0,
      "medium": 0,
      "large": 0
    }
  },
  {
    "style": "Purple Mountain",
     "sizes": {
      "small": 0,
      "medium": 0,
      "large": 0
    }
  },
  {
    "style": "WKND Commander",
    "sizes": {
      "small": 0,
      "medium": 0,
      "large": 0
    }
  },
  {
    "style": "Aztec Mint",
    "sizes": {
      "small": 0,
      "medium": 0,
      "large": 0
    }
  }
];
var basic = shoppingCart[0];
var purple = shoppingCart[1];
var wknd = shoppingCart[2];
var aztec = shoppingCart[3];


$('#aztec_mint_cart').on('click', function(e){
  e.preventDefault();
  var pantSize = $('#aztec_mint_size').val();
  var qty = $('#aztec_mint_qty').val();
  aztec.sizes[pantSize] += eval(qty);
  storeCart();
  console.log(aztec.style + ", " + pantSize + ", " + aztec.sizes[pantSize]);
});

$('#the_basics_cart').on('click', function(e){
  e.preventDefault();
  var pantSize = $('#the_basics_size').val();
  var qty = $('#the_basics_qty').val();
  basic.sizes[pantSize] += eval(qty);
  storeCart();
  console.log(basic.style + ", " + pantSize + ", " + basic.sizes[pantSize]);
});

$('#purple_mountain_cart').on('click', function(e){
  e.preventDefault();
  var pantSize = $('#purple_mountain_size').val();
  var qty = $('#purple_mountain_qty').val();
  purple.sizes[pantSize] += eval(qty);
  storeCart();
  console.log(purple.style + ", " + pantSize + ", " + purple.sizes[pantSize]);
});

$('#wknd_cmdr_cart').on('click', function(e){
  e.preventDefault();
  var pantSize = $('#wknd_cmdr_size').val();
  var qty = $('#wknd_cmdr_qty').val();
  wknd.sizes[pantSize] += eval(qty);
  storeCart();
  console.log(wknd.style + ", " + pantSize + ", " + wknd.sizes[pantSize]);
});

$('#log').on('click', function() {
  console.log(aztec.style + ", S:" + aztec.sizes.small + ", M:" + aztec.sizes.medium + ", L:" + aztec.sizes.large);
  console.log(basic.style + ", S:" + basic.sizes.small + ", M:" + basic.sizes.medium + ", L:" + basic.sizes.large);
  console.log(purple.style + ", S:" + purple.sizes.small + ", M:" + purple.sizes.medium + ", L:" + purple.sizes.large);
  console.log(wknd.style + ", S:" + wknd.sizes.small + ", M:" + wknd.sizes.medium + ", L:" + wknd.sizes.large);
});

var cartStored;
var storeCart = function() {
  localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
  cartStored = true;
  localStorage.setItem('cartStored', JSON.stringify(cartStored))
};

$(document).ready(function(){
  var ifCartStored = JSON.parse(localStorage.getItem('cartStored'));
  if (ifCartStored == true) {
    var retrieveCart = JSON.parse(localStorage.getItem('shoppingCart'));
      shoppingCart = retrieveCart;
    };
});

