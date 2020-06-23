$(document).ready(function () {
    var user = window.localStorage.getItem("user");
    if (user != null) {
        $("#btn-entrar").hide();
        $("#btn-cadastro").hide();
    } else {
        $("#btn-sair").hide();
        $("#btn-perfil").hide();
    }
});

function busca() {
    window.localStorage.setItem("Nome_Busca", $("#busca").val());
    window.location.href = "index.html";
}