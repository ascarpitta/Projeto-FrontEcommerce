var user = window.localStorage.getItem("user");
var idPedido = window.localStorage.getItem("idPedido");
var ende;
$("#pagar").hide();

function carrinho() {
    $("#produtosCarrinho").empty();
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/carrinho/userid/" + user,
        type: "GET",
        dataType: "json",
        success(url) {
            var produtoCarrinho = "";
            var valorTotal = 0;
            url.produtos.forEach(function (item, i) {
                var imagem = item.url_imagem;
                if (imagem == null) {
                    imagem = "mackenzie.png";
                }
                if (i === 0) {
                    produtoCarrinho = "<div class='item'>" +
                        "<div class='buttons'>" +
                        "<span class='delete-btn remove' id='remove'>X</span>" +
                        "</div>" +
                        "<div style='width: 7rem;'>" +
                        "<div class='card-body'></div>" +
                        "</div>" +
                        "<div class='image'>" +
                        "<img src='" + imagem + "' alt='logo' height='80' width='170' />" +
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
                        "<span id='preco'>" + ((item.preco + item.frete) * item.quantidade).toFixed(2) + "</span>" +
                        "</div>" +
                        "</div>";
                    valorTotal += ((item.preco + item.frete) * item.quantidade).toFixed(2);
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
                        "<img src='" + imagem + "' alt='logo' height='80' width='170' />" +
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
                        "<span id='preco" + (i + 1).toString() + "'>" + ((item.preco + item.frete) * item.quantidade).toFixed(2) + "</span>" +
                        "</div>" +
                        "</div>";
                    valorTotal += ((item.preco + item.frete) * item.quantidade).toFixed(2);
                    window.localStorage.setItem("produto" + (i + 1).toString(), item.idProduto);
                }
                $("#valorTotal").text("Valor Total: R$ " + parseFloat(valorTotal).toFixed(2));
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
                var qntdProduto = parseInt($("#htop" + $(this).parent().attr("id").replace("quantity", "")).val());
                var precoProduto = parseFloat($("#preco" + $(this).parent().attr("id").replace("quantity", "")).text().replace(/^\D+/g, "")) / qntdProduto;

                $("#htop" + $(this).parent().attr("id").replace("quantity", "")).val(qntdProduto + 1);
                $("#preco" + $(this).parent().attr("id").replace("quantity", "")).html((precoProduto * (qntdProduto + 1)).toFixed(2));

                var objectClick = $(this);

                $.ajax({
                    url: "https://projeto-ecommerce.herokuapp.com/api/carrinho/AumentarProduto/" + user + "/" + window.localStorage.getItem("produto" + $(this).parent().attr("id").replace("quantity", "")),
                    type: "get",
                    dataType: "json",
                    success(url) {
                        carrinho();
                        if (qntdProduto + 1 > url) {
                            $("#htop" + objectClick.parent().attr("id").replace("quantity", "")).val(qntdProduto);
                            $("#preco" + objectClick.parent().attr("id").replace("quantity", "")).html((precoProduto * (qntdProduto)).toFixed(2));
                        }
                    }
                });
            });

            $(".decrease").click(function () {
                var qntdProduto = parseInt($("#htop" + $(this).parent().attr("id").replace("quantity", "")).val());
                var precoProduto = parseFloat($("#preco" + $(this).parent().attr("id").replace("quantity", "")).text().replace(/^\D+/g, "")) / qntdProduto;

                $("#htop" + $(this).parent().attr("id").replace("quantity", "")).val(qntdProduto - 1);
                $("#preco" + $(this).parent().attr("id").replace("quantity", "")).html((precoProduto * (qntdProduto - 1)).toFixed(2));

                $.ajax({
                    url: "https://projeto-ecommerce.herokuapp.com/api/carrinho/DiminuirProduto/" + user + "/" + window.localStorage.getItem("produto" + $(this).parent().attr("id").replace("quantity", "")),
                    type: "get",
                    dataType: "json",
                    error(url) {
                        carrinho();
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
            $("#pagar").show();
            idPedido = url.id;
            alert("Pedido realizado");
            $(".open_div1").click();
        },
        error() {
            alert("Erro no carrinho");
        }
    });
}

function pagar() {
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/Pedidos/PagarPedido/" + user + "/" + idPedido,
        type: "get",
        dataType: "json",
        success(url) {
            alert("Pedido pago com sucesso, visualize o recibo em seus pedidos");
            window.location.href = "historico-pedidos.html";
        }
    });
}

function sair() {
    sessionStorage.clear();
    localStorage.clear();
}