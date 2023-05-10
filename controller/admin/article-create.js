// introducing the formidable module
const formidable = require('formidable');
const path = require('path');
const { Article } = require('../../model/article')

module.exports = (req, res) => {
	// 1.new a formidable instance to parse the form
	const form = new formidable.IncomingForm();
	// 2.config the path to store the upload file 
	form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
	// 3.keep the suffix of the uploaded file
	form.keepExtensions = true;
	// 4.parse the form
	form.parse(req, async (err, fields, files) => {
			//5. create the article in the MongoDB  
			await Article.create({
			title: fields.title,
			author: fields.author,
			publishDate: fields.publishDate,
			cover: files.cover.path.split('public')[1],
			content: fields.content,
			state: '0'
		});
		// redirect
		res.redirect('/admin/articles-page');
	})
	// res.send('ok');
}
