$(function() {
    listDrivers();
    $('.form-register').on("submit", register);
})

function register(event) {
    event.preventDefault();
    cleanMessages();

    $(document).ready(function() {
        var geocoder;
        geocoder = new google.maps.Geocoder();
        var latlng;
        navigator.geolocation.getCurrentPosition(function(position) {
            latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    
            geocoder.geocode(
                {'latLng': latlng}, 
                function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            var add= results[0].formatted_address ;
                            var value = add.split(",");
        
                            count = value.length;
                            city = value[count-2];
                            $('input[name=city]').val(city)
                            
                            $.ajax({
                                url: "/drivers/",
                                type: "POST",
                                data: $('.form-register').serialize()
                            }).done(function() {
                                showMessage("success", "Sucesso ao registrar motorista" )
                            }).fail(function(res) {
                                var mensages = JSON.parse(res.responseText);
                                mensages.forEach(function(mensage) {
                                    showMessage("danger", mensage.msg)
                                }, this);
                            });
                        }
                    }
                }
            );
        });
    });
}

function listDrivers(event) {
    $.get("list", {}, function(res) {
        res.forEach(function(element) {
            $('.drivers').append("<li><h3>"+element.name+"</h3><br><p>"+element.cell+"</p><br><p>"+element.city+"</li>");
        }, this);        
    })
}  

function showMessage(type, text) {
    $('body').prepend("<div class='alert alert-"+ type +"' role='alert'>" + text + "</div>")
};

function cleanMessages() {
    $('.alert').remove();
};

