var user = window.localStorage.getItem("user");
var idProdVar = window.localStorage.getItem("idProdVar");
let urlGlobal;

function criarCardsProdutos() {
    $("#lista_produtos").empty();

    //Laço que percorrerá todos os produtos carregados pelo backend
    urlGlobal.forEach(function (item, index) {
        //Variavel que armazena os cards dos produtos
        var card = "<div class='card' style='width: 15rem;'>" +
            "<div class='card-body'>" +
            "<img class='card-img-top' src='mackenzie.png' alt='Card image cap'>" +
            "<label>" + item.name + "</label>" +
            "</div>" +
            "<div>" +
            "<div class='top'>" +
            "<div class='open_div'>Ver detalhes</div>" +
            "<div class='hidden_div'>" +
            "<div class='mt-1 font-weight-bold'>" +
            "<span>" + item.name + "</span>" +
            "</div>" +
            "<div class='mt-1'>" +
            "R$: " +
            "<span>" + item.price + "</span>" +
            "</div>" +
            "<div class='mt-1'>" +
            "Descrição: " +
            "<span>" + item.description + "</span>" +
            "</div>" +
            "<div class='mt-1'>" +
            "Categoria: " +
            "<span>" + item.category + "</span>" +
            "</div>" +
            "<div class='mt-1'>" +
            "Marca: " +
            "<span>" + item.marca + "</span>" +
            "</div>" +
            "<div class='mt-1'>" +
            "Status: " +
            "<span>" + item.ativo + "</span>" +
            "</div>" +
            "<div class='card row justify-content-center' style='width: 20rem;'>" +
            "<button class='btn btn-primary ativar' type='button' style='background: #4F5D75;' id='" + item.id + "'>Ativar</button> </a>" +
            "<button class='btn btn-primary desativar' type='button' style='background: #4F5D75;' id='" + item.id + "'>Desativar </a>" +
            "</div>" +
            "<div class='card row justify-content-center'>" +
            "<form method='post' action='alterar-produto.html' style='width: 20rem;'>" +
            "<button class='btn btn-primary ' type='submit' style='width: 20rem; background: #4F5D75;'>Editar</button>" +
            "</form>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "<div style='width: 2rem;'>" +
            "<div class='card-body'></div>" +
            "</div>";

        //Incluindo card na div principal
        $("#lista_produtos").append(card);
    });

    //Escondendo detalhes
    $(".hidden_div").hide();

    $(".open_div").click(function () {
        $(this).toggleClass("active").next().slideToggle("slow");
        return false;
    });

    //Eventos para cada produto
    $(".ativar").click(function () {
        var idProdVar = $(this).attr("id");
        var user = window.localStorage.getItem("user");
        if (user === null) {
            alert("Você não está logado!");
        } else {
            $.ajax({
                url: "https://projeto-ecommerce.herokuapp.com/api/produtos/ativarProduto/" + user + "/" + idProdVar,
                type: "get",
                dataType: "json",
                error(url) {
                    alert("Produto ativo!");
                }
            });
        }
    });

    $(".desativar").click(function () {
        var idProdVar = $(this).attr("id");
        var user = window.localStorage.getItem("user");

        if (user === null) {
            alert("Você não está logado!");
        } else {
            $.ajax({
                url: "https://projeto-ecommerce.herokuapp.com/api/produtos/inativarproduto/" + user + "/" + idProdVar,
                type: "get",
                dataType: "json",
                error(url) {
                    alert("Produto desativado!");
                }
            });
        }
    });
}

function produto() {
    //Verificação para ver se os produtos a serem carregados devem ser filtrados ou não
    var endpoint;
    if (window.localStorage.getItem("Nome_Busca") !== "" && window.localStorage.getItem("Nome_Busca") !== null) {
        endpoint = "https://projeto-ecommerce.herokuapp.com/api/produtos/busca/" + window.localStorage.getItem("Nome_Busca");
        //colocar show dos botões de ordenação aqui
        window.localStorage.setItem("Nome_Busca", "");
    } else {
        endpoint = "https://projeto-ecommerce.herokuapp.com/api/produtos/usuario/" + user;
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

function sair() {
    sessionStorage.clear();
    localStorage.clear();
}