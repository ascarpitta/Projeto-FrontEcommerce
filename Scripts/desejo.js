var user;
var desejo1, desejo2, desejo3, desejo4, desejo5, desejo6, desejo7, desejo8, desejo9, desejo10,
    desejo11, desejo12, desejo13, desejo14, desejo15, desejo16, desejo17, desejo18, desejo19,
    desejo20, desejo21, desejo22, desejo23, desejo24, desejo25, desejo26, desejo27, desejo28,
    desejo29, desejo30, desejo40, desejo41, desejo42, desejo43, desejo44, desejo45, desejo46,
    desejo47, desejo48, desejo49, desejo50, desejo51, desejo52, desejo53, desejo54, desejo55,
    desejo56, desejo57, desejo58, desejo59, desejo60;
function usuario(); {
    desejo1 = window.localStorage.getItem('desejo1');
    desejo2 = window.localStorage.getItem('desejo2');
    desejo3 = window.localStorage.getItem('desejo3');
    desejo4 = window.localStorage.getItem('desejo4');
    desejo5 = window.localStorage.getItem('desejo5');
    desejo6 = window.localStorage.getItem('desejo6');
    desejo7 = window.localStorage.getItem('desejo7');
    desejo8 = window.localStorage.getItem('desejo8');
    desejo9 = window.localStorage.getItem('desejo9');
    desejo10 = window.localStorage.getItem('desejo10');
    desejo11 = window.localStorage.getItem('desejo11');
    desejo12 = window.localStorage.getItem('desejo12');
    desejo13 = window.localStorage.getItem('desejo13');
    desejo14 = window.localStorage.getItem('desejo14');
    desejo15 = window.localStorage.getItem('desejo15');
    desejo16 = window.localStorage.getItem('desejo16');
    desejo17 = window.localStorage.getItem('desejo17');
    desejo18 = window.localStorage.getItem('desejo18');
    desejo19 = window.localStorage.getItem('desejo19');
    desejo20 = window.localStorage.getItem('desejo20');
    desejo21 = window.localStorage.getItem('desejo22');
    desejo22 = window.localStorage.getItem('desejo23');
    desejo23 = window.localStorage.getItem('desejo24');
    desejo22 = window.localStorage.getItem('desejo25');
    desejo23 = window.localStorage.getItem('desejo26');
    desejo22 = window.localStorage.getItem('desejo27');
    desejo23 = window.localStorage.getItem('desejo28');
    desejo22 = window.localStorage.getItem('desejo29');
    desejo22 = window.localStorage.getItem('desejo30');
    desejo22 = window.localStorage.getItem('desejo31');
    desejo22 = window.localStorage.getItem('desejo32');
    desejo22 = window.localStorage.getItem('desejo33');
    desejo22 = window.localStorage.getItem('desejo34');
    desejo23 = window.localStorage.getItem('desejo35');
    desejo23 = window.localStorage.getItem('desejo36');
    desejo23 = window.localStorage.getItem('desejo37');
    desejo23 = window.localStorage.getItem('desejo38');
    desejo23 = window.localStorage.getItem('desejo39');
    desejo23 = window.localStorage.getItem('desejo40');
    user = window.localStorage.getItem('user');
    console.log("id fora da função: ", user);
}

function desejo() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/ListaDesejo/' + user,
        type: 'GET',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            document.getElementById("produto").parentElement.parentElement.style.display = "none";
            for (i = 2; i <= 40; i++) {
                document.getElementById("produto" + i).parentElement.parentElement.style.display = "none";
            }

            url.forEach(function (item, i) {
                if (i == 0) {
                    document.getElementById("produto").innerHTML = item.nameProduto;
                    window.localStorage.setItem("desejo" + (i + 1).toString(), item.idProduto);
                    document.getElementById("produto").parentElement.parentElement.style.display = "";
                } else {
                    document.getElementById("produto" + (i + 1).toString()).innerHTML = item.nameProduto;
                    window.localStorage.setItem("desejo" + (i + 1).toString(), item.idProduto);
                    document.getElementById("produto" + (i + 1).toString()).parentElement.parentElement.style.display = "";
                }
            });
        },
        error: function (url) {
            alert('Erro ao carregar produtos');
        }
    });
}


function remover() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo1,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover2() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo2,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover3() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo3,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover4() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo4,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover5() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo5,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover6() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo6,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover7() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo7,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover8() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo8,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover9() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo9,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover10() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo10,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover11() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo11,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover12() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo12,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover13() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo13,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover14() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo14,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover15() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo15,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover16() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo16,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover17() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo17,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover18() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo18,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover19() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo19,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover20() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo20,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover21() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo21,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover22() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo22,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover23() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo23,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover24() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo24,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover25() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo25,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover26() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo26,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover27() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo27,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover28() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo28,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover29() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo29,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover30() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo30,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover31() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo31,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover32() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo32,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover33() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo33,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover34() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo34,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover35() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo35,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover36() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo36,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover37() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo37,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover38() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo38,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover39() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo39,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover40() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo40,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover41() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo41,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover42() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo42,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover43() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo43,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover44() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo44,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover45() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo45,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover46() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo46,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover47() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo47,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover48() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo48,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover49() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo49,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover50() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo50,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover51() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo51,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover52() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo52,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover53() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo53,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover54() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo54,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover55() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo55,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover56() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo56,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover57() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo57,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover58() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo58,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover59() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo59,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}
function remover60() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/usuarios/RemoverListaDesejo/' + user + '/' + desejo60,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            
        }
    });
}

function addCarrinho() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + desejo1,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho2() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + desejo2,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho3() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto3,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho4() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto4,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho5() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto5,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho6() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto6,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho7() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto7,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho8() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto8,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho9() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto9,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho10() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto10,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho11() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto11,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho12() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto12,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho13() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto13,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho14() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto14,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho15() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto15,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho16() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto16,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho17() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto17,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho18() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto18,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho19() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto19,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho20() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto20,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho21() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto20,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho22() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto21,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho23() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto22,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho24() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto23,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho25() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto24,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho26() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto25,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho27() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto26,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho28() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto27,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho29() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto28,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho30() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto29,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho31() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto30,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho32() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto31,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho33() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto32,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho34() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto33,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho35() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto34,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho36() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto35,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho37() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto36,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho38() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto37,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho39() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto38,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho40() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto39,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho41() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto40,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho42() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto41,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho43() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto42,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho44() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto43,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho45() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto44,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho46() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto45,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho47() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto47,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho48() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto47,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho49() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto48,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho50() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto49,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho51() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto50,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho52() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto51,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho53() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto52,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho54() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto53,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho55() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto54,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho56() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto55,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho57() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto56,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho58() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto57,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho59() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto58,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}
function addCarrinho60() {
    usuario();
    $.ajax({
        url: 'https://projeto-ecommerce.herokuapp.com/api/carrinho/addProduto/' + user + '/' + idProduto59,
        type: 'get',
        dataType: 'json',
        success: function (url) {
            console.log(url);
            id = url.id;
            user = id;
            usuario();
            window.localStorage.setItem("user", user);
        },
        error: function (url) {
            alert('Erro ao adicionar no carrinho');
        }
    });
}


function sair() {
    sessionStorage.clear();
    localStorage.clear();
}