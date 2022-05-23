// Introducing the Comment module
const { Comment } = require('../../model/comment'); 

module.exports = async (req, res) => {
	//1. receive the parameters from request
	const { content, uid, aid } = req.body;

	// 2. create the comment in the MongoDB
	await Comment.create({
		content: content,
		uid: uid,
		aid: aid,
		time: new Date()
	});

	// 3. redirect
	res.redirect('/home/article?id='+ aid);
}