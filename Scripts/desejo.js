var user;
var desejo1, desejo2, desejo3, desejo4, desejo5;
function usuario() {
    desejo1 = window.localStorage.getItem('desejo1');
    desejo2 = window.localStorage.getItem('desejo2');
    desejo3 = window.localStorage.getItem('desejo3');
    desejo4 = window.localStorage.getItem('desejo4');
    desejo5 = window.localStorage.getItem('desejo5');
    user = window.localStorage.getItem('user');
    console.log("id fora da função: ", user)
}

function desejo() {
    usuario();
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/usuarios/ListaDesejo/" + user,
        type: "GET",
        dataType: "json",
        success(url) {
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
    usuario()
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo1,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        }
    });
}

function addCarrinho() {
    usuario()
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + desejo1,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        }
    });
}

function sair() {
    sessionStorage.clear()
    localStorage.clear()
}