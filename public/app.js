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
    console.log(event);
    event.preventDefault();
    $.post("/add", $( "form" ).serialize() )
        .done(function (data) {

            console.log(data)
            if(data.ok){
                $('#title').val("").focus();
                $('#author').val("");
                $('#text').val("");
            }
        });

});

$('.lista__book--btn').click(function(event){
    console.log(event);
    event.preventDefault();
    let id = event.target.dataset.id;
    $.post("/remove", { id: id} )
    .done(function (data) {

        console.log(data)
        buscarTitulo( {} ,function(data){
            crearLista(data);
        });
    });

    

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
        </li>
        `;
    }
    listaHTML += '</ul>';
    lista.html(listaHTML);
}