// 引入formidable第三方模块
const pagination = require('mongoose-sex-page');
const formidable = require('formidable');
const path = require('path');
const { Article } = require('../../model/article')

module.exports = async(req, res,next) => {
	const { title, content } = req.body;
	const page = req.query.page;
	console.log("in article-query.js, the title is ", title);
	
	// 1.创建表单解析对象
	const form = new formidable.IncomingForm();
	// 4.解析表单
	form.parse(req, async (err, fields, files) => {
		// 1.err错误对象 如果表单解析失败 err里面存储错误信息 如果表单解析成功 err将会是null
		// 2.fields 对象类型 保存普通表单数据
		// 3.files 对象类型 保存了和上传文件相关的数据
		// res.send(files.cover.path.split('public')[1])
		// chen: 本回调函数，是执行完 form.parse()之后，即把request上来的数据解析后，再执行的。
		//await Article.create({
		//	title: fields.title,
		//	author: fields.author,
		//	publishDate: fields.publishDate,
		//	cover: files.cover.path.split('public')[1],
		//	content: fields.content,
		//	state: '0'
		//});
		// 将页面重定向到文章列表页面
		console.log("in article-query.js, the inqury title , is", fields.title);
		let params = [];
		//substring(index, index)
		params.push('/'+fields.title+'/');
		// 'message=用户名不符合验证规则'
		//console.log("in article-query.js， the filterStrcyc is ", filterStrcyc);
		let filterStr = {title: params.join('&')};
		console.log("in article-query.js the filterStr is ", filterStr);
		let articles = await pagination(Article).find(filterStr).page(page).size(8).display(5).populate('author').exec();
		console.log("in article-query.js the articles is :", articles);
		// 渲染文章列表页面模板
		res.render('admin/articles-page.art', {
			articles: JSON.parse(JSON.stringify(articles)),
			usernameSession: req.session.username
		})
		
	})
	// res.send('ok');
	
			//db.articles.find({"title": /chen/ })
		
}
