const { User } = require('../../model/user');

module.exports = async (req, res) => {

	// indicate the current link to aside.art 
	req.app.locals.currentLink = 'user';
	// get the request parameters, such as id and message
	const { message, id } = req.query;

	// if having the id in request, then judge that this is a "modify the user transaction"  
	if (id) {
		// modify the user 
		let user = await User.findOne({_id: id});
		// render to modify the user page:user-judge.art
		res.render('admin/user-judg', {
			message: message,
			user: user,
			link: '/admin/user-modify?id=' + id,
			button: 'EDIT',
			usernameSession: req.session.username,
			useridSession: req.session.userid, 
		});

	}else {
		// if without the id in request, then this is a "create transaction"
		// create a user 
		// render to create the user page:user-judge.art
		res.render('admin/user-judg', {
			message: message,
			
			link: '/admin/user-create',
			button: 'ADD',
			usernameSession: req.session.username,
			useridSession: req.session.userid,
		});
	}

	
}