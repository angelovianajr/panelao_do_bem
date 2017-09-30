$(function() {

})

function sendTitleAndLocation(event) {
    event.preventDefault();
    $.ajax({
        url:""
    })
}
/**
 * Função que cria uma mensagem de alerta
 * @param {*} type 
 * @param {*} text 
 */
function showMessage(type, text) {
    $('body').prepend("<div class='alert alert-"+ type +"' role='alert'>" + text + "</div>")
};

function cleanMessages() {
    $('.alert').remove();
}