/*jshint expr: true*/

// var expect  = require('chai').expect
var request = require('supertest')
  , helper  = require('../_helper.js')
  , app     = helper.app
  ;

describe('POST /join', function() {

  it('signs up an email address with name', function (done) {
    request(app)
      .post('/join')
      .send({ email: 'test@lacroixdesign.net', name: 'Test Name' })
      .expect(200, done);
  });

  it('responds with error for existing email address', function (done) {
    request(app)
      .post('/join')
      .send({
        email:     'michael@lacroixdesign.net',
        firstName: 'Firstname',
        lastName:  'Lastname'
      })
      .expect('Content-Type', /json/)
      .expect(/already signed up/)
      .expect(400, done);
  });

});

describe('POST /start', function() {

  it('signs up an email address with name', function (done) {
    request(app)
      .post('/start')
      .send({ email: 'test@lacroixdesign.net', name: 'Test Name' })
      .expect(200, done);
  });

  it('responds with error for existing email address', function (done) {
    request(app)
      .post('/start')
      .send({ email: 'michael@lacroixdesign.net', name: 'Test Name' })
      .expect('Content-Type', /json/)
      .expect(/already signed up/)
      .expect(400, done);
  });

});
