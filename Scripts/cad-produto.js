var cadproduto = document.getElementById("cadproduto");
var user = window.localStorage.getItem("user");

cadproduto.addEventListener("submit", function (e) {
    var obj = new FormData(cadproduto);

    var nome = JSON.stringify(obj.get("nome"));
    var marca = JSON.stringify(obj.get("marca"));
    var categoria = JSON.stringify(obj.get("categoria"));
    var descricao = JSON.stringify(obj.get("descricao"));
    var preco = JSON.stringify(obj.get("preco"));
    var quantidade = JSON.stringify(obj.get("quantidade"));
    var frete = JSON.stringify(obj.get("frete"));


    e.preventDefault();
});

function cadProduto() {
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/produtos/CadastroProduto/" + user + "/" +
            $("#nome").val().replace(/\s/g, "") + "/" + $("#descricao").val().replace(/\s/g, "") +
            "/" + $("#preco").val().replace(/\s/g, "") + "/" + $("#frete").val().replace(/\s/g, "") +
            "/" + $("#quantidade").val().replace(/\s/g, "") + "/" + $("#categoria").val().replace(/\s/g, "") +
            "/" + $("#marca").val().replace(/\s/g, ""),
        type: "GET",
        dataType: "json",
        success(url) {
            alert("Produto cadastrado com sucesso");
            window.location.replace("produtos-cadastrados.html");
        }
    });
}

function imagem() {
    var form = $("#inputImag").val();

    var settings = {
        url: "https://projeto-ecommerce.herokuapp.com/api/Produtos/Imagem/Armazenar/" + user + "/",
        "method": "GET",
        "timeout": 0,
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form,
    };
    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

function sair() {
    sessionStorage.clear();
    localStorage.clear();
}