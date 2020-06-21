var user = window.localStorage.getItem("user");
var produto;
var altproduto = document.querySelector("#altproduto");

altproduto.addEventListener("submit", function (e) {

    var obj = new FormData(altproduto);

    var prod = JSON.stringify(obj.get("prod"));
    var nome = JSON.stringify(obj.get("nome"));
    var marca = JSON.stringify(obj.get("marca"));
    var categoria = JSON.stringify(obj.get("categoria"));
    var descricao = JSON.stringify(obj.get("descricao"));
    var preco = JSON.stringify(obj.get("preco"));
    var quantidade = JSON.stringify(obj.get("quantidade"));
    var frete = JSON.stringify(obj.get("frete"));

    e.preventDefault();
});

function produto() {
    $("#produtos").empty();
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/produtos/usuario/" + user,
        type: "get",
        dataType: "json",
        success(url) {
            id = url.id;
            user = id;
            window.localStorage.setItem("user", user);
            url.forEach(function (item, index) {
                var card = "<option value='"+ item.id +"'>" + item.name + "</option>";
                $("#produtos").append(card);
            });
        }
    });
} 

function altProduto() {
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/produtos/alterarProduto/" + user + "/" + $("#prod").val() + "/" + $("#nome").val() + "/" + $("#descricao").val() + "/" + $("#preco").val() + "/" + $("#frete").val() + "/" + $("#quantidade").val() + "/" + $("#categoria").val() + "/" + $("#marca").val() + "/" + $("#produto > option:selected").val(),
        type: "get",
        dataType: "json",
        success(url) {
            alert("Produto alterado com sucesso");
            id = url.id;
            user = id;
            window.localStorage.setItem("user", user);
        }
    });
}

function sair() {
    sessionStorage.clear();
    localStorage.clear();
}