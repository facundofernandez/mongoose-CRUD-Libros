"use strict";

const
  express         = require('express'),
  bodyParser      = require('body-parser'),
  app             = express(),
  pug             = require('pug'),
  cors            = require('cors');

const api = require('./routes');
const BookCtrl = require('./controllers/book');

app.use(cors());
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.set('view engine', 'pug');

app.use('/api', api);

app.get('/', BookCtrl.getBooks);
app.get('/searchTitle', BookCtrl.getBook);
app.post('/add', BookCtrl.saveBook);
app.post('/edit', BookCtrl.updateBook);
app.post('/remove', BookCtrl.deleteBook);

module.exports = app;
