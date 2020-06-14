var user = window.localStorage.getItem("user");
let urlGlobal;

function criarCardsProdutos() {
    $("#produtos_vendidos").empty();

    //Laço que percorrerá todos os produtos carregados pelo backend
    urlGlobal.forEach(function (item, index) {
        //Variavel que armazena os cards dos produtos
        var card = "<div class='card' style='width: 15rem;'>" +
            "<div class='card-body'>" +
            "Nº: " +
            "<label>" + item.name + "</label>" +
            "</div>" +
            "<div>" +
            "<div class='top'>" +
            "<div class='open_div'>Ver detalhes</div>" +
            "<div class='hidden_div'>" +
            "<div class='mt-1 font-weight-bold'>" +
            "Data: " +
            "<span>" + item.name + "</span>" +
            "</div>" +
            "<div class='mt-1'>" +
            "Valor final: " +
            "<span>" + item.description + "</span>" +
            "</div>" +
            "<div class='mt-1'>" +
            "Endereço: " +
            "<span>" + item.description + "</span>" +
            "<button class='btn btn-primary endereco' type='button' style='background: #4F5D75;' id='" + item.id + "'>Alterar</button> </a>" +
            "</div>" +
            "<div class='top1'>" +
            "<div class='open_div1'>Ver produtos</div>" +
            "<div class='hidden_div1'>" +
            "<div class='item'>" +
            "<div class='buttons'>" +
            "<span class='delete-btn cancelar'>X</span>" +
            "</div>" +
            "<div class='mt-1'>" +
            "Produto: " +
            "<span>" + item.description + "</span>" +
            "</div>" +
            "</div>" +
            "<div class='mt-1'>" +
            "R$: " +
            "<span>" + item.description + "</span>" +
            "</div>" +
            "<div class='card row justify-content-center' style='width: 20rem;'>" +
            "<button class='btn btn-primary sinalizar' type='button' style='background: #4F5D75;' id='" + item.id + "'>Pedido em transporte</button> </a>" +
            "<hr>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "<div style='width: 2rem;'>" +
            "<div class='card-body'></div>" +
            "</div>";

        //Incluindo card na div principal
        $("#produtos_vendidos").append(card);
    });

    //Escondendo detalhes
    $(".hidden_div").hide();

    $(".open_div").click(function () {
        $(this).toggleClass("active").next().slideToggle("slow");
        return false;
    });

    //Escondendo detalhes do produto
    $(".hidden_div1").hide();

    $(".open_div1").click(function () {
        $(this).toggleClass("active").next().slideToggle("slow");
        return false;
    });

    //Eventos para cada produto
    $(".cancelar").click(function () {
        var idProduto = $(this).attr("id");
        var user = window.localStorage.getItem("user");
        if (user === null) {
            alert("Você não está logado!");
        } else {
            $.ajax({
                url: "https://projeto-ecommerce.herokuapp.com/api/produtos/ativarProduto/" + user + "/" + idproduto,
                type: "get",
                dataType: "json",
                success(url) {
                    alert("Usuário ativo");
                    var id = url.id;
                    user = id;

                    window.localStorage.setItem("user", user);
                }
            });
        }
    });

    $(".transporte").click(function () {
        var idProduto = $(this).attr("id");
        var user = window.localStorage.getItem("user");

        if (user === null) {
            alert("Você não está logado!");
        } else {
            $.ajax({
                url: "https://projeto-ecommerce.herokuapp.com/api/produtos/inativarproduto/" + user + idproduto,
                type: "get",
                dataType: "json",
                success(url) {
                    alert("Usuário desativado");
                    var id = url.id;
                    user = id;

                    window.localStorage.setItem("user", user);
                    sessionStorage.clear();
                    localStorage.clear();
                }
            });
        }
    });

    $(".desativar").click(function () {
        var idProduto = $(this).attr("id");
        var user = window.localStorage.getItem("user");

        if (user === null) {
            alert("Você não está logado!");
        } else {
            $.ajax({
                url: "https://projeto-ecommerce.herokuapp.com/api/produtos/inativarproduto/" + user + idproduto,
                type: "get",
                dataType: "json",
                success(url) {
                    alert("Usuário desativado");
                    var id = url.id;
                    user = id;

                    window.localStorage.setItem("user", user);
                    sessionStorage.clear();
                    localStorage.clear();
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
        endpoint = "https://projeto-ecommerce.herokuapp.com/api/produtos/usuario/5e558e5b6df7c12c90fcee53/";
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

function andamento() {
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/Pedidos/GetExibirAndamentoVenda/" + user,
        type: "get",
        dataType: "json",
        success(url) {
            urlGlobal = url;
            criarCardsProdutos();
            alert("foi");
        }
    });
}

function sair() {
    sessionStorage.clear();
    localStorage.clear();
}