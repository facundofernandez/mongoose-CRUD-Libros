"use strict";

const bookModel = require('../models/bookSchema');

function getBook(req, res){

  let pTitle = req.query.title;
  let regex = new RegExp("^"+pTitle+".*","i");
  let query = typeof pTitle == "undefined" ? {} : { title: regex};

  bookModel.find(query).then((data, err) => {
      console.log(query,"\n",data,"\n");
      res.json({ok:true,data: data,err})
  });

};

function getBooks(req, res){
  /** Encontrar documentos*/
  bookModel.find().then((data, err) => {
    //console.log(err);
    res.render('index', {books: data})
  });
};

function saveBook(req, res){
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
}

function updateBook(req, res){
  console.log(req.body,req.params,req.query)
  let form_libro = req.body;
  /** Aplico modificaciones antes de grabarlo*/
  form_libro.title = form_libro.title.charAt(0).toUpperCase() + form_libro.title.slice(1);
  form_libro.author = form_libro.author.charAt(0).toUpperCase() + form_libro.author.slice(1);

  if(form_libro.title && form_libro.author && form_libro. text) {
      /** Guardar en la base de datos */
      bookModel.findOne({
          _id: form_libro.id
      }).then((libro) => {

          //console.log(libro);
          libro.title = form_libro.title;
          libro.author = form_libro.author;
          libro.text = form_libro.text;
          libro.save().then(()=>{
            console.log("registro grabado");
            res.json({ok:true,msj:"Registro editado",obj: libro});
          });

      });

  }else{
      res.json({ok:false,msj:"Complete los campos correspondientes"})
  }
};

function deleteBook(req, res){
  let id = req.body.id;
  if(id){
      bookModel.remove({ _id:id }).then((err)=>{
          console.log("Remove:", err.result.n)
      });
  }

  res.json(id);
};

module.exports = {
  getBook,
  getBooks,
  saveBook,
  updateBook,
  deleteBook
}


