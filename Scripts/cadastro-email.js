var cademail = document.getElementById('cademail');

cademail.addEventListener('submit', function (e) {

    var obj = new FormData(cademail);
    console.debug(obj);

    var email = JSON.stringify(obj.get('email'));
    console.debug({ email });

    e.preventDefault();
    console.debug('Ocorreu um click');
})

function verificaremail() {
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/email/' + $('#email').val(),
        type: 'GET',
        dataType: 'json',
        success(url) {
            console.log(url);
            alert('E-mail já cadastrado');
        },
        error(url) {
            alert('Email pode prosseguir com sucesso');
        }
    });
}

function sair() {
    sessionStorage.clear();
    localStorage.clear();
}