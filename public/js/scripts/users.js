$(function() {
    $('.form-login').on("submit", login);
    $('.form-register').on("submit", register);
})

function login(event) {
    event.preventDefault();
    $.ajax({
        url: "/users/login",
        type: "POST",
        data: $(this).serialize(),
        success: function(res) {
            console.log(res);
        },
        error: function() {
            console.log("err");
        }

    })
}

function register(event) {
    event.preventDefault();
    $.ajax({
        url: "/users/register",
        type: "POST",
        data: $(this).serialize(),
        success: function(res) {
            console.log(res);
        },
        error: function() {
            console.log("err");
        }

    })
}