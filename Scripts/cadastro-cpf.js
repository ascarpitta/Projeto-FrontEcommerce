var cadcpf = document.getElementById("cadcpf");
var storageCpf = window.localStorage.getItem("storageCpf");

cadcpf.addEventListener("submit", function (e) {

    var obj = new FormData(cadcpf);
    var cpf = JSON.stringify(obj.get("cpf"));

    e.preventDefault();
});

function verificarcpf() {
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/usuarios/cpf/" + $("#cpf").val(),
        type: "GET",
        dataType: "json",
        success(url) {
            alert("Cpf já cadastrado");

        },
        error(url) {
            alert("Cpf pode prosseguir");
            storageCpf = $("#cpf").val();
            window.localStorage.setItem("storageCpf", storageCpf);
        }
    });
}

function sair() {
    sessionStorage.clear();
    localStorage.clear();
}