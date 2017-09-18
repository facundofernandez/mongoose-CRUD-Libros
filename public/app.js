var title = $('#searchTitle');
var lista = $('#listBook');

title.keyup(function(event){
    let param =  {};
    if(event.target.value.length > 3) {
        param =  { title: title.val() }
    }else if(event.target.value.length == 0){
        param =  { };
    };
    buscarTitulo( param ,function(data){
        crearLista(data);
    });
});

$('form').submit(function(event){

    event.preventDefault();
    let id = $('#id').val();
    id = typeof id == "undefined" ? "" : id;
    const myHeaders = new Headers();
    if(typeof localStorage.token !== "undefined")
      myHeaders.append('authorization',`Bearer ${localStorage.token}`)
    let evento = $('.btn--submit').data("event");
    let method = evento !== "edit" ? "post" : "put";
    var fd = new FormData($( "form" ));

    fetch(`/api/book/${id}`,{
      method: 'put',
      //headers: myHeaders,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify({ id: 2324})//new FormData(document.querySelector('form'))
    })
    .then(res => res.json())
    .then(data => console.log(data))


    // $.post(accion, $( "form" ).serialize() )
    //     .done(function (data) {
    //         console.log("Edit: ", data)
    //         if(data.ok){
    //             $('#title').val("").focus();
    //             $('#author').val("");
    //             $('#text').val("");
    //             $('#id').val("");
    //             $('.btn--submit').data("event","")
    //         }
    //         msj(data)
    //         buscarTitulo( {} ,function(data){
    //             crearLista(data);
    //         });
    //     });


});

$('ul#listBook').on("click",".lista__book--btn",function(event){

  event.preventDefault();
  let id = event.target.dataset.id;
  const myHeaders = new Headers();
  if(typeof localStorage.token !== "undefined")
    myHeaders.append('authorization',`Bearer ${localStorage.token}`)

  fetch(`/api/book/${id}`,{
    method: 'delete',
    headers: myHeaders,
    body: JSON.stringify({ id: id})
  })
  .then(res => res.json())
  .then(data => console.log(data))

    // $.post("/remove", { id: id} )
    // .done(function (data) {

    //     console.log(data)

    //     buscarTitulo( {} ,function(data){
    //         crearLista(data);
    //     });
    // });
});

$('ul#listBook').on("click",".lista__book--btnEdit",function(event){
    let padre = $(this).parent();
    let title = padre.find(".lista__book--title").html();
    let author = padre.find(".lista__book--author").html();
    let text = padre.find(".lista__book--text").html();
    let id = $(this).data("id");
    event.preventDefault();

    $('#title').val(title).focus();
    $('#author').val(author);
    $('#text').val(text);
    $('#id').val(id);
    $('.btn--submit').data("event", "edit")

});

function buscarTitulo(json, callback){
    $.get("/searchTitle", json )
        .done(function (response) {

            callback(response.data)

        });
}

function crearLista(data){
    let listaHTML = "";
    listaHTML = '<ul id="listBook">';
    for (let x of data) {
        listaHTML += `
        <li class="lista__book">
            <span class="lista__book--title">${x.title}</span>
            <span class="lista__book--text">${x.text}</span>
            <cite class="lista__book--author">${x.author}</cite>
            <span class="lista__book--btn" data-id="${x._id}"></span>
            <span class="lista__book--btnEdit" data-id="${x._id}"></span>
        </li>
        `;
    }
    listaHTML += '</ul>';
    lista.html(listaHTML);
}

function msj(data){
    let divMsj = $('#mensaje');
    let divMsjTexto = $('#mensaje .msj__texto');
    let clase = "";
    divMsjTexto.html(data.msj);
    clase = data.ok ? "msj--ok" : "msj--error";
    divMsj.toggleClass(clase);

    setTimeout(()=>{
        divMsj.toggleClass(clase);
    },3000)
}
