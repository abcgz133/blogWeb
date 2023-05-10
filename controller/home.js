// introducing the express module
const express = require('express');
// create the operation platform router
const home = express.Router();

// router of home in operation platform
home.get('/', require('./home/index'));

// router of show the detail of an article
home.get('/article', require('./home/article'));

// router of create a comment
home.post('/comment', require('./home/comment'));

// router of logout the system 
home.get('/logout', require('./home/logout'));

// export the routers of operation platform
module.exports = home;