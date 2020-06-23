var ativar = document.getElementById("ativar");

ativar.addEventListener("submit", function (e) {
    var obj = new FormData(ativar);

    var email = JSON.stringify(obj.get("email"));
    var cpf = JSON.stringify(obj.get("cpf"));

    e.preventDefault();
});

function ativarUsuario() {
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/usuarios/ativar/" + $("#email").val() + "/" + $("#cpf").val().replace( /\D/g, ""),
        type: "GET",
        dataType: "json",
        error(url) {
            alert("Usuário ativado! Faça login para voltar a comprar.");
            window.location.replace("login-usuario.html");
        }
    });
}

function sair() {
    sessionStorage.clear();
    localStorage.clear();
}