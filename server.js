const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const connectDB = require('./config/database')
const authRoutes = require('./routes/auth')
const homeRoutes = require('./routes/home')
const todoRoutes = require('./routes/todos')
var Client = require("dwolla-v2").Client;

require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
  // Dwolla session 
  var dwolla = new Client({
    key: mJEOC159epPybuC5AGa1KKHABuNzd55JbBsYfUFiqa6KIogvOd,
    secret: JQBiqoqyffnK5l1S2ITvcYRdG5tXOeD1EdJzp5y3r1bgX08ca6,
    environment: "sandbox", // defaults to 'production'
  })

  dwolla
  .post("customers", {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@doe.com",
  })
  .then((res) => console.log(res.headers.get("location")));
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

  
app.use('/', homeRoutes)
app.use('/auth', authRoutes)
app.use('/todos', todoRoutes)
 
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    