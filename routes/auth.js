'use strict';

module.exports = (app, passport) => {
  app.get('/login/bitbucket',
    passport.authenticate('bitbucket'));

  app.get('/login/bitbucket/return', 
    passport.authenticate('bitbucket', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/');
  });

  app.get('/profile',
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res){
      res.send({ user: req.user });
  });
}