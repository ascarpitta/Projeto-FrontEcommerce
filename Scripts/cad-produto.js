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

    console.debug({ nome, marca, categoria, descricao, preco, quantidade, frete });

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
            alert("roduto cadastrado com sucesso"); 

            window.localStorage.setItem("user", user);
        }
    });
}

function imagem() {
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/Produtos/Imagem/Armazenar/" + user,
        type: "get",
        dataType: "json",
        success(url) {
            var finalizar = "";
            url.forEach(function (item, i) {
                finalizar =
                    "<button type='submit' class='btn btn - primary' style='background:#4F5D75;'>Escolher imagem</button>";

                $("#imagem").append(finalizar);
                window.localStorage.setItem("user", user);
                alert("Imagem adicionada");
            });
        },
        error(url) {
            alert("Erro ao adicionar imagem")
        }
    });
}

function sair() {
    sessionStorage.clear();
    localStorage.clear();
}