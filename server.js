'use strict';

var mongoose = require('mongoose');
var express = require('express');

var app = express();

var pantsRouter = express.Router();

mongoose.connect(process.env.MONGOLAB_URI || process.env.PANTSTEST_URI || 'mongodb://localhost/pants_dev');

app.use(express.static(__dirname + '/app'));

require('./backend/routes/Pants_route')(pantsRouter);

app.use('/api', pantsRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log('server running on port ' + (process.env.PORT || 3000));
});
