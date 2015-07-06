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
$('.session_stored').change(function(){
  sessionStorage[$(this).attr('name')] = $(this).val();
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

$('#aztec_mint_cart').on('click', function(e){
  e.preventDefault();
  var aztec = shoppingCart[3];
  var pantSize = $('#aztec_mint_size').val();
  var qty = $('#aztec_mint_qty').val();
  aztec.sizes[pantSize] += eval(qty);
  storeCart();
});

$('#the_basics_cart').on('click', function(e){
  e.preventDefault();
  var basics = shoppingCart[0];
  var pantSize = $('#the_basics_size').val();
  var qty = $('#the_basics_qty').val();
  basics.sizes[pantSize] += eval(qty);
  storeCart();
});

$('#purple_mountain_cart').on('click', function(e){
  e.preventDefault();
  var purple = shoppingCart[1];
  var pantSize = $('#purple_mountain_size').val();
  var qty = $('#purple_mountain_qty').val();
  purple.sizes[pantSize] += eval(qty);
  storeCart();
});

$('#wknd_cmdr_cart').on('click', function(e){
  e.preventDefault();
  var wknd = shoppingCart[2];
  var pantSize = $('#wknd_cmdr_size').val();
  var qty = $('#wknd_cmdr_qty').val();
  wknd.sizes[pantSize] += eval(qty);
  storeCart();
});

var runLog = function() {
  var basics = shoppingCart[0];
  var purple = shoppingCart[1];
  var wknd = shoppingCart[2];
  var aztec = shoppingCart[3];
  console.log(aztec.style + ", S:" + aztec.sizes.small + ", M:" + aztec.sizes.medium + ", L:" + aztec.sizes.large);
  console.log(basics.style + ", S:" + basics.sizes.small + ", M:" + basics.sizes.medium + ", L:" + basics.sizes.large);
  console.log(purple.style + ", S:" + purple.sizes.small + ", M:" + purple.sizes.medium + ", L:" + purple.sizes.large);
  console.log(wknd.style + ", S:" + wknd.sizes.small + ", M:" + wknd.sizes.medium + ", L:" + wknd.sizes.large);
};

var cartStored;
var storeCart = function() {
  localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
  cartStored = true;
  localStorage.setItem('cartStored', JSON.stringify(cartStored))
};

$(document).ready(function(){
  if (JSON.parse(localStorage.getItem('cartStored')) == true) {
    var retrieveCart = JSON.parse(localStorage.getItem('shoppingCart'));
      shoppingCart = retrieveCart;
    };
});

/*function clearContactStorage() {
  var contactButton = document.getElementById('submit_contact');
  if(contactButton.clicked ==true) {
console.log("It's true");
localStorage.getItem('contactpageemail').clear();

  }
}
var today = document.getElementById('submit_contact');
today.addEventListener('submit', clearContactStorage, false);*/
function clearData() {
  localStorage.removeItem('contactpagefirstname');
  localStorage.removeItem('contactpagelastname');
  localStorage.removeItem('contactpageemail');
  localStorage.removeItem('contactpagesubject');
  localStorage.removeItem('contactpagemessage');
}
