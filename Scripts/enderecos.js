var user;
var requestURL = 'https://projeto-ecommerce.herokuapp.com/api/enderecos/alterarEndereco';
var Http = new XMLHttpRequest();

Http.open('GET', requestURL);
Http.responseType = 'json';
Http.send();

Http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        console.log(Http.responseType);
    }
}

function busca() {
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/produtos/busca/' + $('#busca').val(),
        type: 'GET',
        //data: { busca: $('#busca').val()},
        dataType: 'json',
        success(url) {
            console.log(url);
        }
    });
}

function usuario() {
    user = window.localStorage.getItem('user');
    console.log("id fora da função: ", user);
}

function teste() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/enderecos/alterarEndereco/' + user + '/' + $('#nomeEnd').val() + '/' + $('#cep').val() + '/' + $('#estado').val() + '/' + $('#cidade').val() + '/' + $('#bairro').val() + '/' + $('#rua').val() + '/' + $('#numero').val() + '/' + $('#complemento').val() + '/' + $('#obs').val(),
        type: 'get',
        dataType: 'json',
        success(url) {
            console.log(url);
            alert('Endereço alterado com sucesso');
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        }
    });
}

function sair() {
    sessionStorage.clear();
    localStorage.clear();
}