var ativar = document.getElementById("ativar");

ativar.addEventListener("submit", function (e) {
    var obj = new FormData(ativar);

    var email = JSON.stringify(obj.get("email"));
    var cpf = JSON.stringify(obj.get("cpf"));

    e.preventDefault();
});

function ativar() {
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/usuarios/ativar/" + $("#email").val() + "/" + $("#cpf").val(),
        type: "GET",
        dataType: "json",
        success(url) {
            alert("Usuário ativo");
        }
    });
}

function sair() {
    sessionStorage.clear();
    localStorage.clear();
}