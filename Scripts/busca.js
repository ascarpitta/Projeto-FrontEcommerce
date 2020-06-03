function busca() {
    window.localStorage.setItem("Nome_Busca", $("#busca").val());
    window.location.href = "index.html";
}