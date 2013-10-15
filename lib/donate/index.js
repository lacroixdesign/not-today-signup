var express = require('express')
  , stripe  = require('stripe')(process.env.STRIPE_SECRET_KEY)
  ;

var app = module.exports = express();

app.post('/donate', function (req, res) {

  var token  = req.body.token
    , amount = req.body.amount * 100
    , email  = req.body.email
    ;
  if (token && amount && email) {

    // customer
    stripe.customers.create({ email: email }, function (error) {

      if (error)
        return res.send(400);

      // payment
      stripe.charges.create({
        currency: 'usd',
        amount:   amount,
        card:     token,
        description: 'Donated via web application.'
      }, function (error) {
        // error, customer
        if (error)
          return res.send(400);
        res.send(200);
      });

    });

  } else {
    res.send(400);
  }

});
