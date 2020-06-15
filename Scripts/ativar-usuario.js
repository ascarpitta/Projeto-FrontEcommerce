var ativar = document.getElementById("ativar");

senha.addEventListener("submit", function (e) {
    var obj = new FormData(senha);

    var email = JSON.stringify(obj.get("email"));
    var cpf = JSON.stringify(obj.get("cpf"));
    console.info({ email, cpf });

    e.preventDefault();
});

function ativar() {
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/usuarios/ativar/" + $("#email").val() + "/" + $("#cpf").val(),
        type: "GET",
        dataType: "json",
        success(url) {
            alert("E-mail enviado com sucesso");
        }
    });
}

function sair() {
    sessionStorage.clear();
    localStorage.clear();
}