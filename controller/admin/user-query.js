// introducing the User module
const { User } = require('../../model/user');

const crypto = require("crypto");

module.exports = async (req, res) => {
	//1. receive the parameters from request
	const {email, password} = req.body;
	if (email.trim().length == 0 || password.trim().length == 0) return res.status(400).render('admin/error', {msg: 'email or password invalid'});
	
	//2. query the user information by using the e-mail
	let user = await User.findOne({email});
	
	//3. Generate the corresponding hashed_password by using MD5 algorithm 
	let passwordWithSalt = req.body.password + user.salt; 
	let md5 = crypto.createHash("md5");
    let hashed_password = md5.update(passwordWithSalt).digest("hex");
	
	// query the user information if successfully
	if (user) {
		//4. Compare the hashed_password in the MongoDB and the one generated in 3rd.  
		if ( hashed_password == user.hashed_password ) {
			// if they are same
			
			//5. Store the related user name ,role and id in the request session
			req.session.username = user.username;
			req.session.role = user.role;
			req.session.userid = user._id;
			
			
			//req.app.locals.userInfo = user;
			req.app.locals.userInfo = user;
			// 5. redirect: if the user.role is adminstrator, then redirect to admin platform, else to operation platform
			
			if (user.role == 'admin') {
				// redirect to adminstration platform
				res.redirect('/admin/usersPage');
			} else {
				// redirect to operation platform
				res.redirect('/home/');
			}
			
		} else {
			// if no user, then error handle
			
			res.status(400).render('admin/error', {msg: 'password error!'})
		}
	} else {
		// if no user, then error handle
		res.status(400).render('admin/error', {msg: 'email or password error!'})
	}
}