var formulario = document.getElementById("formulario");
var user = window.localStorage.getItem("user");

formulario.addEventListener("submit", function (e) {
    var obj = new FormData(formulario);
    console.debug(obj);

    var email = JSON.stringify(obj.get("email"));
    var password = JSON.stringify(obj.get("password"));
    console.info({ email, password });

    e.preventDefault();
});

function teste() {
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/usuarios/" + $("#email").val() + "/" + $("#password").val(),
        type: "GET",
        dataType: "json",   
        success(url) {
            alert("Login realizado com sucesso");
            var id = url.id;
            user = id;
            window.localStorage.setItem("user", user);
            window.location.href = "index.html";
        },
        error(url) {
            alert("Erro ao realizar login");
        }
    });
}

function sair() {
    sessionStorage.clear();
    localStorage.clear();
}