// 引用expess框架
const express = require('express');
// 处理路径
const path = require('path');
// 引入body-parser模块 用来处理post请求参数
const bodyPaser = require('body-parser');
// 导入express-session模块
const session = require('express-session');
// 导入art-tempate模板引擎
const template = require('art-template');
// 导入dateformat第三方模块
const dateFormat = require('dateformat');
// 导入morgan这个第三方模块
const morgan = require('morgan');
// 导入config模块
const config = require('config');
// 创建网站服务器
const app = express();
// 数据库连接
require('./model/connect');
// 处理post请求参数
app.use(bodyPaser.urlencoded({extended: false}));
// config the session
app.use(session({
	secret: 'secret key',
	saveUninitialized: false,
	cookie: {
		maxAge: 24 * 60 * 60 * 1000
	},
	resave: false
}));

// the location of the operation platform
app.set('views', path.join(__dirname, 'views'));
// the suffixes of the template 
app.set('view engine', 'art');
// whiel the suffixes is art, then using the "express-art-template"
app.engine('art', require('express-art-template'));
// 向模板内部导入dateFormate变量
template.defaults.imports.dateFormat = dateFormat;

// the static files 
app.use(express.static(path.join(__dirname, 'public')));

console.log('title文件： ',  config.get('title'));


if (process.env.NODE_ENV == 'development') {
	console.log('当前是开发环境')
	// 在开发环境中 将客户端发送到服务器端的请求信息打印到控制台中
	app.use(morgan('dev'))
} else {

	console.log('当前是生产环境')
}

// 引入路由模块
const home = require('./controller/home');
const admin = require('./controller/admin');

// intercept all requests with authentication if the path is admin
app.use('/admin', require('./middleware/loginGuard'));

// 为路由匹配请求路径
app.use('/home', home);
app.use('/admin', admin);

app.use((err, req, res, next) => {
	const result = JSON.parse(err);
	// {path: '/admin/user-judge', message: '密码比对失败,不能进行用户信息的修改', id: id}
	let params = [];
	//the result is  { path: '/admin/user-judge', message: '用户名不符合验证规则' }
	for (let attr in result) {
		// attr = 'message'
		if (attr != 'path') {
			// 'message=用户名不符合验证规则'
			params.push(attr + '=' + result[attr]);
		}
	}
	// the params is  [ 'message=用户名不符合验证规则' ]  
	console.log("in app.js the params is ", params);
	//    message=邮箱地址已经被占用
	console.log("in app.js the params join with & is", params.join('&'));
	//    一样： message=邮箱地址已经被占用
	console.log("in app.js the params join with 8 is", params.join('8'));
	//the redirect is  /admin/user-judge?message=用户名不符合验证规则
	console.log("Here in app.js about the error, the redirect is, with template STR ", `${result.path}?${params.join('&')}`);
	//console.log("Here in app.js about the error, the redirect is ", `${result.path}?${params.join('&')}`);
	res.redirect(`${result.path}?${params.join('&')}`);
})

// 监听端口
app.listen(3000);
console.log('网站服务器启动成功')
console.log('后台地址：http://localhost:3000/admin/login')
console.log('前台地址：http://localhost:3000/home')
console.log('前台第二地址：http://192.168.3.143:3000/home')
console.log('登录邮箱：itheima@itcast.cn  密码：123456');
