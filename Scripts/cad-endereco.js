var cadendereco = document.getElementById("cadendereco");
var user = window.localStorage.getItem("user");

cadendereco.addEventListener("submit", function (e) {

    var obj = new FormData(cadendereco);
    console.debug(obj);
    var nomeEnd = JSON.stringify(obj.get("nomeEnd"));
    var uf = JSON.stringify(obj.get("uf"));
    var cidade = JSON.stringify(obj.get("cidade"));
    var cep = JSON.stringify(obj.get("cep"));
    var bairro = JSON.stringify(obj.get("bairro"));
    var rua = JSON.stringify(obj.get("rua"));
    var numero = JSON.stringify(obj.get("numero"));
    var complemento = JSON.stringify(obj.get("complemento"));
    var obs = JSON.stringify(obj.get("obs"));

    console.debug({ nomeEnd, uf, cidade, cep, bairro, rua, numero, complemento, obs });

    e.preventDefault();
});

function cadastro() {
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/enderecos/CadastroEndereco/" + user + "/" + $("#nomeEnd").val().replace(/\s/g, "") + "/" + $("#cep").val().replace(/\s/g, "") + "/" + $("#uf").val().replace(/\s/g, "") + "/" + $("#cidade").val().replace(/\s/g, "") + "/" + $("#bairro").val().replace(/\s/g, "") + "/" + $("#rua").val().replace(/\s/g, "") + "/" + $("#numero").val().replace(/\s/g, "") + "/" + $("#complemento").val().replace(/\s/g, ""),
        type: "GET",
        dataType: "json",
        success(url) {
            alert("Endereço cadastrado com sucesso");
            var id = url.id;
            user = id;
            window.localStorage.setItem("user", user);
        }
    });
}

function verificar() {
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/enderecos/viacep/" + $("#cep").val(), 
        type: "get",
        dataType: "json",
        success(url) {

            document.querySelector("input[name=complemento]").value = url.complemento;
            document.querySelector("input[name=bairro]").value = url.bairro;
            document.querySelector("input[name=cidade]").value = url.cidade;
            document.querySelector("input[name=rua]").value = url.rua;
            document.querySelector("input[name=uf]").value = url.uf;
        }
    });

}

function sair() {
    sessionStorage.clear();
    localStorage.clear();
}