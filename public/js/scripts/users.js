$(function() {
    $('.form-login').on("submit", login);
    $('.form-register').on("submit", register);
})

var login = function(event) {
    event.preventDefault();
    cleanMessages();
    $.ajax({
        url: "/users/login",
        type: "POST",
        data: $(this).serialize()
    }).done(function(){
        window.location = "/events";
    }).fail(function(res) {
        showMessage("danger", res.msg);
    })
}

var register = function(event) {
    event.preventDefault();
    cleanMessages();
    $.ajax({
        url: "/users/register",
        type: "POST",
        data: $(this).serialize()
    }).done(function() {
        showMessage("success", "Sucesso ao registrar usuário" )
    }).fail(function(res) {
        var mensages = JSON.parse(res.responseText);
        mensages.forEach(function(mensage) {
            showMessage("danger", mensage.msg)
        }, this);
    })
}

var showMessage = function(type, text) {
    $('body').prepend("<div class='alert alert-"+ type +"' role='alert'>" + text + "</div>")
};

var cleanMessages = function() {
    $('.alert').remove();
}