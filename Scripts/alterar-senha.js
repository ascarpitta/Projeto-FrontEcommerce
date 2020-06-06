var alterarsenha = document.getElementById("alterarsenha");
var user;

alterarsenha.addEventListener("submit", function (e) {
    var obj = new FormData(alterarsenha);
    console.debug(obj);

    var password = JSON.stringify(obj.get("password"));
    var senha2 = JSON.stringify(obj.get("senha2"));
    console.debug({ password, senha2 });

    e.preventDefault();
    console.debug("Ocorreu um click");
});

function usuario() {
    user = window.localStorage.getItem("user");
    console.log("id fora da função: ", user);
}

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
    usuario();
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/usuarios/" + user + "/" + $("#passwordAtual").val() + "/" + $("#password").val(),
        crossDomain: true,
        type: "get",
        dataType: "json",
        success(url) {
            alert("Senha alterada com sucesso");
        },
        error(url) {
            alert("Não foi possível alterar a senha");
        }
    });
}

function sair() {
    sessionStorage.clear();
    localStorage.clear();
}