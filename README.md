# My-udemy
A simple project to practise **Node js**, **express**, **mongodb** and **npm packages**
To contribue check [CONTRIBUTING.md](https://github.com/ahmeddrawy/my-udemy/blob/master/CONTRIBUTING.md)
 * To clone 
```
  git clone https://github.com/ahmeddrawy/my-udemy.git
```
* install  npm packages 
```
  npm install 
```
### npm packages used and workflow 

* I used winston to log the errors and information, If you want to `console.log` errors you can use `winston.log` or `winston.error` 

* I use `bcrypt` to encrypt passwords before saving to database and decrypting after fetching from database

* I use `Joi` package to validate input 

* I use `Config` package to configure environment variables and configuration 

### First release

1. Rest Api including endpoints to 


-  Register user
-  Login user
-  Register Courses
-  delete Courses
-  edit Courses
-  authenticate user to login 
-  authorize users to do specific actions for example : Admins only can delete courses 

2.  persistent data on mongo db using [mongoose ODM](https://mongoosejs.com/)

3. Logging to mongo db and files using [Winston](https://www.npmjs.com/package/winston)
Todos

- [ ] add forgot password

- [ ] support sessions and CSRF tokens

- [ ] add front end to project to use API to provide udemy-like Clone 

Thanks for @mosh-hamedani for his efforts to support free learning and his content on Youtube
