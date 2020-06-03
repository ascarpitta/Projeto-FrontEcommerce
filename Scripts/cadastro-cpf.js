var cadcpf = document.getElementById('cadcpf');

var URL = 'https://projeto-ecommerce.herokuapp.com/api/usuarios';
var Http = new XMLHttpRequest();
Http.open('GET', URL);
Http.responseType = 'json';
Http.send();

Http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        console.log(Http.responseType)
    }
}

cadcpf.addEventListener('submit', function (e) {

    var obj = new FormData(cadcpf);
    console.debug(obj)

    var cpf = JSON.stringify(obj.get('cpf'));
    console.debug({ cpf })

    e.preventDefault();
    console.debug('Ocorreu um click')
})

function verificarcpf() {
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/cpf/' + $('#cpf').val(),
        type: 'GET',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            alert('Cpf já cadastrado')
        },
        error: function (url) {
            alert('Cpf pode prosseguir')
        }
    });
}

function sair() {
    sessionStorage.clear()
    localStorage.clear()
}