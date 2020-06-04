var formulario = document.getElementById('formulario');
var user;
var requestURL = 'https://projeto-ecommerce.herokuapp.com/api/usuarios';
var Http = new XMLHttpRequest();

Http.open('GET', requestURL);
Http.responseType = 'json';
Http.send();

Http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        console.log(Http.responseType);
    }
}

formulario.addEventListener('submit', function (e) {
    var obj = new FormData(formulario);
    console.debug(obj);

    var email = JSON.stringify(obj.get('email'));
    var password = JSON.stringify(obj.get('password'));
    console.info({ email, password });

    e.preventDefault();
    console.debug('Ocorreu um click');
})

function usuario() {
    console.log("id fora da função: ", user);
}

function teste() {
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/' + $('#email').val() + '/' + $('#password').val(),
        type: 'GET',
        dataType: 'json',   
        success: function (url) {
            console.log(url);
            alert('Login realizado com sucesso');
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
            window.location.href = "index.html";
        },
        error: function (url) {
            alert('Erro ao realizar login');
        }
    });
}

function sair() {
    sessionStorage.clear();
    localStorage.clear();
}