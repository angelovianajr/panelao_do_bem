var isAuthenticated = function (req, res, next) {
    console.log(req.session.user);
    if (req.session.user)
        return next();

    res.redirect('/users/login');
}

module.exports = isAuthenticated;