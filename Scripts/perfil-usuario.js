var user = window.localStorage.getItem("user");

function perfil() {
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/usuarios/id/" + user,
        type: "GET",
        dataType: "json",
        success(url) {
            id = url.id;
            user = id;
            window.localStorage.setItem("user", user);

            var nome = url.name;
            var email = url.email;
            var cpf = url.cpf;
            document.getElementById("detalhes").innerHTML = nome;
            document.getElementById("detalhes2").innerHTML = email;
            document.getElementById("detalhes3").innerHTML = cpf;
        },
        error(url) {
            alert("É necessário realizar o login");
        }
    });
}

function consend() {
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/enderecos/" + user,
        type: "GET",
        dataType: "json",
        success(url) {
            var consEnd = "";
            url.forEach(function (item, i) {
                consEnd = "<div class='item'> " +
                    "<div class='buttons'>" +
                    "<span class='delete-btn cancelar'>X</span>" +
                    "</div>" +
                    "</div>" +
                    "<div class='mt-1'> Nome: " +
                    "<span id='consulta'>" + item.nomeEndereco + "</span> - CEP" +
                    "<span id='consulta1'>" + item.cep + "</span> -" +
                    "<span id='consulta2'>" + item.rua + "</span> nº" +
                    "<span id='consulta3'>" + item.numero + "</span> -" +
                    "<span id='consulta4'>" + item.uf + "</span>" +
                    "</div>" +
                    
                    "<hr />";
                $("#lista_end").append(consEnd);

                //Eventos para cada produto
                $(".cancelar").click(function () {
                    var idProduto = $(this).attr("id");
                    var user = window.localStorage.getItem("user");
                    if (user === null) {
                        alert("Você não está logado!");
                    } else {
                        $.ajax({
                            url: "https://projeto-ecommerce.herokuapp.com/api/Enderecos/ExcluirEndereco/" + user + "/" + item.id,
                            type: "get",
                            dataType: "json",
                            success(url) {
                                alert("Endereço Removido");
                                var id = url.id;
                                user = id;

                                window.localStorage.setItem("user", user);
                            }
                        });
                    }
                });
            });
        }
    });
}

function pedidos() {
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/pedidos/BuscarPedidos/" + user,
        type: "GET",
        dataType: "json",
        success(url) {
            var consEnd = "";
            url.forEach(function (item, i) {
                consEnd = "<div class='mt-1'>Nome:" +
                    "<span id='consulta'>" + item.nomeEndereco + "</span> - CEP" +
                    "<span id='consulta1'>" + item.cep + "</span> -" +
                    "<span id='consulta2'>" + item.rua + "</span> nº" +
                    "<span id='consulta3'>" + item.numero + "</span> -" +
                    "<span id='consulta4'>" + item.uf + "</span>" +
                    "</div>" +
                    "<hr />";
                $("#lista_pedidos").append(consEnd);
            });
        }
    });
}

function ativar() {
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/usuarios/ativar/" + user,
        type: "get",
        dataType: "json",
        success(url) {
            alert("Usuário ativo");
            id = url.id;
            user = id;
            window.localStorage.setItem("user", user);
        }
    });
}

function desativar() {
    $.ajax({
        url: "https://projeto-ecommerce.herokuapp.com/api/usuarios/desativar/" + user,
        type: "get",
        dataType: "json",
        success(url) {
            alert("Usuário desativado");
            id = url.id;
            user = id;
            window.localStorage.setItem("user", user);
            sessionStorage.clear();
            localStorage.clear();
        }
    });
}

function sair() {
    sessionStorage.clear();
    localStorage.clear();
}