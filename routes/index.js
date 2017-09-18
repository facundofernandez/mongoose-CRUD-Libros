"use strict";

const express = require('express');
const bookCtrl = require('../controllers/book');
const userCtrl = require('../controllers/user');
const auth = require('../middlewares/auth');
const api = express.Router();

api.get('/book', bookCtrl.getBooks);
api.get('/book/:bookId', bookCtrl.getBook);
api.post('/book',auth, bookCtrl.saveBook);
api.put('/book/:bookId', bookCtrl.updateBook);
api.delete('/book/:bookId',auth, bookCtrl.deleteBook);

api.post('/signup', userCtrl.signUp);
api.post('/signin', userCtrl.signIn);

api.get('/private', auth, function(req, res){
  res.status(200).send({message: 'Tienes acceso'})
})

module.exports = api;
