$(function() {        
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
                                $.ajax({
                                    url: "/drivers/",
                                    type: "GET",
                                    data: { city: city },
                                }).done(function(res) {
                                    res.forEach(function(r) {
                                        $('#root')
                                        .append(
                                            `<div class="panel panel-default">
                                                <div class="panel-heading">
                                                <h3 class="panel-title">${r.name} - ${r.city}</h3>
                                                </div>
                                                <div class="panel-body">
                                                ${r.cell} - ${r.email}
                                                </div>
                                            </div>`) 
                                    })
                                })
                            }
                        }
                    }
                );
            });
        });
})