$(function() {
    $('.form-register-event').on("submit", sendTitleAndLocation)
})

function sendTitleAndLocation(event) {
    event.preventDefault();
    $.ajax({
        url:"/events",
        type: "POST",
        data: $('.form-register-event').serialize()
    }).fail(function(res) {
        showMessage("danger", res.msg)
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
/**
 * Função para limpar mensagems
 */
function cleanMessages() {
    $('.alert').remove();
}