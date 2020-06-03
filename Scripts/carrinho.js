﻿var alterarsenha = document.getElementById('alterarsenha');
var user;
var produto, produto1, produto2, produto3, produto4, produto5, produto6;
var end, end1, end2, end3, end4, end5, end6;

function usuario() {
    end = window.localStorage.getItem('end');
    console.log("id prod fora da função: ", end)
    end1 = window.localStorage.getItem('end1');
    end2 = window.localStorage.getItem('end2');
    end3 = window.localStorage.getItem('end3');
    end4 = window.localStorage.getItem('end4');
    end5 = window.localStorage.getItem('end5');
    end6 = window.localStorage.getItem('end6');

    user = window.localStorage.getItem('user');
    console.log("id fora da função: ", user)
}

function carrinho() {
    usuario()
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/userid/' + user,
        type: 'GET',
        dataType: 'json',
        success: function (url) {
            console.info(url);
            var produtoCarrinho = "";
            url.produtos.forEach(function (item, i) {
                if (i == 0) {
                    produtoCarrinho = '<div class="item">' +
                        '<div class="buttons">' +
                        '<span class="delete-btn remove" id="remove"">X</span>' +
                        '</div>' +
                        '<div style="width: 7rem;">' +
                        '<div class="card-body"></div>' +
                        '</div>' +
                        '<div class="image">' +
                        '<img src="mackenzie.png" alt="logo" height="80" width="170" />' +
                        '</div>' +
                        '<div style="width: 5rem;">' +
                        '<div class="card-body"></div>' +
                        '</div>' +
                        '<div class="description">' +
                        '<span id="nome">' + item.nameProduto + '</span>' +
                        '</div>' +
                        '<div style="width: 3rem;">' +
                        '<div class="card-body"></div>' +
                        '</div>' +
                        '<div class="quantity" id="quantity">' +
                        '<label for="htop">Qntd: </label>' +
                        '<input class="decrease" type="button" name="decrease" value="-" />' +
                        '<input type="text" name="htop" value="' + item.quantidade + '" id="htop" />' +
                        '<input class="increase" type="button" name="increase" value="+" />' +
                        '</div>' +
                        '<div class="total-price">' +
                        'R$' +
                        '<span id="preco">' + (item.preco * item.quantidade) + '</span>' +
                        '</div>' +
                        '</div>';
                    window.localStorage.setItem("produto", item.idProduto);
                } else {
                    produtoCarrinho = '<div class="item">' +
                        '<div class="buttons">' +
                        '<span class="delete-btn remove" id="remove' + (i + 1).toString() + '">X</span>' +
                        '</div>' +
                        '<div style="width: 7rem;">' +
                        '<div class="card-body"></div>' +
                        '</div>' +
                        '<div class="image">' +
                        '<img src="mackenzie.png" alt="logo" height="80" width="170" />' +
                        '</div>' +
                        '<div style="width: 5rem;">' +
                        '<div class="card-body"></div>' +
                        '</div>' +
                        '<div class="description">' +
                        '<span id="nome' + (i + 1).toString() + '">' + item.nameProduto + '</span>' +
                        '</div>' +
                        '<div style="width: 3rem;">' +
                        '<div class="card-body"></div>' +
                        '</div>' +
                        '<div class="quantity" id="quantity' + (i + 1).toString() + '">' +
                        '<label for="htop' + (i + 1).toString() + '">Qntd: </label>' +
                        '<input class="decrease" type="button" name="decrease" value="-" />' +
                        '<input type="text" name="htop" value="' + item.quantidade + '" id="htop' + (i + 1).toString() + '" />' +
                        '<input class="increase" type="button" name="increase" value="+" />' +
                        '</div>' +
                        '<div class="total-price">' +
                        'R$' +
                        '<span id="preco' + (i + 1).toString() + '">' + (item.preco * item.quantidade) + '</span>' +
                        '</div>' +
                        '</div>';
                    window.localStorage.setItem("produto" + (i + 1).toString(), item.idProduto);
                }
                $("#produtosCarrinho").append(produtoCarrinho)
            });

            $(".remove").click(function() {
                usuario()
                $.ajax({
                    url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/RemoverProduto/' + user + '/' + window.localStorage.getItem('produto' + $(this).attr("id").replace("remove", "")),
                    type: 'get',
                    dataType: 'json',
                    success: function (url) {
                        window.localStorage.setItem("user", user);
                        alert("Produto removido com sucesso")
                    },
                    error: function (url) {
                        //alert('Erro ao remover produtoo')
                    }
                });
            });

            $(".increase").click(function () {
                console.info(Number($("#htop" + $(this).parent().attr("id").replace("quantity", "")).text()));
                $("#htop" + $(this).parent().attr("id").replace("quantity", "")).val(Number($("#htop" + $(this).parent().attr("id").replace("quantity", "")).val()) + 1);
                usuario()
                $.ajax({
                    url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/AumentarProduto/' + user + '/' + window.localStorage.getItem('produto' + $(this).parent().attr("id").replace("quantity", "")),
                    type: 'get',
                    dataType: 'json',
                    success: function (url) {
                        console.log(url);
                        id = url.id;
                        user = id;
                        usuario();
                        window.localStorage.setItem("user", user);
                        //alert("Produto aumentado com sucesso")
                    },
                    error: function (url) {
                        //alert('Erro ao aumentar produtoo')
                    }
                });
            });

            $(".decrease").click(function () {
                $("#htop" + $(this).parent().attr("id").replace("quantity", "")).val(Number($("#htop" + $(this).parent().attr("id").replace("quantity", "")).val()) - 1);
                usuario()
                $.ajax({
                    url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/DiminuirProduto/' + user + '/' + window.localStorage.getItem('produto' + $(this).parent().attr("id").replace("quantity", "")),
                    type: 'get',
                    dataType: 'json',
                    success: function (url) {
                        console.log(url);
                        id = url.id;
                        user = id;
                        usuario();
                        window.localStorage.setItem("user", user);
                        //alert("Produto diminuido com sucesso")
                    },
                    error: function (url) {
                        //alert('Erro ao diminuido produtoo')
                    }
                });
            });
        }
    });
}


function consend() {
    usuario()
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/enderecos/' + user,
        type: 'GET',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            var consEnd = "";
            url.forEach(function (item, i) {
                consEnd = '<div class="mt-1"> Nome: ' +
                    '<span id="consulta" >' + item.nomeEndereco + '</span> - CEP' +
                    '<span id="consulta1">' + item.cep + '</span> -' +
                    '<span id="consulta2">' + item.rua + '</span> nº' +
                    '<span id="consulta3">' + item.numero + '</span> -' +
                    '<span id="consulta4">' + item.uf + '</span>' +
                    '</div>' +
                    '<hr />' +

                    '<button type="submit" class="btn btn-primary" style="background:#4F5D75;" onclick="finalizar()">Esse</button>';
                $("#lista_end").append(consEnd);
                
            })
        }
    });
}

function endereco() {
    usuario()
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addendereco/' + user + '/' + end,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
            alert('Pedido realizado')
        },
        error: function (url) {
            alert('Erro ao finalizar pedido')
        }
    });
}

function endereco1() {
    usuario()
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addendereco/' + user + '/' + end1,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
            alert('Pedido realizado')
        },
        error: function (url) {
            alert('Erro ao finalizar pedido')
        }
    });
}

function endereco2() {
    usuario()
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addendereco/' + user + '/' + end2,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
            alert('Pedido realizado')
        },
        error: function (url) {
            alert('Erro ao finalizar pedido')
        }
    });
}

function endereco3() {
    usuario()
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addendereco/' + user + '/' + end3,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
            alert('Pedido realizado')
        },
        error: function (url) {
            alert('Erro ao finalizar pedido')
        }
    });
}

function endereco4() {
    usuario()
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addendereco/' + user + '/' + end4,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
            alert('Pedido realizado')
        },
        error: function (url) {
            alert('Erro ao finalizar pedido')
        }
    });
}

function endereco5() {
    usuario()
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addendereco/' + user + '/' + end5,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
            alert('Pedido realizado')
        },
        error: function (url) {
            alert('Erro ao finalizar pedido')
        }
    });
}

function endereco5() {
    usuario()
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addendereco/' + user + '/' + end6,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
            alert('Pedido realizado')
        },
        error: function (url) {
            alert('Erro ao finalizar pedido')
        }
    });
}

function finalizar() {
    usuario()
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/finalizarCarrinho/' + user,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
            alert('Pedido realizado')
        },
        error: function (url) {
            //alert('Erro ao finalizar pedido')
        }
    });
}

function sair() {
    sessionStorage.clear()
    localStorage.clear()
}