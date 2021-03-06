var user = window.localStorage.getItem("user");
let urlGlobal;

function criarCardsProdutos() {
    $("#lista_produtos").empty();

    //La�o que percorrer� todos os produtos carregados pelo backend
    urlGlobal.forEach(function (item, index) {
        //Variavel que armazena os cards dos produtos
        var imagem = item.url_imagem;
        if (imagem == null) {
            imagem = "mackenzie.png";
        }
        var card = "<div class='card' style='width: 15rem;'>" +
            "<div class='card-body'>" +
            "<img class='card-img-top' src='" + imagem + "' alt='Card image cap'>" +
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
            "R$" +
            "<span>" + item.price + "</span>" +
            "</div>" +
            "<div class='mt-1'>" +
            "Descri��o:" +
            "<span>" + item.description + "</span>" +
            "</div>" +
            "<div class='mt-1'>" +
            "Categoria:" +
            "<span>" + item.category + "</span>" +
            "</div>" +
            "<div class='mt-1'>" +
            "Marca:" +
            "<span>" + item.marca + "</span>" +
            "</div>" +
            "<div class='card row justify-content-center' style='width: 5rem;'>" +
            "<button class='btn btn-primary addDesejo' type='button' style='background: #4F5D75;' id='" + item.id + "'><img class='card-img-top' src='desejo.jpg' alt='desejo' height='37' width='37'></button> </a>" +
            "<button class='btn btn-primary remDesejo' type='button' style='background: #4F5D75;' id='" + item.id + "'><img class='card-img-top' src='desejo2.jpg' alt='desejo' height='37' width='37'></button> </a>" +
            "</div>" +
            "<div class='card row justify-content-center' style='width: 20rem;'>" +
            "<button class='btn btn-primary addCarrinho' type='button' style='background: #4F5D75;' id='" + item.id + "'>Adicionar ao carrinho</button>" +
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
    $(".addDesejo").click(function () {
        var idProduto = $(this).attr("id");
        var user = window.localStorage.getItem("user");
        if (user === null) {
            alert("Voc� n�o est� logado!");
        } else {
            $.ajax({
                url: "https://projeto-ecommerce.herokuapp.com/api/usuarios/AddListaDesejo/" + user + "/" + idProduto,
                type: "get",
                dataType: "json",
                success(url) {
                }
            });
        }
    });

    $(".remDesejo").click(function () {
        var idProduto = $(this).attr("id");
        var user = window.localStorage.getItem("user");

        if (user === null) {
            alert("Voc� n�o est� logado!");
        } else {
            $.ajax({
                url: "https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/" + user + "/" + idProduto,
                type: "get",
                dataType: "json",
                success(url) {
                }
            });
        }
    });

    $(".addCarrinho").click(function () {
        var idProduto = $(this).attr("id");
        var user = window.localStorage.getItem("user");

        if (user === null) {
            alert("Voc� n�o est� logado!");
        } else {
            $.ajax({
                url: "https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/" + user + "/" + idProduto,
                type: "get",
                dataType: "json",
                success(url) {
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

function buscar() {
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/produtos/filtro/" + $("#categoria").val(),
        type: "GET",
        dataType: "json",
        success(url) {
            urlGlobal = url;
            criarCardsProdutos();
        },
        error(url) {
            alert("N�o foi poss�vel buscar");
        }
    });
}

function sair() {
    sessionStorage.clear();
    localStorage.clear();
}