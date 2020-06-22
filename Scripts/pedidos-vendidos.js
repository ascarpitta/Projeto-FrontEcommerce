var user = window.localStorage.getItem("user");
var idPedido;
var idProduto;
let urlGlobal;

function criarCardsProdutos() {
    $("#produtos_vendidos").empty();
    //Laço que percorrerá todos os produtos carregados pelo backend
    urlGlobal.forEach(function (item, index) {
        //Variavel que armazena os cards dos produtos
        var card = "<div class='card' style='width: 15rem;'>" +
            "<div class='card-body'>" +
            "N&deg;: " +
            "<label>" + item.numPedido + "</label>" +
            "</div>" +
            "<div>" +
            "<div class='top'>" +
            "<div class='open_div'>Ver detalhes</div>" +
            "<div class='hidden_div' style='width: 500px; z-index:1000'>" +
            "<div class='mt-1 font-weight-bold'>" +
            "Data: " +
            "<span>" + new Date(item.dataPedidoRealizadoCompra).getDate() + "/" + (parseInt(new Date(item.dataPedidoRealizadoCompra).getMonth()) + 1) + "/" + new Date(item.dataPedidoRealizadoCompra).getFullYear() + "</span>" +
            "</div>" +
            "<div class='mt-1'>" +
            "Valor final: " +
            "<span>" + parseFloat(item.vlTotalCompra).toFixed(2) + "</span>" +
            "</div>" +
            "<div class='mt-1'>" +
            "Endere&ccedil;o: " +
            "<span>" + item.nomeEnderecoCompra + "</span>" +
            "</div>" +
            "<div class='top1'>" +
            "<div class='open_div1'>Ver produtos</div>" +
            "<div class='hidden_div1'>" +
            "<div class='item'>" +
            "<div class='buttons'>" +
            "<span class='delete-btn cancelar'>X</span>" +
            "</div>" +
            "<div class='mt-1'>" +
            "Produto " +
            "<span>" + item.nomeProduto + "</span>" +            
            "</div>" +
            "<div class='mt-1'>" +
            "Quantidade " +
            "<span>" + item.quandidade + "</span>" +
            "</div>" +
            "</div>" +
            "<div class='card row justify-content-center' style='width: 20rem;'>" +
            "<button class='btn btn-primary sinalizar' type='button' style='background: #4F5D75;' id='" + item.id + "'>Pedido em transporte</button> </a>" +
            "<button class='btn btn-primary recibo' type='button' style='background: #4F5D75;' id='" + item.id + "'>Recibo do produto</button> </a>" +
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
        idProduto = item.idProdutoCompra;
        idPedido = item.id;
        
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
                url: "https://projeto-ecommerce.herokuapp.com/api/Pedidos/CancelarItemPedidoVenda/" + user + "/" + idProduto,
                type: "get",
                dataType: "json",
                success(url) {
                    alert("Produto cancelado");

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
                url: "https://projeto-ecommerce.herokuapp.com/api/pedido/ItemEmTransportePedidoVenda/" + user + idProduto,
                type: "get",
                dataType: "json",
                success(url) {
                    alert("Produto em transporte");

                    window.localStorage.setItem("user", user);
                }
            });
        }
    });

    $(".recibo").click(function () {
        var idProduto = $(this).attr("id");
        var user = window.localStorage.getItem("user");

        if (user === null) {
            alert("Você não está logado!");
        } else {
            $.ajax({
                url: "https://projeto-ecommerce.herokuapp.com/api/Pedidos/GerarReciboVenda/" + user + "/" + idPedido + "/" + idProduto,
                type: "get",
                dataType: "json",
                error(url) {
                    window.open("https://projeto-ecommerce.herokuapp.com/api/Pedidos/GerarReciboVenda/" + user + "/" + idPedido + "/" + idProduto);
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
        endpoint = "https://projeto-ecommerce.herokuapp.com/api/pedidos/ExibirPedidosVenda/" + user;
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