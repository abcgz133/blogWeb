const { Article } = require('../../model/article');
// 导入分页模块
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {
	// 获取页码值
	const page = req.query.page;

	// 从数据库中查询数据
	let result = await pagination(Article).page(page).size(4).display(4).find().populate('author').exec();
	console.log("in home and index.js, the result is", result);
	// res.send('欢迎来到博客首页')
	// 渲染模板并传递数据
	res.render('home/articles-page.art', {
		result: JSON.parse(JSON.stringify(result)),
		usernameSession: req.session.username,
	});
}