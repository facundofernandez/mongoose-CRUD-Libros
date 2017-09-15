let bookSchema      = require('./bookSchema.js'),
    mongoose        = require('mongoose'),
    mongoUrl        = 'mongodb://localhost:27017/baseTest';

mongoose.connect(mongoUrl);


let bookModel = mongoose.model('Libro', bookSchema);



bookModel
    .find({},{
     //   title:1
    })
    //.limit(2)
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

bookModel
    .where({ _id: '59bac765039e913c8bee904d' })
    .update({ total : 100})

bookModel
    .findOne({ _id: '59bac765039e913c8bee904d' })
    .then(updateDoc);



function imprimirDatos(data, err){
    "use strict";
    console.log("---------------------- consulta -----------------------");
    console.log(data);
    return data
}

function updateDoc(data){
    "use strict";

    data.title = "Nuevo titulo";
    data.total = 400;
    data.save().then((res) => {
        console.log("Respuesta update: ",res)
    })
}


