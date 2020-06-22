var user = window.localStorage.getItem("user");
var ende;

function carrinho() {
    $("#produtosCarrinho").empty();
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/carrinho/userid/" + user,
        type: "GET",
        dataType: "json",
        success(url) {
            var produtoCarrinho = "";
            url.produtos.forEach(function (item, i) {
                if (i === 0) {
                    produtoCarrinho = "<div class='item'>" +
                        "<div class='buttons'>" +
                        "<span class='delete-btn remove' id='remove'>X</span>" +
                        "</div>" +
                        "<div style='width: 7rem;'>" +
                        "<div class='card-body'></div>" +
                        "</div>" +
                        "<div class='image'>" +
                        "<img src='mackenzie.png' alt='logo' height='80' width='170' />" +
                        "</div>" +
                        "<div style='width: 5rem;'>" +
                        "<div class='card-body'></div>" +
                        "</div>" +
                        "<div class='description'>" +
                        "<span id='nome'>" + item.nameProduto + "</span>" +
                        "</div>" +
                        "<div style='width: 3rem;'>" +
                        "<div class='card-body'></div>" +
                        "</div>" +
                        "<div class='quantity' id='quantity'>" +
                        "<label for='htop'>Qntd: </label>" +
                        "<input class='decrease' type='button' name='decrease' value='-' />" +
                        "<input type='text' name='htop' value='" + item.quantidade + "' id='htop' />" +
                        "<input class='increase' type='button' name='increase' value='+' />" +
                        "</div>" +
                        "<div class='total-price'>" +
                        "R$" +
                        "<span id='preco'>" + (item.preco * item.quantidade) + "</span>" +
                        "</div>" +
                        "</div>";
                    window.localStorage.setItem("produto", item.idProduto);
                } else {
                    produtoCarrinho = "<div class='item'>" +
                        "<div class='buttons'>" +
                        "<span class='delete-btn remove' id='remove" + (i + 1).toString() + "'>X</span>" +
                        "</div>" +
                        "<div style='width: 7rem;'>" +
                        "<div class='card-body'></div>" +
                        "</div>" +
                        "<div class='image'>" +
                        "<img src='mackenzie.png' alt='logo' height='80' width='170' />" +
                        "</div>" +
                        "<div style='width: 5rem;'>" +
                        "<div class='card-body'></div>" +
                        "</div>" +
                        "<div class='description'>" +
                        "<span id='nome" + (i + 1).toString() + "'>" + item.nameProduto + "</span>" +
                        "</div>" +
                        "<div style='width: 3rem;'>" +
                        "<div class='card-body'></div>" +
                        "</div>" +
                        "<div class='quantity' id='quantity" + (i + 1).toString() + "'>" +
                        "<label for='htop" + (i + 1).toString() + "'>Qntd: </label>" +
                        "<input class='decrease' type='button' name='decrease' value='-' />" +
                        "<input type='text' name='htop' value='" + item.quantidade + "' id='htop" + (i + 1).toString() + "' />" +
                        "<input class='increase' type='button' name='increase' value='+' />" +
                        "</div>" +
                        "<div class='total-price'>" +
                        "R$" +
                        "<span id='preco" + (i + 1).toString() + "'>" + (item.preco * item.quantidade) + "</span>" +
                        "</div>" +
                        "</div>";
                    window.localStorage.setItem("produto" + (i + 1).toString(), item.idProduto);
                }
                $("#produtosCarrinho").append(produtoCarrinho);
            });

            $(".remove").click(function() {
                $.ajax({
                    url: "https://projeto-ecommerce.herokuapp.com/api/carrinho/RemoverProduto/" + user + "/" + window.localStorage.getItem("produto" + $(this).attr("id").replace("remove", "")),
                    type: "get",
                    dataType: "json",
                    success(url) {
                        window.localStorage.setItem("user", user);
                        alert("Produto removido com sucesso");
                        carrinho();
                    },
                    error(url) {
                        
                    }
                });
            });

            $(".increase").click(function () {
                $("#htop" + $(this).parent().attr("id").replace("quantity", "")).val(Number($("#htop" + $(this).parent().attr("id").replace("quantity", "")).val()) + 1);
                $.ajax({
                    url: "https://projeto-ecommerce.herokuapp.com/api/carrinho/AumentarProduto/" + user + "/" + window.localStorage.getItem("produto" + $(this).parent().attr("id").replace("quantity", "")),
                    type: "get",
                    dataType: "json",
                    success(url) {
                        window.localStorage.setItem("user", user);
                    },
                    error(url) {

                    }
                });
            });

            $(".decrease").click(function () {
                $("#htop" + $(this).parent().attr("id").replace("quantity", "")).val(Number($("#htop" + $(this).parent().attr("id").replace("quantity", "")).val()) - 1);
                $.ajax({
                    url: "https://projeto-ecommerce.herokuapp.com/api/carrinho/DiminuirProduto/" + user + "/" + window.localStorage.getItem("produto" + $(this).parent().attr("id").replace("quantity", "")),
                    type: "get",
                    dataType: "json",
                    success(url) {
                        window.localStorage.setItem("user", user);
                    },
                    error(url) {
                    }
                });
            });
        }
    });
}

function consend() {
    $("#lista_end").empty();
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/enderecos/" + user,
        type: "GET",
        dataType: "json",
        success(url) {
            var consEnd = "";
            url.forEach(function (item, i) {
                consEnd = "<div class='mt-1'> Nome: " +
                    "<span id='consulta' >" + item.nomeEndereco + "</span> - CEP" +
                    "<span id='consulta1'>" + item.cep + "</span> -" +
                    "<span id='consulta2'>" + item.rua + "</span> nº" +
                    "<span id='consulta3'>" + item.numero + "</span> -" +
                    "<span id='consulta4'>" + item.uf + "</span>" +
                    "</div>" +
                    "<hr />" +
                    "<button type='submit' class='btn btn-primary escolherEnd' style='background:#4F5D75;' >Esse</button>";
                $("#lista_end").append(consEnd);
                var id = item.id;
                ende = id;
            });

            $(".escolherEnd").click(function () {
                console.log("escolherEnd");
                var idProduto = $(this).attr("id");
                var user = window.localStorage.getItem("user");
                if (user === null) {
                    alert("Você não está logado!");
                } else {
                    $.ajax({
                        url: "https://projeto-ecommerce.herokuapp.com/api/carrinho/addendereco/" + user + "/" + ende,
                        type: "get",
                        dataType: "json",
                        success(url) {

                            window.localStorage.setItem("user", user);
                            alert("Endereço escolhido");
                        }
                    });
                }
            });
        }
    });


}
    
function finalizar() {
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/carrinho/finalizarCarrinho/" + user ,
        type: "get",
        dataType: "json",
        success(url) {
            var fina = "";
            url.forEach(function (item, i) {
                fina = "<h2 style='color: #4F5D75'>Esse é o seu QRCode para pagamento:</h2>" +
                    "<img src='qrcode.png' alt='logo' height='400' width='420'>" +
                    "<br />" +
                    "<button type='submit' class='btn btn - primary' style='background:#4F5D75;' onclick='pagar()'>Pagar</button>" +
                    "<br />" +
                    "<button type='submit' class='btn btn - primary' style='background:#4F5D75;' onclick='recibo()'>Baixar recibo</button>";
                $("#finalizar_pedido").append(fina);
                window.localStorage.setItem("user", user);
                alert("Pedido realizado");
            });
        }
    });
}

function pagar() {
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/Pedidos/PagarPedido/" + user + item.pedido,
        type: "get",
        dataType: "json",
        success(url) {
            alert("Pedido pago com sucesso, baixe seu recibo");

        }
    });
}

function recibo() {
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/ReciboCompra/" + user + item.pedido,
        type: "get",
        dataType: "json",
        success(url) {
            
        }
    });
}

function sair() {
    sessionStorage.clear();
    localStorage.clear();
}