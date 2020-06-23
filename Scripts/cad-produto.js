var cadproduto = document.getElementById("cadproduto");
var user = window.localStorage.getItem("user");
var form;

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
            $("#nome").val() + "/" + $("#descricao").val() +
            "/" + $("#preco").val() + "/" + $("#frete").val() +
            "/" + $("#quantidade").val() + "/" + $("#categoria").val() +
            "/" + $("#marca").val(),
        type: "GET",
        dataType: "json",
        success(dados) {
            if (form != undefined) {
                $.ajax({
                    url: "https://projeto-ecommerce.herokuapp.com/api/Produtos/Imagem/Armazenar/" + dados.id,
                    method: "POST",
                    data: form,
                    processData: false,
                    contentType: false,
                    success(dados) {
                        alert("Produto cadastrado com sucesso!");
                        window.location.href = "produtos-cadastrados.html";
                    },
                    error() {
                        alert("Erro ao cadastrar a Imagem do produto!");
                    }
                });
            }
        },
        error(url) {
            alert("Erro ao cadastrar produto");
        }
    });
}
$("#inputImag").change(function (e) {
    form = new FormData();
    form.append("fileUpload", e.target.files[0]);
});

function sair() {
    sessionStorage.clear();
    localStorage.clear();
}