const formidable = require('formidable');
const path = require('path');
const { Article } = require('../../model/article');
//const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
	// receive the parameters from the request 
	const { title, content,author } = req.body;
	// receive the id for modifying the related article
	const id = req.query.id;

	// 1.create the form parcing instance
	const form = new formidable.IncomingForm();
	// 2.Configure the storage location of uploaded files
	form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
	// 3.keep the suffixe of the uploaded file
	form.keepExtensions = true;
	form.parse(req, async (err, fields, files) => {
		//4. update the related article according the id
		await Article.updateOne({_id: id}, {
			title: fields.title,
			author: fields.author,
			publishDate: fields.publishDate,
			cover: files.cover.path.split('public')[1],
			content: fields.content,
			state: '0',
		});
		//5.redirect 
		res.redirect('/admin/articles-page');
	})
}