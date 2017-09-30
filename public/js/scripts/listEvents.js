$(function() {
    $.ajax({
        url:"/events/events-by-user",
        type: "GET",
    }).done(function(res){
        console.log(res);
        $('.root')
            .append(`<div class="panel panel-default">
                        <div class="panel-heading">
                        <h3 class="panel-title">${r.name} - ${r.city}</h3>
                        </div>
                        <div class="panel-body">
                        ${r.cell} - ${r.email}
                        </div>
                    </div>`);
        
    }).fail(function(err) {
        $('.root')
            .append(`<span>Você não possui eventos para este usuário</span>`)
    })
})