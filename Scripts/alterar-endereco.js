var altendereco = document.getElementById("altendereco");
var user = window.localStorage.getItem("user");
let urlGlobal;

altendereco.addEventListener("submit", function (e) {

    var obj = new FormData(altendereco);
    var end = JSON.stringify(obj.get("end"));
    var nomeEnd = JSON.stringify(obj.get("nomeEnd"));
    var uf = JSON.stringify(obj.get("uf"));
    var cidade = JSON.stringify(obj.get("cidade"));
    var cep = JSON.stringify(obj.get("cep"));
    var bairro = JSON.stringify(obj.get("bairro"));
    var rua = JSON.stringify(obj.get("rua"));
    var numero = JSON.stringify(obj.get("numero"));
    var complemento = JSON.stringify(obj.get("complemento"));

    e.preventDefault();
});

function ender(){
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/enderecos/" + user,
        type: "get",
        dataType: "json",
        success(url) {
            urlGlobal = url;
            url.forEach(function (item, index) {
                var card = "<option value='" + item.id + "'>" + item.nomeEndereco + "</option>";
                $("#end").append(card);
                if (item.id == $("#end > option:selected").val()) {
                    document.querySelector("input[name=nomeEnd]").value = item.nomeEndereco;
                    document.querySelector("input[name=uf]").value = item.uf;
                    document.querySelector("input[name=cidade]").value = item.cidade;
                    document.querySelector("input[name=cep]").value = item.cep;
                    document.querySelector("input[name=bairro]").value = item.bairro;
                    document.querySelector("input[name=rua]").value = item.rua;
                    document.querySelector("input[name=numero]").value = item.numero;
                    document.querySelector("input[name=complemento]").value = item.complemento;
                }
            });
        }
    });
}

$("#end ").change(function () {
    urlGlobal.forEach(function (item, index) {
        if (item.id == $("#end > option:selected").val()) {
            document.querySelector("input[name=nomeEnd]").value = item.nomeEndereco;
            document.querySelector("input[name=uf]").value = item.uf;
            document.querySelector("input[name=cidade]").value = item.cidade;
            document.querySelector("input[name=cep]").value = item.cep;
            document.querySelector("input[name=bairro]").value = item.bairro;
            document.querySelector("input[name=rua]").value = item.rua;
            document.querySelector("input[name=numero]").value = item.numero;
            document.querySelector("input[name=complemento]").value = item.complemento;
        }
    });
})

function editar() {
    var complemento = "";

    if ($("#complemento").val().replace(/\s/g, "") != "") {
        complemento = "/" + $("#complemento").val().replace(/\s/g, "");
    }

    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/enderecos/alterarendereco/" + $("#end > option:selected").val() + "/" + $("#nomeEnd").val() + "/" + $("#cep").val().replace(/\s/g, "") + "/" + $("#uf").val() + "/" + $("#cidade").val() + "/" + $("#bairro").val() + "/" + $("#rua").val() + "/" + $("#numero").val() + complemento,
        type: "get",
        dataType: "json",
        error(url) {
            alert("Endereço atualizado com sucesso");
            window.location.href = "perfil-usuario.html";
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