$(document).ready(function(){
  if (JSON.parse(localStorage.getItem('cartStored')) == true) {
    runLog();

    carting(shoppingCart, "Small")
    carting(shoppingCart, "Medium")
    carting(shoppingCart, "Large")

    function carting(shoppingCart, sizeRequested) {
      for (var i = 0; i < 4; i++) {
        if (shoppingCart[i].sizes[sizeRequested.toLowerCase()] > 0) {
          $('.cart_heading').after('<li id="' + sizeRequested + i + '">'+ shoppingCart[i].style + ', ' + 'Size: <span class="this_size">' + sizeRequested + '</span>,' + ' ' + 'Price: $32,' + ' qty:' + '<input type="number" class="cart_qty_input" min="1" max="10" value="' + shoppingCart[i].sizes[sizeRequested.toLowerCase()] + '"></input><button type="button" name="' + sizeRequested + '" class="delete" value="' + i + '">X</button><li>');
        }
      }
    }
  } else {
    $('.cart_heading').after('<li>Your cart is empty<li>')
  }
  var setTotal;
  var subTotal = function() {
    var totalCount = 0;
    $('.cart_qty_input').each(function() {
      totalCount = parseInt($(this).val()) + parseInt(totalCount);
    });
    setTotal = 32 * totalCount;
    $('#subtotal').text(setTotal);
    if (setTotal == 0) {
      cartStored = false;
      $('.cart_heading').after('<li>Your cart is empty<li>');
    }
  };
  subTotal();

  $('.delete').on('click', function(){
    var voidItem = $(this).val();
    var voidSize = $(this).attr('name');
    var listItemID = '#' + voidSize + voidItem;
    shoppingCart[voidItem].sizes[voidSize.toLowerCase()] = 0;
    storeCart();
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

