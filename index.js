"use strict";

let express         = require('express'),
    mongoose        = require('mongoose'),
    app             = express(),
    pug             = require('pug'),
    bodyParser      = require('body-parser'),
    mongoUrl        = 'mongodb://localhost:27017/baseTest'

mongoose.connect(mongoUrl);

const COLOR_LOGGER = '\x1b[33m%s\x1b[0m';

// funciones de acceso a la base de datos
let bookSchema = require('./bookSchema.js');


let bookModel = mongoose.model('Libro', bookSchema);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
// Seteo de plantillas

app.set('view engine', 'pug');
//app.set('views', __dirname + '/views');


app.get('/',function(req, res){

  
    /** Encontrar documentos*/
    bookModel.find().then((data, err) => {
        console.log(err);
        res.render('index', {books: data})
    });



    /** Buscar y actualizar*/
    bookModel.findOne({

        title: "Harry Potter"

    }).then((libro) => {

        //console.log(libro);
        libro.title = "harry Potter";
        libro.save().then(()=>{
           //console.log(libro);
        });


    });




});

app.get('/searchTitle',(req,res) => {

    let pTitle = req.query.title;
    let regex = new RegExp("^"+pTitle+".*","i");
    let query = typeof pTitle == "undefined" ? {} : { title: regex};

    bookModel.find(query).then((data, err) => {
        console.log(query,"\n",data,"\n");
        res.json({ok:true,data: data,err})
    });


});

app.post('/add',function(req, res){

    let form_libro = req.body;

    /** Aplico modificaciones antes de grabarlo*/
    form_libro.title = form_libro.title.charAt(0).toUpperCase() + form_libro.title.slice(1);
    form_libro.author = form_libro.author.charAt(0).toUpperCase() + form_libro.author.slice(1);


    if(form_libro.title && form_libro.author && form_libro. text) {
        /** Guardar en la base de datos */
        let libro = new bookModel(form_libro);
        libro.save(function (err, libro) {
            console.log(err, libro);
            res.json({ok:true,msj:"Registro guardado",obj: libro});
        });
    }else{
        res.json({ok:false,msj:"Complete los campos correspondientes"})
    }



});

app.post('/remove',function(req, res){

    let id = req.body.id;
  
    if(id){
        bookModel.remove({ _id:id }).then((err)=>{
            console.log("Remove:", err.result.n)
        });
    }

    res.json(id);

});




app.get('/book', function(req, res){




});



app.listen(8000,function(){
    console.log(COLOR_LOGGER,'Escuchando en el puerto 8000')
});
