// 1.introducing the mongoose module
const mongoose = require('mongoose');

// 2.create the  article schema
const articleSchema = new mongoose.Schema({
	title: {
		type: String,
		maxlength: 20,
		minlength: 0,
		required: [true, 'Pls input the title']
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: [true, 'Pls input the author']
	},
	publishDate: {
		type: Date,
		default: Date.now
	},
	cover: {
		type: String,
		default: null
	},
	content: {
		type: String
	},
	state: {
		type: String,
		default: '0'
	}
});

// 3. create the article collection according the schema
const Article = mongoose.model('Article', articleSchema);

// 4. export the module
module.exports = {
	Article
}