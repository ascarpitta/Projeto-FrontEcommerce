﻿var user;
var desejo1, desejo2, desejo3, desejo4, desejo5, desejo6, desejo7, desejo8, desejo9, desejo10;

function usuario() {
    desejo1 = window.localStorage.getItem("desejo1");
    desejo2 = window.localStorage.getItem("desejo2");
    desejo3 = window.localStorage.getItem("desejo3");
    desejo4 = window.localStorage.getItem("desejo4");
    desejo5 = window.localStorage.getItem("desejo5");
    desejo6 = window.localStorage.getItem("desejo6");
    desejo7 = window.localStorage.getItem("desejo7");
    desejo8 = window.localStorage.getItem("desejo8");
    desejo9 = window.localStorage.getItem("desejo9");
    desejo10 = window.localStorage.getItem("desejo10");

    user = window.localStorage.getItem("user");
    console.log("id fora da função: ", user);
}

function desejo() {
    usuario();
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/usuarios/ListaDesejo/" + user,
        type: "GET",
        dataType: "json",
        success(url) {
            console.log(url);
            document.getElementById("produto").parentElement.parentElement.style.display = "none";
            for (i = 2; i <= 40; i++) {
                document.getElementById("produto" + i).parentElement.parentElement.style.display = "none";
            }

            url.forEach(function (item, i) {
                if (i === 0) {
                    document.getElementById("produto").innerHTML = item.nameProduto;
                    window.localStorage.setItem("desejo" + (i + 1).toString(), item.idProduto);
                    document.getElementById("produto").parentElement.parentElement.style.display = "";
                } else {
                    document.getElementById("produto" + (i + 1).toString()).innerHTML = item.nameProduto;
                    window.localStorage.setItem("desejo" + (i + 1).toString(), item.idProduto);
                    document.getElementById("produto" + (i + 1).toString()).parentElement.parentElement.style.display = "";
                }
            });
        },
        error(url) {
            alert("Erro ao carregar produtos");
        }
    });
}


function remover() {
    usuario();
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/" + user + "/" + desejo1,
        type: "get",
        dataType: "json",
        success(url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error(url) {
            
        }
    });
}
function remover2() {
    usuario();
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/" + user + "/" + desejo2,
        type: "get",
        dataType: "json",
        success(url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error(url) {
            
        }
    });
}
function remover3() {
    usuario();
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/" + user + "/" + desejo3,
        type: "get",
        dataType: "json",
        success(url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error(url) {
            
        }
    });
}
function remover4() {
    usuario();
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/" + user + "/" + desejo4,
        type: "get",
        dataType: "json",
        success(url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error(url) {
            
        }
    });
}
function remover5() {
    usuario();
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/" + user + "/" + desejo5,
        type: "get",
        dataType: "json",
        success(url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error(url) {
            
        }
    });
}
function remover6() {
    usuario();
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/" + user + "/" + desejo6,
        type: "get",
        dataType: "json",
        success(url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error(url) {
            
        }
    });
}
function remover7() {
    usuario();
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/" + user + "/" + desejo7,
        type: "get",
        dataType: "json",
        success(url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error(url) {
            
        }
    });
}
function remover8() {
    usuario();
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/" + user + "/" + desejo8,
        type: "get",
        dataType: "json",
        success(url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error(url) {
            
        }
    });
}
function remover9() {
    usuario();
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/" + user + "/" + desejo9,
        type: "get",
        dataType: "json",
        success(url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error(url) {
            
        }
    });
}
function remover10() {
    usuario();
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/" + user + "/" + desejo10,
        type: "get",
        dataType: "json",
        success(url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error(url) {
            
        }
    });
}

function addCarrinho() {
    usuario();
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/" + user + "/" + desejo1,
        type: "get",
        dataType: "json",
        success(url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error(url) {
            alert("Erro ao adicionar no carrinho");
        }
    });
}
function addCarrinho2() {
    usuario();
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/" + user + "/" + desejo2,
        type: "get",
        dataType: "json",
        success(url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error(url) {
            alert("Erro ao adicionar no carrinho");
        }
    });
}
function addCarrinho3() {
    usuario();
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/" + user + "/" + idProduto3,
        type: "get",
        dataType: "json",
        success(url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error(url) {
            alert("Erro ao adicionar no carrinho");
        }
    });
}
function addCarrinho4() {
    usuario();
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/" + user + "/" + idProduto4,
        type: "get",
        dataType: "json",
        success(url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error(url) {
            alert("Erro ao adicionar no carrinho");
        }
    });
}
function addCarrinho5() {
    usuario();
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/" + user + "/" + idProduto5,
        type: "get",
        dataType: "json",
        success(url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error(url) {
            alert("Erro ao adicionar no carrinho");
        }
    });
}
function addCarrinho6() {
    usuario();
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/" + user + "/" + idProduto6,
        type: "get",
        dataType: "json",
        success(url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error(url) {
            alert("Erro ao adicionar no carrinho");
        }
    });
}
function addCarrinho7() {
    usuario();
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/" + user + "/" + idProduto7,
        type: "get",
        dataType: "json",
        success(url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error(url) {
            alert("Erro ao adicionar no carrinho");
        }
    });
}
function addCarrinho8() {
    usuario();
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/" + user + "/" + idProduto8,
        type: "get",
        dataType: "json",
        success(url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error(url) {
            alert("Erro ao adicionar no carrinho");
        }
    });
}
function addCarrinho9() {
    usuario();
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/" + user + "/" + idProduto9,
        type: "get",
        dataType: "json",
        success(url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error(url) {
            alert("Erro ao adicionar no carrinho");
        }
    });
}
function addCarrinho10() {
    usuario();
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/" + user + "/" + idProduto10,
        type: "get",
        dataType: "json",
        success(url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error(url) {
            alert("Erro ao adicionar no carrinho");
        }
    });
}

function sair() {
    sessionStorage.clear();
    localStorage.clear();
}