$(function() {
    $('.form-register').on("submit", register);
})

function register(event) {
    event.preventDefault();
    cleanMessages();
    $.ajax({
        url: "/drivers/",
        type: "POST",
        data: $('.form-register').serialize()
    }).done(function() {
        showMessage("success", "Sucesso ao registrar motorista" )
    }).fail(function(res) {
        var mensages = JSON.parse(res.responseText);
        console.log(mensages);
        mensages.forEach(function(mensage) {
            showMessage("danger", mensage.msg)
        }, this);
    })
}

function showMessage(type, text) {
    $('body').prepend("<div class='alert alert-"+ type +"' role='alert'>" + text + "</div>")
};

function cleanMessages() {
    $('.alert').remove();
};