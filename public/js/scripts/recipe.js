var produtos = [
  {'id': 'batata', 'nome': 'Batata'},
  {'id': 'carne_bovina', 'nome': 'Carne Bovina'},
  {'id': 'cebola', 'nome': 'Cebola'},
  {'id': 'cebolinha', 'nome': 'Cebolinha'},
  {'id': 'macarrao', 'nome': 'Macarrão'},
  {'id': 'salsinha', 'nome': 'Salsinha'},
];

$(document).ready(function() {
  $('.form-register-recipe').on("submit", enviaFormularioReceitas);
});

function atualizarReceita() {
  if ($('.receita').val().length > 0) {
    atualizarIngredientes();
    toggleQuantidade(true);
  } else {
    toggleQuantidade(false);
  }
}

function atualizarIngredientes() {
  var quantidade = $('.quantidade').val();
  var receita = $('.receita').val();

  if (!receita.length || !quantidade.length) {
    return;
  }

  $.ajax({
    method: 'POST',
    url: 'https://predict-ingredients.herokuapp.com/predictIngredients/' + receita + '/' + quantidade,
    success: function(resultados) {
      $('.ingredientes').hide().find('table').html('');
      var chaves = Object.keys(resultados);
      for (var i = 0; i < chaves.length; i++) {
        var chave = chaves[i];
        var quantidade = resultados[chave];

        var options = ['<option value="">-- Selecione --</option>'];
        for (var j = 0; j < produtos.length; j++) {
          var produtoId = produtos[j]['id'];
          var produtoNome = produtos[j]['nome'];
          options.push('<option value="' + produtoId + '"' + (chave === produtoId ? ' selected' : '') +'>' + produtoNome + '</option>');
        }
        options = options.join('');

        var tr = '<tr>' +
          '<td><select class="form-control" name="ingredients[' + i + '][product]">' + options + '</select></td>' +
          '<td class="quantidade"><input class="form-control" type="text" name="ingredients[' + i + '][qtd]" value="' + quantidade + '"></select></td>' +
          '</tr>';
        $('.ingredientes').find('table').append(tr);
      }
      $('.ingredientes').show();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON ? jqXHR.responseJSON.errorMessage : errorThrown);
    }
  });
}

function toggleQuantidade(mostrar) {
  if (mostrar) {
    $('.quantidade').parent().show();
  } else {
    $('.quantidade').parent().hide();
  }
}

function cliqueNoSalvar() {
  var params = {
    recipe: $('.receita').val(),
    feeded_qtd: $('.quantidade').val(),
    ingredients: []
  };
  $.ajax({
    url: $('.formulario').attr('action'),
    method: 'POST',
    data: params,
    success: function() {
      console.log('ok');
    }
  })


  function enviaFormularioReceitas(event) {
    event.preventDefault();
    $.ajax(
      url:""
    )
  }
}
