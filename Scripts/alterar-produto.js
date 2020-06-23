var user = window.localStorage.getItem("user");
var produto;
let urlGlobal;
var altproduto = document.querySelector("#altproduto");
var form;

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
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/produtos/usuario/" + user,
        type: "get",
        dataType: "json",
        success(url) {
            urlGlobal = url;
            url.forEach(function (item, index) {
                var card = "<option value='" + item.id + "'>" + item.name + "</option>";
                $("#produtos").append(card);
                if (item.id == $("#produtos > option:selected").val()) {
                    document.querySelector("input[name=nome]").value = item.name;
                    document.querySelector("input[name=marca]").value = item.marca;
                    $("#categoria").val(item.category);
                    document.querySelector("input[name=descricao]").value = item.description;
                    document.querySelector("input[name=preco]").value = item.price;
                    $("#quantidade").val(item.quantity);
                    document.querySelector("input[name=frete]").value = item.frete;
                }
            });
        }
    });
} 

$("#produtos").change(function () {
    urlGlobal.forEach(function (item, index) {
        if (item.id == $("#produtos > option:selected").val()) {
            document.querySelector("input[name=nome]").value = item.name;
            document.querySelector("input[name=marca]").value = item.marca;
            $("#categoria").val(item.category);
            document.querySelector("input[name=descricao]").value = item.description;
            document.querySelector("input[name=preco]").value = item.price;
            $("#quantidade").val(item.quantity);
            document.querySelector("input[name=frete]").value = item.frete;
        }
    });
})

function altProduto() {
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/produtos/alterarProduto/" + user + "/" + $("#produtos > option:selected").val() + "/"
            + $("#nome").val() + "/" + $("#descricao").val() + "/" + $("#preco").val() + "/" + $("#frete").val() + "/"
            + $("#quantidade > option:selected").val() + "/" + $("#categoria > option:selected").val() + "/" + $("#marca").val(),
        type: "get",
        dataType: "json",
        success(dados) {
            if (form != undefined) {
                $.ajax({
                    url: "https://projeto-ecommerce.herokuapp.com/api/Produtos/Imagem/Armazenar/" + dados.id,
                    method: "POST",
                    data: form,
                    processData: false,
                    contentType: false,
                    error(url) {
                        if (url.status == 200) {
                            alert("Produto atualizar com sucesso!");
                            window.location.href = "produtos-cadastrados.html";
                        } else {
                            alert("Erro ao atualizar a imagem do produto!");
                        }
                    }
                });
            }
        },
        error(url) {
            alert("Erro ao atualizar produto");
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