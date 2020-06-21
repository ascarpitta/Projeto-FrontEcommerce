var alterarsenha = document.getElementById("alterarsenha");
var user = window.localStorage.getItem("user");

alterarsenha.addEventListener("submit", function (e) {
    var obj = new FormData(alterarsenha);

    var password = JSON.stringify(obj.get("password"));
    var senha2 = JSON.stringify(obj.get("senha2"));

    e.preventDefault();
    console.debug("Ocorreu um click");
});

function teste() {
    var validar = false;
    if (password.value === "" || password.value === null || password.lenght < 6) {
        validar = true;
        alert("Por favor, indique uma senha válida.");
        return false;
    }
    if (senha2.value === "" || senha2.value === null || senha2.lenght < 6) {
        validar = true;
        alert("Por favor, indique uma senha válida.");
        return false;
    }
    if (password.value !== senha2.value) {
        validar = true;
        alert("As senhas não coincidem, por favor verifique");
        return false;
    }
    if (validar) {
        alert("Erro ao validar senha");
    }
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/usuarios/alterarSenha/" + user + "/" + $("#passwordAtual").val() + "/" + $("#password").val(),
        crossDomain: true,
        type: "get",
        dataType: "json",
        success(url) {
            alert("Não foi possível alterar a senha");
        },
        error(url) {
            alert("Senha alterada com sucesso");
            window.location.replace("perfil-usuario.html");
        }
    });
}

function sair() {
    sessionStorage.clear();
    localStorage.clear();
}