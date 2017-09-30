var markers = [];

var ofertasMarcadas = [];

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 6
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      // var marker = new google.maps.Marker({
      //     position: pos,
      //     map: map,
      //     title: 'Hello World!'
      // });
      //
      // google.maps.event.addListener(map, 'click', function(event) {
      //     placeMarker(event.latLng);
      //     pos.lat = event.latLng.lat();
      //     pos.lng = event.latLng.lng();
      //     $('.latitude').val(pos.lat);
      //     $('.longitude').val(pos.lng);
      //  });
      //
      //  function placeMarker(location) {
      //     marker.setPosition(location);
      //  }

       map.setCenter(pos);
    });
  }

  $.get('/offers', function(resultado) {
    for (var i = 0; i < resultado.offers.length; i++) {
      var oferta = resultado.offers[i];

      var pos = {
        lat: oferta.location.coordinates[0],
        lng: oferta.location.coordinates[1]
      };

      var marker = new google.maps.Marker({
          position: pos,
          map: map,
          icon: '/pino-vermelho.png',
          title: oferta['title'],
          id: oferta['_id']
      });

      markers.push(marker);

      var contentString = '<h2>' + oferta['title'] + '</h2>' +
        '<p>Quantidade disponível: ' + oferta['qtd'] + '</p>' +
        '<button type="button" id="btnTenhoInteresse_' + i + '" onclick="toggleMarcador(' + i + ')">Tenho interesse</button>';

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    }
  });
}

function toggleMarcador(posicao) {
  if (markers[posicao].selecionado) {
    $('#btnTenhoInteresse_' + posicao).text('Tenho interesse');
    markers[posicao].setIcon('/pino-vermelho.png');
    delete markers[posicao].selecionado;
  } else {
    $('#btnTenhoInteresse_' + posicao).text('Não tenho interesse');
    markers[posicao].setIcon('/pino-amarelo.png')
    markers[posicao].selecionado = true;
  }
}

function cliqueNoSalvar() {
  var ofertas = [];
  console.log(markers);
  for (var i = 0; i < markers.length; i++) {
    if (markers[i].selecionado) {
      ofertas.push(markers[i].id);
    }
  }
  var params = {
    ofertas: ofertas
  };
  $.ajax({
    url: $('.formulario').attr('action'),
    method: 'POST',
    data: params,
    success: function() {
      console.log('ok');
    }
  });
}
