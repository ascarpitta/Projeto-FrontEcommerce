var altendereco = document.getElementById("altendereco");
var endereco;
var user;

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

    console.debug({ end, nomeEnd, uf, cidade, cep, bairro, rua, numero, complemento, obs });

    e.preventDefault();
    console.debug("Ocorreu um click");
});

function usuario() {
    endereco = window.localStorage.getItem("endereco");
    console.log("endereço fora da função: ", endereco);
    user = window.localStorage.getItem("user");
    console.log("id fora da função: ", user);
}

function endereco() {
    usuario();
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/enderecos/" + user,
        type: "get",
        dataType: "json",
        success(url) {
            console.log(url);
            help = url[0].id;
            endereco = help;
            window.localStorage.setItem("endereco", endereco);

            url.forEach(function (val, index) {
                document.getElementById("end1").innerHTML = url[0].nomeEndereco;
                document.getElementById("end2").innerHTML = url[1].nomeEndereco;
                document.getElementById("end3").innerHTML = url[2].nomeEndereco;
                document.getElementById("end4").innerHTML = url[3].nomeEndereco;
                document.getElementById("end5").innerHTML = url[4].nomeEndereco;
                document.getElementById("end6").innerHTML = url[5].nomeEndereco;
                document.getElementById("end7").innerHTML = url[6].nomeEndereco;
                document.getElementById("end8").innerHTML = url[7].nomeEndereco;
                document.getElementById("end9").innerHTML = url[8].nomeEndereco;
                document.getElementById("end10").innerHTML = url[9].nomeEndereco;
                document.getElementById("end11").innerHTML = url[10].nomeEndereco;
                document.getElementById("end12").innerHTML = url[11].nomeEndereco;
            })
        }
    });
}

function editar() {
    usuario();
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/enderecos/alterarendereco/" + user + "/" + $("#end").val().replace(/\s/g, "") + "/" + $("#nomeEnd").val().replace(/\s/g, "") + "/" + $("#cep").val().replace(/\s/g, "") + "/" + $("#uf").val().replace(/\s/g, "") + "/" + $("#cidade").val().replace(/\s/g, "") + "/" + $("#bairro").val().replace(/\s/g, "") + "/" + $("#rua").val().replace(/\s/g, "") + "/" + $("#numero").val().replace(/\s/g, "") + "/" + $("#complemento").val().replace(/\s/g, "") + "/" + $("#obs").val().replace(/\s/g, ""),
        type: "get",
        dataType: "json",
        success(url) {
            console.log(url);
            alert("Endereço atualizado com sucesso");
            id = url.id;
            user = id;
            usuario();
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
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
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