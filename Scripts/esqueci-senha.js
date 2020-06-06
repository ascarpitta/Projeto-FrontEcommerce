var senha = document.getElementById("senha");

senha.addEventListener("submit", function (e) {
    var obj = new FormData(senha);
    console.debug(obj);

    var email = JSON.stringify(obj.get("email"));
    var cpf = JSON.stringify(obj.get("cpf"));
    console.info({ email, cpf });

    e.preventDefault();
    console.debug("Ocorreu um click");
});

function teste() {
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/usuarios/recuperacao/" + $("#email").val() + "/" + $("#cpf").val(),
        type: "GET",
        dataType: "json",
        success(url) {
            console.log(url);
            alert("E-mail enviado com sucesso");
        }
    });
}

function sair() {
    sessionStorage.clear();
    localStorage.clear();
}