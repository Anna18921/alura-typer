$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

function fraseAleatoria() {
    $("#spinner").show();
   
    $.get("http://localhost:3000/frases", trocaFraseAleatoria)
    .fail(function(){
        $("#erro").show();
    })
    .always(function(){
        $("#spinner").hide();
    });
}

function buscaFrase() {
    $("#spinner").show();
  
    $("#erro").hide();

    var fraseID = $("#frase-id").val();
    var dados ={
        id: fraseID,
    }
    $.get(`http://localhost:3000/frases`, dados , trocaFrase)
    .fail(function(){
        $("#erro").show();
    })
    .always(function(){
        $("#spinner").hide();
    });
}

function trocaFrase(data){
    $("#erro").hide();
    var frase = $(".frase");
    frase.text(data.texto);
    updateSizeText()
    atualizaTempoInicial(data.tempo)
   
}


function trocaFraseAleatoria(data) {
    var frase = $(".frase");
    var numeroAleatorio = Math.floor(Math.random() * data.length);

    frase.text(data[numeroAleatorio].texto);
    
    updateSizeText()
    atualizaTempoInicial(data[numeroAleatorio].tempo)
   
   
}