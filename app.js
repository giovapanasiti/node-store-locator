const signale = require('signale')
const express = require('express')
const app = express()
require('./db')
global.__root   = __dirname + '/' 

app.get('/api', function (req, res) {
  res.status(200).send('API works.')
})


const StoreController = require('./store/StoreController')
app.use('/api/stores', StoreController)

const UserController = require('./user/UserController')
app.use('/api/users', UserController)

const AuthController = require('./auth/AuthController')
app.use('/api/auth', AuthController)

app._router.stack.forEach(function(r){
  if (r.route && r.route.path){
    signale.debug('Path --> ' + r.route.path + ' | Method --> ' + r.route.stack[0].method)
  }
})

module.exports = app