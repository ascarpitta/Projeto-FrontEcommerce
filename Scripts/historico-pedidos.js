var user = window.localStorage.getItem("user");
let urlGlobal;

function criarCardsProdutos() {
    $("#pedidos").empty();
    //Laço que percorrerá todos os produtos carregados pelo backend
    urlGlobal.forEach(function (item, index) {
        //Variavel que armazena os cards dos produtos
        var card = "<div class='card' style='width: 15rem;'>" +
            "<div class='card-body'>" +
            "Nº: " +
            "<label>" + item.numPedido + "</label>" +
            "</div>" +
            "<div>" +
            "<div class='top'>" +
            "<div class='open_div'>Ver detalhes</div>" +
            "<div class='hidden_div' style='width: 500px; z-index:1000'>" +
            "<div class='mt-1 font-weight-bold'>" +
            "Data: " +
            "<span>" + new Date(item.dataPedidoRealizado).getDate() + "/" + (parseInt(new Date(item.dataPedidoRealizado).getMonth()) + 1) + "/" + new Date(item.dataPedidoRealizado).getFullYear() + "</span>" +
            "</div>" +
            "<div class='mt-1'>" +
            "Valor final: " +
            "<span>" + item.vlFinal.toFixed(2) + "</span>" +
            "</div>" +
            "<div class='mt-1'>" +
            "Endereço: " +
            "<span>" + item.rua + ", " + item.numero + "</span>" +
            "</div>" +
            "<div class='top1'>" +
            "<div class='open_div1'>Ver produtos</div>" +
            "<div class='hidden_div1' style='width: 490px;'>";
        item.produtos.forEach(function (produto, index) {

            card += "<div class='item'>" +
                "<div class='buttons'>" +
                "<span class='delete-btn cancelar' id='" + produto.idProduto + "_" + item.id + "'>X</span>" +
                "</div>" +
                "<div class='mt-1'>" +
                "Produto: " +
                "<span>" + produto.nameProduto + "</span>" +
                "</div>" +
                "<div class='mt-1 ml-2'>" +
                "R$ " +
                "<span>" + parseFloat(produto.preco).toFixed(2) + "</span>" +
                "</div>" +
                "</div>" +
                "<div class='card row justify-content-center' style='width: 20rem;'>" +
                "<button class='btn btn-primary sinalizar' type='button' style='background: #4F5D75;' id='" + produto.idProduto + "_" + item.id + "'>Sinalizar recebimento</button> </a>" +
                "<button class='btn btn-primary recibo' type='button' style='background: #4F5D75;' id='" + produto.idProduto + "_" + item.id + "'>Recibo do produto</button> </a>" +
                "</div>";
        });
            
        card += "</div>" +
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
        $("#pedidos").append(card);
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
        var user = window.localStorage.getItem("user");
        if (user === null) {
            alert("Você não está logado!");
        } else {
            var idpedido = $(this).attr("id").split("_")[1];
            var idproduto = $(this).attr("id").split("_")[0];
            $.ajax({
                url: "https://projeto-ecommerce.herokuapp.com/api/Pedidos/CancelarItemPedido/" + user + "/" + idpedido + "/" + idproduto,
                type: "get",
                dataType: "json",
                success(url) {
                    alert("Produto cancelado");
                    window.localStorage.setItem("user", user);
                }
            });
        }
    });

    $(".sinalizar").click(function () {
        var user = window.localStorage.getItem("user");
        if (user === null) {
            alert("Você não está logado!");
        } else {
            var idpedido = $(this).attr("id").split("_")[1];
            var idproduto = $(this).attr("id").split("_")[0];
            $.ajax({
                url: "https://projeto-ecommerce.herokuapp.com/api/Pedidos/ReceberItemPedido/" + user + "/" + idpedido + "/" + idproduto,
                type: "get",
                dataType: "json",
                success(url) {
                    alert("Produto recebido");
                    window.localStorage.setItem("user", user);
                }
            });
        }
    });

    $(".recibo").click(function () {
        var user = window.localStorage.getItem("user");
        if (user === null) {
            alert("Você não está logado!");
        } else {
            var idpedido = $(this).attr("id").split("_")[1];
            var idproduto = $(this).attr("id").split("_")[0];
            window.open("https://projeto-ecommerce.herokuapp.com/api/Pedidos/GerarRecibo/" + user + "/" + idpedido + "/" + idproduto);
            //$.ajax({
            //    url: "https://projeto-ecommerce.herokuapp.com/api/Pedidos/GerarRecibo/" + user + "/" + idpedido + "/" + idproduto,
            //    type: "get",
            //    dataType: "json",
            //    success(url) {
            //        alert("Baixando o recibo");
            //        window.localStorage.setItem("user", user);
            //    }
            //});
        }
    });
}

function pedido() {
    //Verificação para ver se os produtos a serem carregados devem ser filtrados ou não
    var endpoint;
    if (window.localStorage.getItem("Nome_Busca") !== "" && window.localStorage.getItem("Nome_Busca") !== null) {
        endpoint = "https://projeto-ecommerce.herokuapp.com/api/produtos/busca/" + window.localStorage.getItem("Nome_Busca");
        //colocar show dos botões de ordenação aqui
        window.localStorage.setItem("Nome_Busca", "");
    } else {
        endpoint = "https://projeto-ecommerce.herokuapp.com/api/pedidos/buscarpedidos/" + user;
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
        url: "https://projeto-ecommerce.herokuapp.com/api/Pedidos/GetExibirAndamentoCompra/" + user,
        type: "get",
        dataType: "json",
        success(url) {
            urlGlobal = url;
            criarCardsProdutos();
        }
    });
}

function sair() {
    sessionStorage.clear();
    localStorage.clear();
}