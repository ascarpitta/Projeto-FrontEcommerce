﻿var cadusuario = document.getElementById('cadusuario');

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

cadusuario.addEventListener('submit', function (e) {

    var obj = new FormData(cadusuario);
    console.debug(obj)

    var nome = JSON.stringify(obj.get('nome'));
    var cpf = JSON.stringify(obj.get('cpf'));
    var email = JSON.stringify(obj.get('email'));
    var password = JSON.stringify(obj.get('password'));
    console.debug({ nome, cpf, email, password })

    e.preventDefault();
    console.debug('Ocorreu um click')
})

function teste() {
    var validar = false;
    if (nome.value == "" || nome.value == null || nome.lenght < 3) {
        validar = true;
        alert("Por favor, indique o seu nome.");
        return false;
    }
    if (cpf.value == "" || cpf.value == null || cpf.value < 11) {
        validar = true;
        alert("Por favor, indique um cpf válido.");
        return false;
    }
    if (password.value == "" || password.value == null || password.lenght < 6) {
        validar = true;
        alert("Por favor, indique uma senha válida.");
        return false;
    } if (senha2.value == "" || senha2.value == null || senha2.lenght < 6) {
        validar = true;
        alert("Por favor, indique uma senha válida.");
        return false;
    }
    if (email.value.indexOf("@") == -1 ||
        email.value == "" ||
        email.value == null) {
        validar = true;
        alert("Por favor, indique um e-mail válido.");
        email.focus();
        return false;
    }
    if (password.value != senha2.value) {
        validar = true;
        alert('As senhas não coincidem, por favor verifique');
        return false;
    }
    //if (condicoes.value == "" || senha2.value == null || senha2.value == false) {
    //    validar = true;
    //    alert('Você deve concordar com os termos e condições antes de se cadastrar')
    //    return false;
    //}
    if (validar) alert('Erro ao realizar cadastrado')
    else alert('Cadastro realizado com sucesso')

    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/cadastroUsuario/' + $('#email').val() + '/' + $('#cpf').val() + '/' + $('#nome').val() + '/' + $('#senha2').val(),
        type: 'POST',
        //data: { email: $('#email').val(), nome: $('#nome').val(), cpf: $('#cpf').val(), senha: $('senha2').val() },
        dataType: 'json',
        success: function (url) {
            console.log(url);
            alert('Cadastro realizado com sucesso')
        }
    });
}

function sair() {
    sessionStorage.clear()
    localStorage.clear()
}