var user;
var conteudo = document.querySelector('#conteudo')
var consulta = document.querySelector('#consulta')

function usuario() {
    user = window.localStorage.getItem('user');
    console.log("id fora da função: ", user)
}

function perfil() {
    usuario()
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/id/' + user,
        type: 'GET',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);

            nome = url.name;
            email = url.email;
            cpf = url.cpf; 
            console.log(nome, email, cpf);
            document.getElementById("detalhes").innerHTML = nome;
            document.getElementById("detalhes2").innerHTML = email;
            document.getElementById("detalhes3").innerHTML = cpf;
        },
        error: function (url) {
            alert('É necessário realizar o login')
        }
    });
}

function consend() {
    usuario()
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/enderecos/' + user,
        type: 'GET',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            var consEnd = "";
            url.forEach(function (item, i) {
                consEnd = '<div class="mt-1">Nome:' +
                    '<span id="consulta">' + item.nomeEndereco + '</span> - CEP' +
                    '<span id="consulta1">' + item.cep + '</span> -' +
                    '<span id="consulta2">' + item.rua + '</span> nº' +
                    '<span id="consulta3">' + item.numero + '</span> -' +
                    '<span id="consulta4">' + item.uf + '</span>' +
                    '</div>' +
                    '<hr />';
                $("#lista_end").append(consEnd);
            })
        }
    });
}

function pedidos() {
    usuario()
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/pedidos/' + user,
        type: 'GET',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            var consEnd = "";
            url.forEach(function (item, i) {
                consEnd = '<div class="mt-1">Nome:' +
                    '<span id="consulta">' + item.nomeEndereco + '</span> - CEP' +
                    '<span id="consulta1">' + item.cep + '</span> -' +
                    '<span id="consulta2">' + item.rua + '</span> nº' +
                    '<span id="consulta3">' + item.numero + '</span> -' +
                    '<span id="consulta4">' + item.uf + '</span>' +
                    '</div>' +
                    '<hr />';
                $("#lista_pedidos").append(consEnd);
            })
        }
    });
}

function ativar() {
    usuario()
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/ativar/' + user,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            alert('Usuário ativo')
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        }
    });
}

function desativar() {
    usuario()
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/desativar/' + user,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            alert('Usuário desativado')
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
            sessionStorage.clear()
            localStorage.clear()
        }
    });
}

function sair() {
    sessionStorage.clear()
    localStorage.clear()
}