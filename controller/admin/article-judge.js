const { Article } = require('../../model/article');
module.exports = async(req, res) => {

	// indicate the current link to aside.art 
	req.app.locals.currentLink = 'article';
	// get the id and message from the request
	const { message, id } = req.query;

	// if have the id
	if (id) {
		// modify the article
		let article = await Article.findOne({_id: id});
		// render to modify the article
		res.render('admin/article-judge.art', {
			message: message,
			article: article,
			link: '/admin/article-modify?id=' + id,
			button: 'EDIT',
			usernameSession: req.session.username,
			useridSession: req.session.userid,
		});
	
	// without the id  	
	}else {
		// create an article
		// render to create an article
		res.render('admin/article-judge.art',{
			message: message,
			link: '/admin/article-create',
			button: 'ADD',
			usernameSession: req.session.username,
			useridSession: req.session.userid,
		});
	}
}