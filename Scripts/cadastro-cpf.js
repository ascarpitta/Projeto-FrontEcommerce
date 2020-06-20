var cadcpf = document.getElementById("cadcpf");

cadcpf.addEventListener("submit", function (e) {

    var obj = new FormData(cadcpf);
    console.debug(obj);

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
        }
    });
}

function sair() {
    sessionStorage.clear();
    localStorage.clear();
}