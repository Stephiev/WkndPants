"use strict";

var bodyparser = require("body-parser");
var stripe = require("stripe")("sk_test_Aj437DKjY2iX4iKjlb1zinQN");
// var Tour       = require("../models/Tour.js");

module.exports = function(router) {
  router.use( bodyparser.urlencoded({extended: true}) );


  router.post("/charge", function(req, res) {
      // Set your secret key: remember to change this to your live secret key in production
      // See your keys here https://dashboard.stripe.com/account/apikeys

      // (Assuming you're using express - expressjs.com)
      // Get the credit card details submitted by the form
      var stripeToken = req.body.stripeToken;
      // console.log("req");
      // console.log(req.body);

      var charge = stripe.charges.create({
        amount: 3200, // amount in cents, again
        currency: "usd",
        source: stripeToken,
        description: "Example charge"
      }, function(err, charge) {
        if (err && err.type === 'StripeCardError') {
          // The card has been declined
          console.log("Card declined");
        }
      });

  });
};
