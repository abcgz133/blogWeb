// introducing the article module
const { Article } = require('../../model/article');
// introducing the comment module
const { Comment } = require('../../model/comment');

module.exports = async (req, res) => {
	// get the id from request 
	const id = req.query.id;
	// query the detail information from article according the id
	let article = await Article.findOne({_id: id}).populate('author');
	// query all the related comments about this article
	let comments = await Comment.find({aid: id}).populate('uid')
	// render : article.art to show the related comments and article
	//		usernameSession: the logged in username stored in the session
	//		useridSession: the logged in userid stored in the session
	res.render('home/article.art', { 
	  article: JSON.parse(JSON.stringify(article)),
	  comments: JSON.parse(JSON.stringify(comments)),
	  
	  usernameSession: req.session.username,
	  useridSession: req.session.userid,
  });
}