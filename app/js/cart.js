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

  var shippingCost = $('#shipping_cost').val();

  $('#shipping_state').change(function(){
    subTotal();
  });

  var subTotal = function() {
    var totalCount = 0;
    $('.cart_qty_input').each(function() {
      totalCount = parseInt($(this).val()) + parseInt(totalCount);
    });
    setTotal = 32 * totalCount;

    $('#subtotal').text(setTotal);

    var salesTax;
    if ($('#shipping_state').val() == 'WA') {
      salesTax = parseInt(setTotal * 9.6)/100;
      } else {
        salesTax = 0;
      };
    $('#sales_tax').val(salesTax);
    console.log(salesTax);

    var currentTotal = Math.round((setTotal + salesTax + (parseInt(shippingCost*100)/100))*100)/100;
    $('#total_cost').val(currentTotal);

    postTotal = Math.round(currentTotal * 100);
    console.log(postTotal);

    if (setTotal == 0) {
      cartStored = false;
      $('.cart_heading').after('<li class="cart_empty">Your cart is empty<li>');
      $('#total_cost').addClass('hidden');
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

$('#customButton').on('click', function(e){
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
  localStorage.removeItem('shoppingCart');
  localStorage.removeItem('cartStored');
});

