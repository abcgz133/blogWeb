const { User } = require('../../model/user');

module.exports = async (req, res) => {
	// update the User set the state = '1'
	//await User.findOneAndDelete({_id: req.query.id});
	await User.updateOne({_id: req.query.id}, {
			state: '1',
		});
	
	
	// redirect to userspage
	res.redirect('/admin/usersPage');
}