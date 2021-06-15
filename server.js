// help to build out api 
const express = require('express')
const app = express()
// mongoose to help with my models and talking to my database 
const mongoose = require('mongoose')
// using passport b.c it comes with a great statagey to talk to microsoft azure login 
const passport = require('passport')
// express session lets u stay logged in
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
// this allows my to go into my databases saved in my config folder 
const connectDB = require('./config/database')
// below are my routes (when user makes request it will go off to the appropriate controller)
const authRoutes = require('./routes/auth')
const homeRoutes = require('./routes/home')
const todoRoutes = require('./routes/todos')
// var Client = require("dwolla-v2").Client;

require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Sessions ...saving and staying logged in 
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
  // Dwolla session 
  // var dwolla = new Client({
  //   key: mJEOC159epPybuC5AGa1KKHABuNzd55JbBsYfUFiqa6KIogvOd,
  //   secret: JQBiqoqyffnK5l1S2ITvcYRdG5tXOeD1EdJzp5y3r1bgX08ca6,
  //   environment: "sandbox", // defaults to 'production'
  // })

  // dwolla
  // .post("customers", {
  //   firstName: "Jane",
  //   lastName: "Doe",
  //   email: "jane@doe.com",
  // })
  // .then((res) => console.log(res.headers.get("location")));
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

  
app.use('/', homeRoutes)
app.use('/auth', authRoutes)
app.use('/todos', todoRoutes)
 
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    