var user;
var idProduto;
var produto = document.getElementById('produto');

var requestURL = 'https://projeto-ecommerce.herokuapp.com/api/produtos/';
var Http = new XMLHttpRequest();
Http.open('GET', requestURL);
Http.responseType = 'json';
Http.send();

Http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        console.log(Http.responseType);
    }
}

produto.addEventListener('submit', function (e) {

    var obj = new FormData(produto);
    console.debug(obj);

    var id = JSON.stringify(obj.get('id'));
    var quantity = JSON.stringify(obj.get('quantity'));
    var price = JSON.stringify(obj.get('price'));
    console.debug({ quantity, price, id });

    e.preventDefault();
    console.debug('Ocorreu um click');
});

function busca() {
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/produtos/busca/' + $('#busca').val(),
        type: 'GET',
        //data: { busca: $('#busca').val()},
        dataType: 'json',
        success: function (url) {
            console.log(url);
        }
    });
}

function usuario() {
    idProduto = window.localStorage.getItem('idProduto');
    console.log("Prroduto fora da função: ", idProduto);
    user = window.localStorage.getItem('user');
    console.log("id fora da função: ", user);
}

function todosprodutos() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/produtos',
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        }
    });
}

function detalhes() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/produtos/id/5e56f7aaf45d7520c44ded3f',
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);

            document.getElementById("preco").innerHTML = url.price;
            document.getElementById("nome").innerHTML = url.name;
            document.getElementById("descricao").innerHTML = url.description;
            document.getElementById("categoria").innerHTML = url.category;
            document.getElementById("marca").innerHTML = url.marca;

            prod = url.id;
            idProduto = prod;
            window.localStorage.setItem("idProduto", idProduto);
        },
        error: function (url) {
            alert('Erro ao buscar produto');
        }
    });
}

function addCarrinho() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}

function ativar() {
    usuario();
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/produtos/ativarProduto/' + user + '/' + idProduto,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            alert('Usuário ativo');
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao ativar produto');
        }
    });
}

function desativar() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/produtos/inativarproduto' + user + idProduto,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            alert('Usuário desativado');
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
            sessionStorage.clear();
            localStorage.clear();
        },
        error: function (url) {
            alert('Erro ao desativar produto');
        }
    });
}

function add() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/AddListaDesejo/' + user + '/' + idProduto,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar a lista de desejos');
        }
    });
}

function rem() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + idProduto,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao remover da lista de desejos');
        }
    });
}

function sair() {
    sessionStorage.clear();
    localStorage.clear();
}