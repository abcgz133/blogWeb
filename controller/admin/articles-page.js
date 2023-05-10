// introducing the Article module
const { Article } = require('../../model/article');
// introducing the pagination module
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {
	// 1.receive the current page number from the request
	const page = req.query.page;
	// indicate the currentLink to the aside.art
	req.app.locals.currentLink = 'article';
	
	// 2. find all the items in one page in articles in the MongoDB
	//page---the current page number
	//size--item quantity showed in each page
	//display-- the showed pages in the pagination
	//usernameSession--logged-in username in session
	let articles = await pagination(Article).find().page(page).size(5).display(4).populate('author').exec();

	// 3. res.send(articles);

	// 渲染文章列表页面模板
	res.render('admin/articles-page.art', {
		articles: JSON.parse(JSON.stringify(articles)),
		usernameSession: req.session.username
		
	});
}