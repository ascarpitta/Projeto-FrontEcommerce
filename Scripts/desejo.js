﻿var user = window.localStorage.getItem("user");
let urlGlobal;
var desejo;

function produto() {
    //Verificação para ver se os produtos a serem carregados devem ser filtrados ou não
    var endpoint;
    if (window.localStorage.getItem("Nome_Busca") !== "" && window.localStorage.getItem("Nome_Busca") !== null) {
        endpoint = "https://projeto-ecommerce.herokuapp.com/api/produtos/busca/" + window.localStorage.getItem("Nome_Busca");
        //colocar show dos botões de ordenação aqui
        window.localStorage.setItem("Nome_Busca", "");
    } else {
        endpoint = "https://projeto-ecommerce.herokuapp.com/api/usuarios/ListaDesejo/" + user;
    }

    //Começo do ajax para buscar os produtos
    $.ajax({
        url: endpoint,
        type: "get",
        dataType: "json",
        success(url) {
            urlGlobal = url;
            criarCardsProdutos();
        },
        error(url) {
            //alert("Erro ao visualizar produtos");
        }
    });
}

function criarCardsProdutos() {
    $("#lista_desejos").empty();

    //Laço que percorrerá todos os produtos carregados pelo backend
    urlGlobal.forEach(function (item, index) {
        //Variavel que armazena os cards dos produtos
        var imagem = item.url_imagem;
        if (imagem == null) {
            imagem = "mackenzie.png";
        }
        var card = "<div class='card' style='width: 15rem;'>" +
            "<img class='card-img-top' src='" + imagem + "' alt='Card image cap'>" +
            "<div class='card-body' id='desejo'>" +
            "<label id='produto'>" + item.nameProduto + "</label>" +
            " </div>" +
            "<button class='btn btn-primary remover' type='submit' style='width: 15rem; background: #4F5D75;' id='" + item.idProduto + "'>Remover</button>" +
            "<button class='btn btn-primary adicionar' type='submit' style='background: #4F5D75;' id='" + item.idProduto + "'>Adicionar ao carrinho</button>" +
            "</div>" +
            "<div style = 'width: 2rem;'>" +
            "<div class='card-body'></div>" +
            "</div>" +
            "</div>";

        //Incluindo card na div principal
        $("#lista_desejos").append(card);
    });

    //Escondendo detalhes
    $(".hidden_div").hide();

    $(".open_div").click(function () {
        $(this).toggleClass("active").next().slideToggle("slow");
        return false;
    });

    //Eventos para cada produto
    $(".remover").click(function () {
        var desejo = $(this).attr("id");
        var user = window.localStorage.getItem("user");

        if (user === null) {
            alert("Você não está logado!");
        } else {
            $.ajax({
                url: "https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/" + user + "/" + desejo,
                type: "get",
                dataType: "json",
                error: function (url) {
                    produto();
                }
            });
        }
    });

    $(".adicionar").click(function () {
        var desejo = $(this).attr("id");
        var user = window.localStorage.getItem("user");
        if (user === null) {
            alert("Você não está logado!");
        } else {
            $.ajax({
                url: "https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/" + user + "/" + desejo,
                type: "get",
                dataType: "json",
                success: function (url) {
                    alert("Produto adicionado ao carrinho");
                }
            });
        }
    });
}

function sair() {
    sessionStorage.clear();
    localStorage.clear();
}