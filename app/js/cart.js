var postTotal;

$(document).ready(function(){

  carting(shoppingCart, "Small")
  carting(shoppingCart, "Medium")
  carting(shoppingCart, "Large")

  function carting(shoppingCart, sizeRequested) {
    for (var i = 0; i < 4; i++) {
      if (shoppingCart[i].sizes[sizeRequested.toLowerCase()] > 0) {
        $('.cart_heading').after('<li class="cart_item" id="' + sizeRequested + i + '"><span class="cart_item_desc">'+ shoppingCart[i].style + '</span><span class="cart_item_size">Size: ' + sizeRequested + '</span><span class="cart_item_price">Price: $32</span><span class="cart_item_inputs">Qty:<input type="number" class="cart_qty_input" min="1" max="10" value="' + shoppingCart[i].sizes[sizeRequested.toLowerCase()] + '"></input><button type="button" name="' + sizeRequested + '" class="cart_item_delete" value="' + i + '">X</button></span><li>');
      }
    }
  }
  runLog();

  var setTotal;
  // var salesTax = 0;
  // $('#shipping_state').change(function(){
  //   if ($(this).val() == 'WA') {
  //     salesTax = (setTotal * 0.096).toFixed(2);
  //     console.log(salesTax)
  //   } else {
  //     salesTax = 0;
  //   }
  // })
  var shippingCost = $('#shipping_cost').val();
  var subTotal = function() {
    var totalCount = 0;
    $('.cart_qty_input').each(function() {
      totalCount = parseInt($(this).val()) + parseInt(totalCount);
    });
    setTotal = 32 * totalCount;
    $('#subtotal').text(setTotal);
    // var currentTotal = (setTotal + salesTax + shippingCost);
    // $('#total_cost').text(currentTotal);
    postTotal = setTotal * 100;
    // postTotal = currentTotal * 100;
    if (setTotal == 0) {
      cartStored = false;
      $('.cart_heading').after('<li class="cart_empty">Your cart is empty<li>');
    }
  };
  subTotal();

  $('.cart_item_delete').on('click', function(){
    var voidItem = $(this).val();
    var voidSize = $(this).attr('name');
    var listItemID = '#' + voidSize + voidItem;
    shoppingCart[voidItem].sizes[voidSize.toLowerCase()] = 0;
    storeCart();
    $(listItemID).next().detach();
    $(listItemID).detach();
    subTotal();
  })

  $('.cart_qty_input').change(function(){
    var changeItem = $(this).next().val();
    var changeSize = $(this).next().attr('name');
    shoppingCart[changeItem].sizes[changeSize.toLowerCase()] = $(this).val();
    storeCart();
    subTotal();
  });
});


// Javascript Code - - This will fill in the Billing Information if the Shipping and Billing are the same: Then it will remove the information if they unclick the button

function FillBilling(f) {
  if(f.addtobilling.checked == true) {
    f.billingname.value = f.shippingname.value;
    f.billinglastname.value = f.shippinglastname.value;
    f.billingstreetone.value = f.shippingstreetone.value;
    f.billingstreettwo.value = f.shippingstreettwo.value;
    f.billingcity.value = f.shippingcity.value;
    f.billingstate.value = f.shippingstate.value;
    f.billingzip.value = f.shippingzip.value;
  }
  else if(f.addtobilling.checked == false) {
    f.billingname.value = "";
    f.billinglastname.value = "";
    f.billingstreetone.value = "";
    f.billingstreettwo.value = "";
    f.billingcity.value = "";
    f.billingstate.value = "";
    f.billingzip.value = "";
  }
}

//testing post function for cart
var handler = StripeCheckout.configure({
    key: 'pk_test_OFTA5a7DOFLTHLhwrNT6YKyt',
    token: function(token) {
      // Use the token to create the charge with a server-side script.
      // You can access the token ID with `token.id`
    }
  });

$('#test_submit').on('click', function(e){
  $.ajax({
    type        :   'POST',
    url         :   '/api/pants/checkout_inventory',
    data        :   { "altered": shoppingCart, "total": postTotal},
    dataType    :   "json",
    success     :   function successful(data) {
      console.log("Request was successful");
      console.log(data)
    }
  });
  handler.open({
    name: 'WKND Pants',
    description: 'pants',
    amount: postTotal
  });
  e.preventDefault();

  $(window).on('popstate', function() {
    handler.close();
  });
});

