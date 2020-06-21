var altendereco = document.getElementById("altendereco");
var user = window.localStorage.getItem("user");

altendereco.addEventListener("submit", function (e) {

    var obj = new FormData(altendereco);
    console.debug(obj);
    var end = JSON.stringify(obj.get("end"));
    var nomeEnd = JSON.stringify(obj.get("nomeEnd"));
    var uf = JSON.stringify(obj.get("uf"));
    var cidade = JSON.stringify(obj.get("cidade"));
    var cep = JSON.stringify(obj.get("cep"));
    var bairro = JSON.stringify(obj.get("bairro"));
    var rua = JSON.stringify(obj.get("rua"));
    var numero = JSON.stringify(obj.get("numero"));
    var complemento = JSON.stringify(obj.get("complemento"));
    var complemento = JSON.stringify(obj.get("obs"));

    e.preventDefault();
});

function ender(){
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/enderecos/" + user,
        type: "get",
        dataType: "json",
        success(url) {
            id = url.id;
            user = id;
            window.localStorage.setItem("user", user);
            url.forEach(function (item, index) {
                var card = "<option value='" + item.id + "'>" + item.nomeEndereco + "</option>";
                $("#end").append(card);
            });
        }
    });
}

function editar() {
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/enderecos/alterarendereco/" + user + "/" + $("#end > option:selected").val() + "/" + $("#nomeEnd").val() + "/" + $("#cep").val().replace(/\s/g, "") + "/" + $("#uf") + "/" + $("#cidade").val() + "/" + $("#bairro").val() + "/" + $("#rua").val() + "/" + $("#numero").val() + "/" + $("#complemento").val().replace(/\s/g, "") + "/" + $("#obs").val().replace(/\s/g, ""),
        type: "get",
        dataType: "json",
        success(url) {
            alert("Endereço atualizado com sucesso");
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
            document.querySelector("input[name=complemento]").value = url.complemento.trim();
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