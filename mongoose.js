let bookSchema      = require('./bookSchema.js'),
    mongoose        = require('mongoose'),
    mongoUrl        = 'mongodb://localhost:27017/baseTest';

mongoose.connect(mongoUrl);


let bookModel = mongoose.model('Libro', bookSchema);



bookModel
    .find({},{
        title:1
    })
    .limit(2)
    .then(imprimirDatos);

bookModel
    .find({
        title: { $exists: false}
    })
    .then(imprimirDatos);

bookModel
    .find({
        title: { $regex: /^La.*/i }
    })
    .then(imprimirDatos);





function imprimirDatos(data, err){
    "use strict";
    console.log("---------------------- consulta -----------------------");
    console.log(data);
}