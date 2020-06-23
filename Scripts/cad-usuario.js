var cadusuario = document.getElementById("cadusuario");
var storageCpf = window.localStorage.getItem("storageCpf");
var storageEmail = window.localStorage.getItem("storageEmail");

cadusuario.addEventListener("submit", function (e) {
    var obj = new FormData(cadusuario);

    var nome = JSON.stringify(obj.get("nome"));
    var cpf = JSON.stringify(obj.get("cpf"));
    var email = JSON.stringify(obj.get("email"));
    var password = JSON.stringify(obj.get("password"));

    e.preventDefault();
});

function preencher() {
    if (storageCpf.length >= 2) {
        $("input[name=cpf]").prop("disabled", true);
    }

    if (storageEmail.length >= 2) {
        $("input[name=email]").prop("disabled", true);
    }
      document.querySelector("input[name=cpf]").value = storageCpf;
      document.querySelector("input[name=email]").value = storageEmail;
}

function teste() {
    var validar = false;
    var nome = document.querySelector("#nome");
    var cpf = document.querySelector("#cpf");
    var password = document.querySelector("#password");
    var senha2 = document.querySelector("#senha2");
    var email = document.querySelector("#email");
    var condicoes = document.querySelector("#condicoes");

    if (nome.value === "" || nome.value === null || nome.lenght < 3) {
        validar = true;
        alert("Por favor, indique o seu nome.");
        return false;
    }
    if (cpf.value === "" || cpf.value === null || cpf.value < 6) {
        validar = true;
        alert("Por favor, indique um cpf válido.");
        return false;
    }
    if (password.value === "" || password.value === null || password.lenght < 6) {
        validar = true;
        alert("Por favor, indique uma senha válida.");
        return false;
    } if (senha2.value === "" || senha2.value === null || senha2.lenght < 6) {
        validar = true;
        alert("Por favor, indique uma senha válida.");
        return false;
    }
    if (email.value.indexOf("@") === -1 ||
        email.value === "" ||
        email.value === null) {
        validar = true;
        alert("Por favor, indique um e-mail válido.");
        email.focus();
        return false;
    }
    if (password.value !== senha2.value) {
        validar = true;
        alert("As senhas não coincidem, por favor verifique");
        return false;
    }
    if (!condicoes.checked) {
        validar = true;
        alert("Concorde com os termos para continuar");
        return false;
    }

    if (validar) {
        alert("Erro ao realizar cadastrado");
    }

    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/usuarios/cadastroUsuario/" + $("#email").val() + "/" + $("#cpf").val() + "/" + $("#nome").val() + "/" + $("#senha2").val(),
        type: "GET",
        dataType: "json",
        error(url) {
            
            alert("Cadastro realizado");
            window.location.href = "login-usuario.html";
        }
    });
}

function sair() {
    sessionStorage.clear();
    localStorage.clear();
}