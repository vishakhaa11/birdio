const express = require('express');
const app = express.Router();
const authentication = require('../controller/auth_script.js');

app.post('/register' , authentication().postsignup)
app.post('/login' , authentication().post_login)


module.exports = app;