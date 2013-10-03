var url  = encodeURIComponent('http://www.ntc.io');
var copy = 'I’m taking a stand against human trafficking and joining the '+
           '@nottodaycoalition. Check them out and learn more at '+
           'www.nottodaycoalition.org';
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
