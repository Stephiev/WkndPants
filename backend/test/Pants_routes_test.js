'use strict';

process.env.PANTSTEST_URI = 'mongodb://localhost/pants_test';
require('../../server.js');

var chai              = require('chai');
var chaiHttp          = require('chai-http');
var expect            = chai.expect;
var mongoose          = require('mongoose');
var wkndCommanders    = {"price": 32.00, "style": "WKND Commander", "sizes": { "small": 10, "medium": 18, "large": 18}};
var newWkndCommanders = {"altered": [{"style": "WKND Commander", "quantity": [2, 1, 0]}]};


chai.use(chaiHttp);
describe('Pants resource REST API', function() {

  before(function(done) {
    chai.request('localhost:3000')
      .post('/api/pants/create_pants')
      .send(wkndCommanders)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.success).to.eql(true);
        done();
      });
  });
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to create some pants', function(done) {
    var testPant = {
      style: 'Aztec Mint',
      price: 15,
      sizes: { small: 10, medium: 18, large: 18}
    };

    chai.request('localhost:3000')
      .post('/api/pants/create_pants')
      .send(testPant)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.success).to.eql(true);
        done();
      });
  });

  it('should be able to get current inventory', function(done) {
    chai.request('localhost:3000')
    .get('/api/wkndpants')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(Array.isArray(res.body)).to.eql(true);
      expect(res.body.length).to.not.eql(0);
      done();
    });
  });

  it('should update inventory according to users cart', function(done) {
    chai.request('localhost:3000')
    .patch('/api/pants/checkout_inventory')
    .send(newWkndCommanders)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.body.msg).to.eq("Updated inventory according to users cart");
      done();
    });
  });
});
