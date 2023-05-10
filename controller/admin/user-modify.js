const { User } = require('../../model/user');
const crypto = require("crypto");

module.exports = async (req, res, next) => {
	// receive the parameters from the client request
	const { username, email, role, state, password } = req.body;
	const id = req.query.id;

	// find the user according the id from request
	let user = await User.findOne({_id: id});

	if (user) {
		//Generate the corresponding hashed_password by using MD5 algorithm
		// 1. generate the passwordWithSalt by mixing the password from request and the salt stored in the MongoDB
		let passwordWithSalt = req.body.password + user.salt; 
		// 2. create the hashed_password by using the MD5 algorithm with passwordWithSalt
		let md5 = crypto.createHash("md5"); 
		let hashed_password = md5.update(passwordWithSalt).digest("hex");

		//Store the updated password
		await User.updateOne({_id: id}, {
			username: username,
			email: email,
			role: role,
			state: state,
			hashed_password: hashed_password,
		});
		res.redirect('/admin/usersPage');
	}else {
		let obj = {path: '/admin/user-judge', message: 'user not exist', id: id}
		next(JSON.stringify(obj));
	}
}