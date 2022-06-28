const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const config = require("./config/database")

const homeroutes = require('./routes/homeroute')
const registerroutes = require('./routes/registerroute')



/* const passport = require('passport')
const userlogin = require('./models/userLogin')
const loginchecker = function(res,req,next){
  if (req.path != '/login' && req.path != '/' && !req.session.user) {
    req.redirect('/')
  }
  next()
} */
//instantiating express server
const app = express()

require('dotenv').config();
//connect mongoose
mongoose.connect(config.database,{ useNewUrlParser: true });
const db = mongoose.connection;

// Check connection
db.once('open', function(){
  console.log('Connected to MongoDB');
});

// Check for db errors
db.on('error', function(err){
  console.error(err);
});

//express sesssion 
const expressSession = require('express-session')({ 
    secret: 'secret', 
    resave: false, 
    saveUninitialized: false 
  }); 
     
  // views settings or configurations 
  //app.engine("pug", require("pug").__express);
  app.set("view engine", "pug"); 
  app.set('views', './views'); 
  //app.set("views", path.join(__dirname, "views"));
   
  // middle ware 
  app.use(express.urlencoded({extended: true})) 
  app.use(express.static(path.join(__dirname, 'public'))); 
  app.use(expressSession); /* 
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(loginchecker)

  passport.use(userlogin.createStrategy());
  passport.serializeUser(userlogin.serializeUser());
  passport.deserializeUser(userlogin.deserializeUser());
    */
   
  // routes 
  app.use('/', homeroutes)  
  app.use('/register', registerroutes) 
     
  // handling non existing routes 
  app.get('*', (req, res)=> { 
      res.status(404).send('OOPS! WRONG ADDRESS') 
  }) 
   
  // server 
  app.listen(3500, ()=> console.log("Listening on Port 3500"));
