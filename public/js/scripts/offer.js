$(function() {
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
                            $('input[name=city]').val(city);
                            var id = localStorage.getItem('id_event');
                            $.ajax({
                                url: id+"/offers/",
                                type: "POST",
                                data: $('.form-register').serialize()
                            }).done(function() {
                                showMessage("success", "Sucesso ao registrar oferta" )
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