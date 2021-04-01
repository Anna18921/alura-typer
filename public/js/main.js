var timerInitial = $("#tempo-digitacao").text();
var campo = $('.campo-digitacao');

$(document).ready(function () {
    updateSizeText();
    initializeCounters();
    initializeTimer();
    inicializaMarcadores();
    $('#reiniciar').click(restart)
    atualizaPlacar();
    $("#usuarios").selectize({
        create: true,
        sortField: 'text'
    })
    $(".refresh").tooltipster()
    $(".score").tooltipster()
    $(".frase-random").tooltipster()
    $(".select-frase").tooltipster()
    $(".tooltip").tooltipster({
        trigger: "custom"
    });
  })

function updateSizeText(){
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}

function atualizaTempoInicial(timer){
    timerInitial = timer;
    $("#tempo-digitacao").text(timer);
}



function initializeCounters(){
    campo.on("input", function(){
        var conteudo = campo.val();
        
        var qtdPalavras = conteudo.split(/\S+/).length;
        $("#contador-palavras").text(qtdPalavras-1)
    
        qtdCaracteres = conteudo.length
        $("#contador-caracteres").text(qtdCaracteres)
    })

}

function initializeTimer(){
    campo.one("focus", function(){
       var timer = $("#tempo-digitacao").text();
       const cronometroID =  setInterval(()=>{
       
        timer--;
        $("#tempo-digitacao").text(timer)
        
       
        if (timer <  1){
            clearInterval(cronometroID)
            finishGame();
        }
        }, 1000)
    })

}

function finishGame() {
    campo.attr("disabled", true)
    campo.toggleClass("campo-desativado")
    inserePlacar()
}
function inicializaMarcadores() { 
    campo.on("input", function(){
        var frase = $(".frase").text()
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length)
        var correto  = digitado == comparavel && digitado.length > 0;

        campo.toggleClass("borda-vermelha", !correto && digitado.length > 0)
        campo.toggleClass("borda-verde", correto && digitado.length > 0)

    })
   
 }



function restart(){
    $("#contador-palavras").text(0)
    $("#contador-caracteres").text(0)
    $("#tempo-digitacao").text(timerInitial)
    campo.val('')
    campo.attr("disabled", false)
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
    initializeTimer()
}

