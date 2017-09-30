$(function() {
    $('.form-login').on("submit", login);
    $('.form-register').on("submit", register);
})

function login(event) {
    event.preventDefault();
    cleanMessages();
    $.ajax({
        url: "/users/login",
        type: "POST",
        data: $('.form-login').serialize()
    }).fail(function(res) {
        console.log(res);
        showMessage("danger", res.msg)
    })
}

function register(event) {
    event.preventDefault();
    cleanMessages();
    $.ajax({
        url: "/users/register",
        type: "POST",
        data: $('.form-register').serialize()
    }).done(function() {
        showMessage("success", "Sucesso ao registrar usuário" )
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
}