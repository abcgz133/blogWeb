// Introducing the User module
const { User, validateUser } = require('../../model/user');
// Introducint the Encryption module
const crypto = require("crypto");

module.exports = async (req, res, next) => {

	try {
		await validateUser(req.body)
	}catch (e) {
		// return res.redirect(`/admin/user-edit?message=${e.message}`);
		return next(JSON.stringify({path: '/admin/user-judge', message: e.message}))
	}

	// 1. the mail address should be judged to be unique
	let user = await User.findOne({email: req.body.email});
	if (user) {
		// return res.redirect(`/admin/user-edit?message=email address is already exist!`);
		let obj = {path: '/admin/user-judge', message: 'email address is already exist!'};
		return next(JSON.stringify({path: '/admin/user-judge', message: 'email address is already exist!'}))
	}
	
	// 2. Generate the corresponding hashed_password by using MD5 algorithm
	//  	A. Randomly generate "salt"
	//  	B. generate the passwordWithSalt by mixing the password from request and the salt 
	let salt = Math.round(new Date().valueOf() * Math.random());
	const password = req.body.password;
	let passwordWithSalt = password + salt;
	//      C. generate the corresponding hashed_password with passwordWithSalt by usint MD5 algorithm
	let md5 = crypto.createHash("md5");
    let hashed_password = md5.update(passwordWithSalt).digest("hex");

	// 3. store the related hashed_password and salt and other information from request to the MongoDB
	// 		A. the original password from the request should not be stored to the MongoDB
	req.body.password = "";
	req.body.hashed_password = hashed_password;
	req.body.salt = salt;

	await User.create(req.body);
	
	// 4. redirect to usersPage.js
	res.redirect('/admin/usersPage');
}