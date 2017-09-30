$(function() {
    $('.form-register-event').on("submit", sendTitleAndLocation)
})

function sendTitleAndLocation(event) {
    event.preventDefault();
    $.ajax({
        url:"/events",
        type: "POST",
        data: $('.form-register-event').serialize()
    }).done(function(res){
        console.log(res);
        window.location.replace("recipes");
        
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

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 6
    });
    var infoWindow = new google.maps.InfoWindow({map: map});

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        var marker = new google.maps.Marker({
            position: pos,
            map: map,
            title: 'Hello World!'
        });
        
        google.maps.event.addListener(map, 'click', function(event) {
            placeMarker(event.latLng);
            pos.lat = event.latLng.lat();
            pos.lng = event.latLng.lng();
            $('.latitude').val(pos.lat);
            $('.longitude').val(pos.lng);
         });
         
         function placeMarker(location) {
            marker.setPosition(location);
         }
        map.setCenter(pos);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }