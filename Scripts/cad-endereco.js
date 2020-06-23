var cadendereco = document.getElementById("cadendereco");
var user = window.localStorage.getItem("user");

cadendereco.addEventListener("submit", function (e) {

    var obj = new FormData(cadendereco);
    var nomeEnd = JSON.stringify(obj.get("nomeEnd"));
    var uf = JSON.stringify(obj.get("uf"));
    var cidade = JSON.stringify(obj.get("cidade"));
    var cep = JSON.stringify(obj.get("cep"));
    var bairro = JSON.stringify(obj.get("bairro"));
    var rua = JSON.stringify(obj.get("rua"));
    var numero = JSON.stringify(obj.get("numero"));
    var complemento = JSON.stringify(obj.get("complemento"));
    var obs = JSON.stringify(obj.get("obs"));

    e.preventDefault();
});

$("#numero").keyup(function (e) {
    $(this).val($(this).val().replace(/\D/g, ""));
});

$("#cep").keyup(function (e) {
    $(this).val($(this).val().replace(/\D/g, ""));
});

function cadastro() {
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/enderecos/CadastroEndereco/" + user + "/" + $("#nomeEnd").val() + "/" + $("#cep").val().replace(/\s/g, "") + "/" + $("#uf").val() + "/" + $("#cidade").val() + "/" + $("#bairro").val() + "/" + $("#rua").val() + "/" + $("#numero").val() + $("#complemento").val(),
        type: "GET",
        dataType: "json",
        error(url) {
            alert("Endereço cadastrado com sucesso");
            window.location.replace("perfil-usuario.html");
        }
    });
}

function verificar() {
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/enderecos/viacep/" + $("#cep").val(), 
        type: "get",
        dataType: "json",
        success(url) {
            document.querySelector("input[name=bairro]").value = url.bairro.trim();
            document.querySelector("input[name=cidade]").value = url.cidade.trim();
            document.querySelector("input[name=rua]").value = url.rua.trim();
            document.querySelector("input[name=uf]").value = url.uf.trim();
        }
    });
}

function sair() {
    sessionStorage.clear();
    localStorage.clear();
}