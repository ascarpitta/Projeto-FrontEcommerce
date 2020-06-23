var senha = document.getElementById("senha");

senha.addEventListener("submit", function (e) {
    var obj = new FormData(senha);

    var email = JSON.stringify(obj.get("email"));
    var cpf = JSON.stringify(obj.get("cpf"));

    e.preventDefault();
});

function teste() {
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/usuarios/recuperacao/" + $("#email").val() + "/" + $("#cpf").val().replace( /\D/g, ""),
        type: "GET",
        dataType: "json",
        error(url) {
            alert("E-mail para recuperação enviado com sucesso");
            window.location.replace("login-usuario.html");
        }
    });
}

function sair() {
    sessionStorage.clear();
    localStorage.clear();
}