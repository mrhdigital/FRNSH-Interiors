var exports = {}

exports.dashboard = function(req,res){
    res.render('dashboard'); 
}

// Upon logout, invalidate the session for security
// and renders the home page
exports.logout = function(req,res){
  req.session.destroy(function(err) {
  res.redirect('/');
  });
}

module.exports = exports;