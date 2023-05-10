// introducing the User module
const { User } = require('../../model/user');

module.exports = async (req, res) => {

	// indicate the current link to aside.art
	req.app.locals.currentLink = 'user';
	
	// 1. create the total pages, item quantity showed in each page
	// page---the current page number
	let page = req.query.page || 1;
	// pagesize--item quantity showed in each page
	let pagesize = 5;
	// count -the total quantity of the user
	let count = await User.countDocuments({});
	// total--total pages
	let total = Math.ceil(count / pagesize);

	// Start- position of items in related page number
	let start = (page - 1) * pagesize; 

	//2. query to find all the information in the related page number
	//var filterStr = {"state": '0'};
	//let users = await User.find(filterStr).limit(pagesize).skip(start)
	let users = await User.find({}).limit(pagesize).skip(start)
	
	//3. render to show the users in pagination
	// render to users-page.art and transmit the current page number(page) , 
	// total quantity(total) and the logged-in username in session 
	res.render('admin/users-page', {
		users: JSON.parse(JSON.stringify(users)),
		page: page,
		total: total,
		usernameSession: req.session.username
	});
}