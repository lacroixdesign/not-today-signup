var url  = encodeURIComponent('https://www.nottodaycoalition.org');
var copy = 'I’m taking a stand against human trafficking and joining the '+
           '@NTCoalition. Check them out and learn more.';
var text = encodeURIComponent(copy);
var tweetHref = 'http://twitter.com/intent/tweet?url=' +url+ '&text=' +text;

/*
 * GET /
 */
exports.index = function(req, res) {
  res.render('static/index', {
    tweetHref: tweetHref
  });
};
