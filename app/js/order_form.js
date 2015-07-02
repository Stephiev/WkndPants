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
