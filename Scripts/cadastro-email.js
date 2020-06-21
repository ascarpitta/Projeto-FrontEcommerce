var cademail = document.getElementById("cademail");
var storageEmail = window.localStorage.getItem("storageEmail");

cademail.addEventListener("submit", function (e) {

    var obj = new FormData(cademail);
    var email = JSON.stringify(obj.get("email"));

    e.preventDefault();
});

function verificaremail() {
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/usuarios/email/" + $("#email").val(),
        type: "GET",
        dataType: "json",
        success(url) {
            alert("E-mail já cadastrado");
        },
        error(url) {
            alert("Email pode prosseguir com sucesso");
            storageEmail = $("#email").val();
            window.localStorage.setItem("storageEmail", storageEmail);
        }
    });
}

function sair() {
    sessionStorage.clear();
    localStorage.clear();
}