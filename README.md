

Catalogue

```

1.Introduction（a blog for Canadian wine users）

2. Testing of the adminstration platform

3. Testing the operation platform

4. Initialization and configuration 

  4.1 Initialization

  4.2 Platform Routing

  4.3 Configure management

  4.4 Middle ware of interceptor

  4.5 Authentication 

  4.6 Error handling

5. Scheme of the Data

  5.1 User

  5.2 Article

  5.3 comment


6. Tools used

  6.1 Session control

  6.2 template

  6.3 Password encryption processing

  6.4 Formidable

7、Nginx and the load balance
```
 


# 1.  Introduction（a blog for Canadian wine users）

This blog has 2 platforms. One is adminstration platform, the user should login to have the approval to manage the articles and users. 

Another one is operation platform. It is free to browse all articles listed but the user should login if he/she want to write down the comments about the articles.

## 1.1 The adminstration platform has these features :

List all articles which were consisted by picture of different wines and related text descriptions.

Manage(create, query , modify and delete) these articles by authentication.

Manage(create, query , modify and delete) the users by authentication.


## 1.2 The operation platform has these features:

List all articles which were consisted by picture of different wines and related text descriptions.

List detail of one articles and all related comments.

The user can write down his/her comments about one article if he/she has login the system.



# 2. Testing of the adminstration platform

## 2.1 User management

### 2.1.1 Login
![avatar](./graphics/Login.png)

### 2.1.2 List all users in pagination
![avatar](./graphics/List_all_users_in_pagination3.png)


### 2.1.3 Modify a user
![avatar](./graphics/Modify_a_user.png)
    
	
![avatar](./graphics/edit_a_user.png)

 

## 2.2 Article management

### 2.2.1 List all articles in pagination
![avatar](./graphics/List_all_articles_in_pagination(adminstrative_platform).png)



### 2.2.2 Delete an article
![avatar](./graphics/Delete_an_article.png)

 

# 3. Testing the operation platform

## 3.1 Article management

### 3.1.1 List all articles in pagination
![avatar](./graphics/List_all_articles_in_pagination(operational_platform).png)

 





 

## 3.2 Create a comment
![avatar](./graphics/Create_comment.png)

 






# 2. UI design

## 2.1 adminstration platform

2.1.1 User management

A. List all users in pagination

 



B. Create a user

 





2.1.2 Artcile management



A. List all articles in pagination



## 2.2 Operation platform

2.2.1 Article management

A. List all Articles in pagination





2.2.2 Comments management

A. submit a comment

 



 

# 4. Initialization and configuration 

 

## 4.1 Initialization

4.1.1 Initialization the project

```
  npm init -y
```

4.1.2 Install the folders for the project
```
public  - static resources

model - database

route -routing

views-template
```



 

4.1.3 Download third party modules required for the project
```
   npm install express mongoose art-template express-art-template
``` 

4.1.4 Install the server

        Here list the related codes in ./app.js
```
// Reference the express framework
   const express = require('express');
   // install the server 
   const app = express();
   // listen the port
   app.listen(3000);
   console.log('The server successfully startup, please visit : localhost:3000')
``` 

4.1.5 Setup the blog management template:

Here list the related codes in ./app.js
```

   // the folder of the view

   app.set('views', path.join(__dirname, 'views'));

   // Default suffix of frame template

   app.set('view engine', 'art');

   // the template engine

   app.engine('art', require('express-art-template'));

   //path of static resource

   app.use(express.static(path.join(__dirname, 'public')))
``` 

## 4.2 Platform Routing

Here list the related codes in ./app.js
```
   // reference the routing

   const home = require('./route/home');

   const admin = require('./route/admin');

   // Match request path using routing

   app.use('/home', home);

   app.use('/admin', admin);
```


## 4.3 Configure management

### 4.3.1 Connecting MongoDB
```
Here list the related  codes  in ./app.js

// reference the mongoose

const mongoose = require('mongoose');

// connect the MongoDB

mongoose.connect('mongodb://192.168.121.134:27017/blog', {useNewUrlParser: true })

.then(() => console.log('successfully connect the MongoDB'))

.catch(() => console.log('failed connect the MongoDB'))
```

## 4.4 Middle ware of interceptor

In ./middleware/loginGuard.js, create the login interceptors:
```
//If the user is not logged in, redirect the request to the login page

app.use('/admin', (req, res, next) => {

if (req.url != '/login' && !req.session.username) {

res.redirect('/admin/login');

} else {

next();

}

});

```




## 4.5 Authentication 

in ./app.js
```
// intercept all requests with authentication if the path is admin
app.use('/admin', require('./middleware/loginGuard'));
```


## 4.6 Error handling

Here list the related code in ./app.js
```
app.use((err, req, res, next) => {

// parse the err string JSON object to an JS object

// JSON.parse()

const result = JSON.parse(err);

// { path: '/admin/user-judge', message: 'The email address has been occupied' }

let params = [];

for (let attr in result) {

if (attr != 'path') {

params.push(attr + '=' + result[attr]);

}

}

res.redirect(`${result.path}?${params.join('&')}`);

})
```









# 5. Scheme of the Data



## 5.1 User

In ./model/user.js, Create the user collection in MongoDB
```
// create the user collection in MongoDB

// reference the mongoose

const mongoose = require('mongoose');

// create the rule of user collection

const userSchema = new mongoose.Schema({

username: {

type: String,

required: true,

minlength: 2,

maxlength: 20

},

email: {

type: String,

// the email should be unique

unique: true,

required: true

},

password: {

type: String,

required: true

},

// admin : super administrator

// normal : normal administrator

role: {

type: String,

required: true

},

// 0 : on use

// 1 : Disabled

state: {

type: Number,

default: 0

},

hashed_password: {

    type: String


},

salt: {

    type: String

}


});

 

// create the User

const User = mongoose.model('User', userSchema);
module.exports = {
User
}
```

## 4.2 Article

create the  ./model/article.js :
```
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
```

## 5.3 comment

create the  ./model/comment.js
```
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
```







# 6. Tools used

## 6.1 Session control

Using the session to store the attribution and configuration, for example, the user name,  when the user successfully login the adminstration platform. When the user click different web pages, the system can share these information by using the session_id.

## 6.2 template

## 6.3 Password encryption processing

Bcrypt is an excellent third-party password encryption software. But in the mainland of China, because of the network control, it is very difficult to install this software. So using the built-in software crypto in Node.js is an alternative way.



### 6.3.1 create the hashed_password and save

MD5 and salt

In creating the user, use the built-in MD5 algorithm API and adding the salt to encrypt the inputted password.  Hashed_password is the result of this encryption method. Finally save the hashed_password and related salt to MongoDB.

Below is the code(./controller/admin/user-creat.js):
```
// 2. Generate the corresponding hashed_password by using MD5 algorithm
  //    A. Randomly generate "salt"
  //    B. generate the passwordWithSalt by mixing the password from request and the salt 
  let salt = Math.round(new Date().valueOf() * Math.random());
  const password = req.body.password;
  let passwordWithSalt = password + salt;
  //      C. generate the corresponding hashed_password with passwordWithSalt by usint MD5 algorithm
  let md5 = crypto.createHash("md5");
    let hashed_password = md5.update(passwordWithSalt).digest("hex");

  // 3. store the related hashed_password and salt and other information from request to the MongoDB
  //     A. the original password from the request should not be stored to the MongoDB
  req.body.password = "";
  req.body.hashed_password = hashed_password;
  req.body.salt = salt;
```

 

### 6.3.2 Verify the inputted password.

In modifying the user, also use the MD5 algorithm and the salt saved in the MongoDB to get the encrypted value of the newly inputted password. If the result is equal to the hashed_password saved in the MongoDB, then we can verify the inputted password is true.  

Below is the code(./controller/admin/user-query.js )

 
```
  //3. Generate the corresponding hashed_password by using MD5 algorithm 
  let passwordWithSalt = req.body.password + user.salt; 
  let md5 = crypto.createHash("md5");
    let hashed_password = md5.update(passwordWithSalt).digest("hex");
  
  // query the user information if successfully
  if (user) {
    //4. Compare the hashed_password in the MongoDB and the one generated in 3rd.  
    if ( hashed_password == user.hashed_password ) {
      // if they are same
      
      //5. Store the related user name ,role and id in the request session
      req.session.username = user.username;
      req.session.role = user.role;
      req.session.userid = user._id;

      // 5. redirect: if the user.role is adminstrator, then redirect to admin platform, else to operation platform
      
      if (user.role == 'admin') {
        // redirect to adminstration platform
        res.redirect('/admin/usersPage');
      } else {
        // redirect to operation platform
        res.redirect('/home/');
      }
    } 
  }
  else {
    // if no user, then error handle
    res.status(400).render('admin/error', {msg: 'email or password error!'})
  }
``` 

## 6.4 Formidable

Formidable: parse the form, support the get/post method and upload the file.

### 6.4.1 install the module：
```
npm install formidable
```

### 6.4.2 parse the form information

 
```
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
```

# 7、Nginx and the load balance


