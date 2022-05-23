const { Article } = require('../../model/article');

module.exports = async (req, res) => {
	// get the id from request
	// res.send(req.query.id)
	// 
	//await Article.findOneAndDelete({_id: req.query.id});
	
	// update the related article to set the state with 'deleted' according the id
	await Article.updateOne({_id: req.query.id}, {
			state: '1',
		});
	
	// redirect
	res.redirect('/admin/articles-page');
}