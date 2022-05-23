// introducing the Express module
const express = require('express');
// the rounter of adminstration platform
const admin = express.Router();

// the login Page rounter
admin.get('/login', require('./admin/loginPage'));

// the login processing
admin.post('/login', require('./admin/user-query'));

// list all users in pagination
admin.get('/usersPage', require('./admin/usersPage'));

// logout
admin.get('/logout', require('./admin/logout'));

// judge whether to modify or create the user
admin.get('/user-judge', require('./admin/user-judge'));

// create a user
admin.post('/user-create', require('./admin/user-create'));

// modify a user
admin.post('/user-modify', require('./admin/user-modify'));

// delete a user
admin.get('/user-delete', require('./admin/user-delete'));

// list all articles in pagination
admin.get('/articles-page', require('./admin/articles-page'));

// judge whether to modify an article or to create an article
admin.get('/article-judge', require('./admin/article-judge'));

// create an article
admin.post('/article-create', require('./admin/article-create'));


// query articles by criteria
admin.post('/article-query', require('./admin/article-query'));

// delete an article
admin.get('/article-delete', require('./admin/article-delete'));


// modify an article
admin.post('/article-modify', require('./admin/article-modify'));

// export the article module
module.exports = admin;