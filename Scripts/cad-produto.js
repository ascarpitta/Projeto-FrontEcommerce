﻿var cadproduto = document.getElementById('cadproduto');
var user;
var requestURL = 'https://projeto-ecommerce.herokuapp.com/api/produtos';
var Http = new XMLHttpRequest();
Http.open('GET', requestURL);
Http.responseType = 'json';
Http.send();

Http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        console.log(Http.responseType);
    }
}

cadproduto.addEventListener('submit', function (e) {
    var obj = new FormData(cadproduto);
    console.debug(obj);

    var nome = JSON.stringify(obj.get('nome'));
    var marca = JSON.stringify(obj.get('marca'));
    var categoria = JSON.stringify(obj.get('categoria'));
    var descricao = JSON.stringify(obj.get('descricao'));
    var preco = JSON.stringify(obj.get('preco'));
    var quantidade = JSON.stringify(obj.get('quantidade'));
    var frete = JSON.stringify(obj.get('frete'));

    console.debug({ nome, marca, categoria, descricao, preco, quantidade, frete });

    e.preventDefault();
    console.debug('Ocorreu um click');
});

function usuario() {
    user = window.localStorage.getItem('user');
    console.log("id fora da função: ", user);
}

function cadProduto() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/produtos/CadastroProduto/' + user + '/' +
            $('#nome').val().replace(/\s/g, '') + '/' + $('#descricao').val().replace(/\s/g, '') +
            '/' + $('#preco').val().replace(/\s/g, '') + '/' + $('#frete').val().replace(/\s/g, '') +
            '/' + $('#quantidade').val().replace(/\s/g, '') + '/' + $('#categoria').val().replace(/\s/g, '') +
            '/' + $('#marca').val().replace(/\s/g, ''),
        type: 'post',
        //data: { nome: $('#nome').val(), marca: $('#marca').val(), categoria: $('#categoria').val(), descricao: $('#descricao').val(), preco: $('#preco').val(), quantidade: $('#quantidade').val()},
        dataType: 'json',
        success: function (url) {
            console.log(url);
            alert('Produto cadastrado com sucesso'); 
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