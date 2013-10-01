var express = require('express')
  , mcapi   = require('mailchimp-api')
  , mc      = new mcapi.Mailchimp(process.env.MAILCHIMP_KEY)
  ;

var app = module.exports = express();

function signUp (req, res, listId) {
  var email     = req.body.email
    , lastName  = req.body.lastName
    , firstName = req.body.firstName
    ;
  if (email) {
    mc.lists.subscribe({
      id: listId,
      email: { email: email },
      merge_vars: {
        'FNAME': firstName,
        'LNAME': lastName
      }
    }, function () {
      // success
      res.send(200);
    }, function (error) {
      // error
      var msg;
      if ('List_AlreadySubscribed' === error.name) {
        msg = "Oops! It appears that you're already signed up.";
      } else {
        msg = error.name;
      }
      res.json(400, { msg: msg });
    });
  } else {
    res.send(400);
  }
}

app.post('/join', function (req, res) {
  signUp(req, res, process.env.MAILCHIMP_LIST_JOIN);
});

app.post('/start', function (req, res) {
  signUp(req, res, process.env.MAILCHIMP_LIST_START);
});
