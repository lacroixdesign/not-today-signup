var express   = require('express')
  , mandr_lib = require('mandrill-api/mandrill')
  , mandrill  = new mandr_lib.Mandrill(process.env.MANDRILL_KEY)
  ;

var app = module.exports = express();

app.post('/share', function (req, res) {

  var email        = req.body.email
    , lastName     = req.body.lastName
    , firstName    = req.body.firstName
    , destinations = req.body.destinations || []
    , templateName = process.env.MANDRILL_TEMPLATE
    ;

  if (email && firstName && lastName && destinations.length > 0) {

    // set data
    var fullName = (firstName.trim() + ' ' + lastName.trim()).trim();
    var toEmails = destinations.map(function (dest) {
      return { 'email': dest };
    });
    var templateContent = [{}];
    var message = {
      'to': toEmails,
      'global_merge_vars': [{
        'name': 'name',
        'content': fullName
      }]
    };

    // send
    mandrill.messages.sendTemplate({
      'template_name':    templateName,
      'template_content': templateContent,
      'message': message
    }, function () {
      // success (result)
      res.send(200);
    }, function () {
      // error (error)
      res.send(400);
    });

  } else {
    res.send(400);
  }

});
