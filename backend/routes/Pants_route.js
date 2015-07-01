"use strict";

var bodyparser = require("body-parser");
var stripe     = require("stripe")("sk_test_Aj437DKjY2iX4iKjlb1zinQN");
var Pant       = require("../models/Pant.js");


module.exports = function(router) {
  router.use( bodyparser.urlencoded({extended: true}) );
  router.use( bodyparser.json() );

  router.get("/wkndpants", function(req, res) {
    Pant.find({}, function(err, pants) {
      res.json(pants)
      console.log(pants);
    })
  })

  // Don't really need this, maybee...
  router.post("/pants/create_pants", function(req, res) {
    var newPant = new Pant(req.body);

    newPant.save(function(err, pant) {
      if ( err ) {
        console.log( 'Error creating pants. Error: ', err );
        return res.status(500).json({ "success": false });
      };

      return res.json({ "success": true });
    });
  });

// Use when submitting a cart and after making payment
router.patch("/pants/checkout_inventory", function(req, res) {

    var style;
    var small;
    var medium;
    var large;

    for (var i=0; i<req.body.altered.length; i++) {

      style  = req.body.altered[i].style
      small  = req.body.altered[i].quantity[0];
      medium = req.body.altered[i].quantity[1];
      large  = req.body.altered[i].quantity[2]

      dbSearch(style, small, medium, large);
    }

    function dbSearch(style, small, medium, large) {
      Pant.findOne({ "style": style }, function (err, doc) {
        if (err) {
          console.log(err)
          res.json({ msg: "Internal server error"});
        }

        doc.sizes.small -= small;
        doc.sizes.medium -= medium;
        doc.sizes.large -= large;
        doc.save();
     });
    }

    res.json({ msg: "Updated inventory according to users cart" });
  })

  // Use when you want to overwrite with current inventory
  router.patch("/pants/update_inventory", function(req, res) {

    var style;
    var small;
    var medium;
    var large;

    for (var i=0; i<req.body.altered.length; i++) {

      style  = req.body.altered[i].style
      small  = req.body.altered[i].quantity[0];
      medium = req.body.altered[i].quantity[1];
      large  = req.body.altered[i].quantity[2]

      dbSearch(style, small, medium, large);
    }

    function dbSearch(style, small, medium, large) {
      Pant.findOne({ "style": style }, function (err, doc) {
        if (err) {
          console.log(err)
          res.json({ msg: "Internal server error"});
        }

        doc.sizes.small  = small;
        doc.sizes.medium = medium;
        doc.sizes.large  = large;
        doc.save();
     });
    }

    res.json({ msg: "Updated inventory" });
  })

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
