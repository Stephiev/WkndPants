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

