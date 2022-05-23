// 引入mongoose第三方模块
const mongoose = require('mongoose');
// 导入config模块
const config = require('config');
console.log("host 意义不大= ", config.get('db.host'));
// 连接数据库
// mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`, {useNewUrlParser: true })
// 	.then(() => console.log('数据库连接成功'))
// 	.catch(() => console.log('数据库连接失败'))

//mongoose.connect(`mongodb://${config.get('db.host')}/${config.get('db.name')}`, { useNewUrlParser: true })
//	.then(() => console.log('数据库连接成功'))
//	.catch(() => console.log('数据库连接失败'))

mongoose.connect('mongodb://192.168.121.134:27017/blogWeb', { useNewUrlParser: true })
	.then(() => console.log('数据库连接成功'))
	.catch(() => console.log('数据库连接失败'));