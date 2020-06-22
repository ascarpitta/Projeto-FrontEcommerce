$(document).ready(function () {
    var user = window.localStorage.getItem("user");
    if (user.length > 0) {
        $("#btn-entrar").hide();
    } else {
        $("#btn-sair").hide();
    }
});

function busca() {
    window.localStorage.setItem("Nome_Busca", $("#busca").val());
    window.location.href = "index.html";
}