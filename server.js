'use strict';

// var mongoose = require('mongoose');
var express = require('express');

var app = express();

var chargeRouter = express.Router();

// mongoose.connect(process.env.MONGOLAB_URI || process.env.TOURSTEST_URI || 'mongodb://localhost/tours_development');

app.use(express.static(__dirname + '/app'));

require('./backend/routes/Pants_route')(chargeRouter);

app.use('/api', chargeRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log('server running on port ' + (process.env.PORT || 3000));
});
