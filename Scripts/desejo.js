var user = window.localStorage.getItem("user");
let urlGlobal;
var desejo;

function criarCardsProdutos() {
    $("#lista_desejos").empty();

    //Laço que percorrerá todos os produtos carregados pelo backend
    urlGlobal.forEach(function (item, index) {
        //Variavel que armazena os cards dos produtos
        var card = "<div class='card' style='width: 15rem;'>" +
            "<img class='card-img-top' src='mackenzie.png' alt='Card image cap'>" +
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
                    alert("Produto adicionado ao carrinho")
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
            console.info("passou");
        },
        error(url) {
            //alert("Erro ao visualizar produtos");
        }
    });
}

//var desejo1, desejo2;

//function usuario() {
//    desejo1 = window.localStorage.getItem('desejo1');
//    desejo2 = window.localStorage.getItem('desejo2');
//}

//function desejo() {
//    $.ajax({
//        url: "https://projeto-ecommerce.herokuapp.com/api/usuarios/ListaDesejo/" + user,
//        type: "GET",
//        dataType: "json",
//        success(url) {
//            document.getElementById("produto").parentElement.parentElement.style.display = "none";
//            for (i = 2; i <= 40; i++) {
//                document.getElementById("produto" + i).parentElement.parentElement.style.display = "none";
//            }

//            url.forEach(function (item, i) {
//                if (i === 0) {
//                    document.getElementById("produto").innerHTML = item.nameProduto;
//                    window.localStorage.setItem("desejo" + (i + 1).toString(), item.idProduto);
//                    document.getElementById("produto").parentElement.parentElement.style.display = "";
//                } else {
//                    document.getElementById("produto" + (i + 1).toString()).innerHTML = item.nameProduto;
//                    window.localStorage.setItem("desejo" + (i + 1).toString(), item.idProduto);
//                    document.getElementById("produto" + (i + 1).toString()).parentElement.parentElement.style.display = "";
//                }
//            });
//        },
//        error(url) {
//            alert("Erro ao carregar produtos");
//        }
//    });
//}


//function remover() {
//    usuario()
//    $.ajax({
//        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo1,
//        type: 'get',
//        dataType: 'json',
//        success: function (url) {
//            id = url.id;
//            user = id;
//            window.localStorage.setItem("user", user);
//        }
//    });
//}

//function addCarrinho() {
//    usuario()
//    $.ajax({
//        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + desejo1,
//        type: 'get',
//        dataType: 'json',
//        success: function (url) {
//            id = url.id;
//            user = id;
//            window.localStorage.setItem("user", user);
//        }
//    });
//}

function sair() {
    sessionStorage.clear();
    localStorage.clear();
}