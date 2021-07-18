const path = require('path')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const got = require('got')
const mongoose = require('mongoose')
const {Schema} = mongoose
const hashFunction = require('./hashFunction.js')

// configure the use of .env file and and initializes global variables

require('dotenv').config();

const PORT = process.env.PORT || 3001
const API_KEY = process.env.API_KEY
const MONGO_URI = process.env.MONGO_URI

const PUBLIC_FOLDER = path.resolve(__dirname, '../client/public')
const REACT_BUILD = path.resolve(__dirname, '../client/build')

// connects to MongoDB and logs an error if there is an error

mongoose.connect(
  MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => {
  console.log('MongoDB Connected')
})
.catch(err => console.log(err))

const userSchema = new Schema ({
  id: Number,
  username: String,
  password: String,
  cash: Number,
  positions: [{symbol: String, shares: Number, shareValue: Number, date: Date}],
})
const User = mongoose.model('User', userSchema);

const app = express()
app.use(cors())

// starts middleware for body parsing, static file hosting, and sessions

app.use(bodyParser.json())
app.use('/static', express.static(PUBLIC_FOLDER))
app.use(cookieSession({
  name: 'session',
  secret: 'super duper secret'
}))

//
// landing page
//

app.get('/', (req, res) => {
  res.sendFile(path.resolve(PUBLIC_FOLDER, 'landing.html'))
})

// registration endpoint
app.use('/register', bodyParser.urlencoded({extended: false}))
app.post('/register', (req, res) => {
  
  const newUser = new User({
      username: req.body.username,
      password: hashFunction.SHA256(req.body.password),
      cash: 10000,
      positions: []
    })

  newUser.save((err, data) => {
    if (err) {
      return console.log(err)
    } else {
      res.redirect(301, '/authentication')
    }
  })
})

//
// authentication page
//

app.get('/authentication', (req, res) => {
  if (req.session.authenticated === true) {
    console.log('redirected')
    res.redirect(301, '/dashboard')
  } else {
    res.sendFile(path.resolve(PUBLIC_FOLDER, 'authentication.html'))
  }
})

// authentication endpoint
app.use('/authenticate', bodyParser.urlencoded({extended: false}))
app.post('/authenticate', (req, res) => {
  User.find({username: req.body.username}, (err, user) => {
    if (err) {
      return console.log(err)
    } else {
      const username = user[0].username
      const userPassword = user[0].password
      const enteredPassword = hashFunction.SHA256(req.body.password)

      if (userPassword === enteredPassword) {
        req.session.authenticated = true
        req.session.username = username
        res.redirect(301, '/dashboard')
      } else {
        res.json({error: 'incorrect password'})
      }
    }
  })
})

//
// dashboard
//

app.use(express.static(REACT_BUILD))

app.get('/dashboard', (req, res) => {
  if (req.session.authenticated === true) {
    res.sendFile(path.resolve(REACT_BUILD, 'index.html'))
  } else {
    res.redirect(301, '/authentication')
  }
})

// user info
app.get('/dashboard/user', (req, res) => {
  if (!req.session.authenticated) {
    res.json({error: 'you must log in first!'})
  } else {
    User.find({username: req.session.username}, (err, user) => {
      if (err) {
        console.log(err)
      } else {
        console.log('user data sent')
        res.json({
          authenticated: req.session.authenticated,
          username: user[0].username,
          cash: user[0].cash,
          positions: user[0].positions
        })
      }
    })
  }
})

// logout endpoint
app.get('/dashboard/logout', (req, res) => {
  try { 
    req.session = null
    console.log('session destroyed')
    res.redirect(301, '/authentication')
  } catch (err) {
    console.log(err)
  }
})

// stock quote
app.use('/dashboard/quote', bodyParser.urlencoded({extended: false}))
app.post('/dashboard/quote', (req, res) => {
  (async () => {
    try {
      const response = await got(
        'https://cloud.iexapis.com/stable/stock/' 
        + req.body.symbol 
        + '/intraday-prices?token=' 
        + API_KEY 
        + '&chartLast=1'
      ).json()
      res.json({quote: response[0].average})
    } catch (error) {
      console.error(error.response.body)
    }
  })()
})

// stock buy
app.use('/dashboard/buy', bodyParser.urlencoded({extended: false}))
app.post('/dashboard/buy', (req, res) => {
  User.find({username: req.session.username}, (err, user) => {
    if (err) {
      return console.error(err)
    } else {
      (async () => {
        const quote = await fetchQuote(req.body.symbol)
        const shareValue = quote[0].average
        const orderTotal = shareValue * req.body.shares

        if (user[0].cash < orderTotal) {
          res.json({error: 'User needs more cash'})
        } else {
          console.log(user[0].positions)
          user[0].positions.push({
            symbol: req.body.symbol, 
            shares: req.body.shares, 
            shareValue: shareValue, 
            date: new Date()
          })
          user[0].cash = user[0].cash - orderTotal
          user[0].save((err, data) => {
            if (err) {
              console.log(err)
              res.json({error: 'failed to save user changes'})
            } else {
              console.log('saved')
              res.json({transaction: 'successful'})
            }
          })
        }
      })()
    }
  })
})

// stock sell
app.use('/dashboard/sell', bodyParser.urlencoded({extended: false}))
app.post('/dashboard/sell', (req, res) => {
  User.find({username: req.session.username}, (err, user) => {
    if (err) {
      return console.error(err)
    } else {
      (async () => {
        const quote = await fetchQuote(req.body.symbol)
        const shareValue = quote[0].average
        const orderTotal = shareValue * req.body.shares

        // TODO implement sale error checking
        // if (user[0].cash < orderTotal) {
        //   res.json({error: 'User needs more cash'})
        // } else {
          console.log(user[0].positions)
          user[0].positions.push({
            symbol: req.body.symbol, 
            shares: req.body.shares, 
            shareValue: shareValue, 
            date: new Date()
          })
          user[0].cash = user[0].cash + orderTotal
          user[0].save((err, data) => {
            if (err) {
              console.log(err)
              res.json({error: 'failed to save user changes'})
            } else {
              console.log('saved')
              res.json({transaction: 'successful'})
            }
          })
        // }
      })()
    }
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})

const fetchQuote = (symbol) => {
  const quote = got(
    'https://cloud.iexapis.com/stable/stock/' 
    + symbol 
    + '/intraday-prices?token=' 
    + API_KEY 
    + '&chartLast=1'
  ).json()
  .catch((error) => console.error(error))

  return quote
}