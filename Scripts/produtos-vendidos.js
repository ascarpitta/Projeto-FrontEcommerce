var user = window.localStorage.getItem("user");
let urlGlobal;

function criarCardsProdutos() {
    $("#produtos_vendidos").empty();

    //La�o que percorrer� todos os produtos carregados pelo backend
    urlGlobal.forEach(function (item, index) {
        //Variavel que armazena os cards dos produtos
        var card = "<div class='card' style='width: 15rem;'>" +
            "<div class='card-body'>" +
            "N�: " +
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
            "Endere�o: " +
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
            alert("Voc� n�o est� logado!");
        } else {
            $.ajax({
                url: "https://projeto-ecommerce.herokuapp.com/api/produtos/ativarProduto/" + user + "/" + idproduto,
                type: "get",
                dataType: "json",
                success(url) {
                    alert("Usu�rio ativo");
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
            alert("Voc� n�o est� logado!");
        } else {
            $.ajax({
                url: "https://projeto-ecommerce.herokuapp.com/api/produtos/inativarproduto/" + user + idproduto,
                type: "get",
                dataType: "json",
                success(url) {
                    alert("Usu�rio desativado");
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
            alert("Voc� n�o est� logado!");
        } else {
            $.ajax({
                url: "https://projeto-ecommerce.herokuapp.com/api/produtos/inativarproduto/" + user + idproduto,
                type: "get",
                dataType: "json",
                success(url) {
                    alert("Usu�rio desativado");
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
    //Verifica��o para ver se os produtos a serem carregados devem ser filtrados ou n�o
    var endpoint;
    if (window.localStorage.getItem("Nome_Busca") !== "" && window.localStorage.getItem("Nome_Busca") !== null) {
        endpoint = "https://projeto-ecommerce.herokuapp.com/api/produtos/busca/" + window.localStorage.getItem("Nome_Busca");
        //colocar show dos bot�es de ordena��o aqui
        window.localStorage.setItem("Nome_Busca", "");
    } else {
        endpoint = "https://projeto-ecommerce.herokuapp.com/api/produtos/usuario/5e558e5b6df7c12c90fcee53/";
    }

    //Come�o do ajax para buscar os produtos
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