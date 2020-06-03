var cademail = document.getElementById('cademail');

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

cademail.addEventListener('submit', function (e) {

    var obj = new FormData(cademail);
    console.debug(obj)

    var email = JSON.stringify(obj.get('email'));
    console.debug({ email })

    e.preventDefault();
    console.debug('Ocorreu um click')
})

function verificaremail() {
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/email/' + $('#email').val(),
        type: 'GET',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            alert('E-mail já cadastrado')
        },
        error: function (url) {
            alert('Email pode prosseguir com sucesso')
        }
    });
}

function sair() {
    sessionStorage.clear()
    localStorage.clear()
}