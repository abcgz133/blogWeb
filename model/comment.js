// Intriducing the mongoose module
const mongoose = require('mongoose');

// creating the comment schema
const commentSchema = new mongoose.Schema({
	// article id
	aid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Article'
	},
	// user id
	uid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	// comment date
	time: {
		type: Date
	},
	// content of the comment
	content: {
		type: String
	}
});

// creating the comment collection 
const Comment = mongoose.model('Comment', commentSchema);

// export the comment module
module.exports = {
	Comment
}