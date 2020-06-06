var cadproduto = document.getElementById("cadproduto");
var user = window.localStorage.getItem("user");

cadproduto.addEventListener("submit", function (e) {
    var obj = new FormData(cadproduto);
    console.debug(obj);

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
        type: "POST",
        dataType: "json",
        success(url) {
            alert("roduto cadastrado com sucesso"); 
            var id = url.id;
            var user = id;
            window.localStorage.setItem("user", user);
        }
    });
}

function sair() {
    sessionStorage.clear();
    localStorage.clear();
}