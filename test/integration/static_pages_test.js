/*jshint expr: true*/

var helper = require('../_helper.js')
  , expect = require('chai').expect;

describe('Static Pages Integration', function() {

  before(function () {
    this.server  = helper.server();
    this.browser = helper.browser();
  });

  after(function (done) {
    this.server.close(done);
  });

  describe('home page', function() {

    before(function (done) {
      var browser = this.browser;
      browser.visit('/', done);
    });

    it('should have a browser title', function () {
      var browser = this.browser;
      var title = browser.text('title');
      expect(title).to.contain('Not Today Coalition');
    });

  }); // home page

});
