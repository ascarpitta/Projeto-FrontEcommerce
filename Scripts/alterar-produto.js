var user;
var produto;
var altproduto = document.querySelector('#altproduto')

altproduto.addEventListener('submit', function (e) {

    var obj = new FormData(altproduto);
    console.debug(obj)

    var prod = JSON.stringify(obj.get('prod'));
    var nome = JSON.stringify(obj.get('nome'));
    var marca = JSON.stringify(obj.get('marca'));
    var categoria = JSON.stringify(obj.get('categoria'));
    var descricao = JSON.stringify(obj.get('descricao'));
    var preco = JSON.stringify(obj.get('preco'));
    var quantidade = JSON.stringify(obj.get('quantidade'));
    var frete = JSON.stringify(obj.get('frete'));

    console.debug({ prod, nome, marca, categoria, descricao, preco, quantidade, frete })

    e.preventDefault();
    console.debug('Ocorreu um click')
})

function usuario() {
    user = window.localStorage.getItem('user');
    console.log("id fora da função: ", user)
    console.log("Produto fora da função: ", produto)
}

function produto() {
    usuario()
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/produtos/usuario/5e8cfff8d7067e80b084664d',
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);

            console.log("antes",produto);
            url.forEach(function (val, index) {
                document.getElementById("prod1").innerHTML = url[0].name;
                document.getElementById("prod2").innerHTML = url[1].name;
                document.getElementById("prod3").innerHTML = url[2].name;
                document.getElementById("prod4").innerHTML = url[3].name;
                document.getElementById("prod5").innerHTML = url[4].name;
                document.getElementById("prod6").innerHTML = url[5].name;
                document.getElementById("prod7").innerHTML = url[6].name;
                document.getElementById("prod8").innerHTML = url[7].name;
                document.getElementById("prod9").innerHTML = url[8].name;
                document.getElementById("prod10").innerHTML = url[9].name;
                document.getElementById("prod11").innerHTML = url[10].name;
                document.getElementById("prod12").innerHTML = url[11].name;
                document.getElementById("prod13").innerHTML = url[12].name;
                document.getElementById("prod14").innerHTML = url[13].name;
                document.getElementById("prod15").innerHTML = url[14].name;
                document.getElementById("prod16").innerHTML = url[15].name;
                document.getElementById("prod17").innerHTML = url[16].name;
                document.getElementById("prod18").innerHTML = url[17].name;
                document.getElementById("prod19").innerHTML = url[18].name;
                document.getElementById("prod20").innerHTML = url[19].name;
                document.getElementById("prod21").innerHTML = url[20].name;
                document.getElementById("prod22").innerHTML = url[21].name;
                document.getElementById("prod23").innerHTML = url[22].name;
                document.getElementById("prod24").innerHTML = url[23].name;
                document.getElementById("prod25").innerHTML = url[24].name;
                document.getElementById("prod26").innerHTML = url[25].name;
                document.getElementById("prod27").innerHTML = url[26].name;
                document.getElementById("prod28").innerHTML = url[27].name;
                document.getElementById("prod29").innerHTML = url[28].name;
                document.getElementById("prod30").innerHTML = url[29].name;
                document.getElementById("prod31").innerHTML = url[30].name;
                document.getElementById("prod32").innerHTML = url[31].name;
                document.getElementById("prod33").innerHTML = url[32].name;
                document.getElementById("prod34").innerHTML = url[33].name;
                document.getElementById("prod35").innerHTML = url[34].name;
                document.getElementById("prod36").innerHTML = url[35].name;
                document.getElementById("prod37").innerHTML = url[36].name;
                document.getElementById("prod38").innerHTML = url[37].name;
                document.getElementById("prod39").innerHTML = url[38].name;
                document.getElementById("prod40").innerHTML = url[39].name;
                document.getElementById("prod41").innerHTML = url[40].name;
                document.getElementById("prod42").innerHTML = url[41].name;
                document.getElementById("prod43").innerHTML = url[42].name;
                document.getElementById("prod44").innerHTML = url[43].name;
                document.getElementById("prod45").innerHTML = url[44].name;
                document.getElementById("prod46").innerHTML = url[45].name;
                document.getElementById("prod47").innerHTML = url[46].name;
                document.getElementById("prod48").innerHTML = url[47].name;
                document.getElementById("prod49").innerHTML = url[48].name;
                document.getElementById("prod50").innerHTML = url[49].name;

                window.localStorage.setItem("produto", produto);
            })
            console.log("depois", produto);
        }
    });
} 

function altProduto() {
    usuario()
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/produtos/alterarProduto/' + user + '/' + $('#prod').val() + '/' + $('#nome').val() + '/' + $('#descricao').val() + '/' + $('#preco').val() + '/' + $('#frete').val() + '/' + $('#quantidade').val() + '/' + $('#categoria').val() + '/' + $('#marca').val(),
        type: 'get',
        //data: { nome: $('#nome').val(), marca: $('#marca').val(), categoria: $('#categoria').val(), descricao: $('#descricao').val(), preco: $('#preco').val(), quantidade: $('#quantidade').val()},
        dataType: 'json',
        success: function (url) {
            console.log(url);
            alert('Produto alterado com sucesso')
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        }
    });
}

function sair() {
    sessionStorage.clear()
    localStorage.clear()
}