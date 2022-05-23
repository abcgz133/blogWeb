module.exports = (req, res) => {
	// destory session
	req.session.destroy(function () {
		// delete cookie
		res.clearCookie('connect.sid');
		// redirect to login
		res.redirect('/admin/login');
		// remove the information in req.app.locals
		req.app.locals.userInfo = null;
	});
}