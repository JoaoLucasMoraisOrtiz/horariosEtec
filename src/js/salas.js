let countSubjects = 1;
let obj = {};

/**
 * Método responsável por verificar se a matéria do id registrado existe no banco de dados
 * 
 * @param {string} inputPlace <- o id da caixa onde o usuário digitou o id da materia
 */
function verifyId(inputPlace) {

    id = document.getElementById(inputPlace).value;

    //requisição para o servidor verificando a existencia deste ID
    $.ajax({
        type: "POST",
        url: 'http://localhost:8000/salas',
        data: { "get": id },
        success: function (response) {

            confirm = response;
            /* window.alert(confirm);
            if (confirm) {
                window.alert('positiva');
            }else{
                window.alert('negativa');
            } */

            //caso a resposta seja negativa
            if (!confirm) {
                father = document.getElementById('subjects');
                count(1);
                var div = document.createElement('div');
                div.setAttribute('id', 'sub' + countSubjects);

                var name = document.createElement('input');
                name.setAttribute('id', 'sub' + countSubjects + 'Name');
                name.setAttribute('type', 'text');
                name.setAttribute('class', 'form-control');
                name.setAttribute('value', '');
                name.setAttribute('placeholder', 'nome da matéria: PROGRAMAÇÃO WEB I')

                var nick = document.createElement('input');
                nick.setAttribute('id', 'sub' + countSubjects + 'Nick');
                nick.setAttribute('type', 'text');
                nick.setAttribute('class', 'form-control');
                nick.setAttribute('value', '');
                nick.setAttribute('placeholder', 'apelido da matéria: PWI')

                /* var classroom = document.createElement('input');
                classroom.setAttribute('id', 'sub' + countSubjects + 'Clroom');
                classroom.setAttribute('type', 'text');
                classroom.setAttribute('class', 'form-control');
                classroom.setAttribute('value', '');
                classroom.setAttribute('placeholder', 'sala que será atribuída: INFORMATICA PARA INTERNET')

                var clroomNick = document.createElement('input');
                clroomNick.setAttribute('id', 'sub' + countSubjects + 'ClroomNick');
                clroomNick.setAttribute('type', 'text');
                clroomNick.setAttribute('class', 'form-control');
                clroomNick.setAttribute('value', '');
                clroomNick.setAttribute('placeholder', 'apelido da sala: EMIA') 

                var year = document.createElement('input');
                year.setAttribute('id', 'sub' + countSubjects + 'Year');
                year.setAttribute('type', 'number');
                year.setAttribute('class', 'form-control');
                year.setAttribute('value', '');
                year.setAttribute('min', '1');
                year.setAttribute('max', '3');
                year.setAttribute('oninput', 'validity.valid ? this.save = value : value = this.save;')
                year.setAttribute('placeholder', 'ano letivo: 1 ou 2 ou 3');*/

                var numberClass = document.createElement('input');
                numberClass.setAttribute('id', 'sub' + countSubjects + 'NumberClass');
                numberClass.setAttribute('type', 'number');
                numberClass.setAttribute('class', 'form-control');
                numberClass.setAttribute('value', '');
                numberClass.setAttribute('min', '1');
                numberClass.setAttribute('placeholder', 'número de aulas: 4');
                numberClass.setAttribute('oninput', 'validity.valid ? this.save = value : value = this.save;')

                /* var period = document.createElement('input');
                period.setAttribute('id', 'sub' + countSubjects + 'ClroomPeriod');
                period.setAttribute('type', 'text');
                period.setAttribute('class', 'form-control');
                period.setAttribute('value', '');
                period.setAttribute('placeholder', 'período: integral ou manhã ...'); */

                var p = document.createElement('hr');

                var btn = document.createElement('button');
                btn.setAttribute('onclick', 'getClass()');
                btn.setAttribute('class', 'btn btn-success');
                btn.textContent = 'salvar';

                div.appendChild(name);
                div.appendChild(nick);

                div.appendChild(numberClass);
                div.appendChild(p);
                div.appendChild(btn);
                father.appendChild(div);

            } else {
                window.alert('há esta matéria ja cadastrada!');
            }

        },
        error: function (response) {
            window.alert('Perdão, tivemos um Erro... Recarregue a página e tente novamente')
        }
    });

}

function getClass() {
    var name = document.getElementById('sub' + countSubjects + 'Name');
    var nick = document.getElementById('sub' + countSubjects + 'Nick');
    var classroom = document.getElementById('nCName');
    var clroomNick = document.getElementById('nCNick');
    var year = document.getElementById('year');
    var numberClass = document.getElementById('sub' + countSubjects + 'NumberClass');
    var period = document.getElementById('period');

    obj[countSubjects] = {
        'name': name.value,
        'nick': nick.value,
        'classroom': classroom.value,
        'clroomNick': clroomNick.value,
        'year': year.value,
        'numberClass': numberClass.value,
        'period': period.value
    }

    const e = document.getElementById('sub'+countSubjects);

    // remove the last list item
    e.remove();

    father = document.getElementById('codeClass');

    var div1 = document.createElement('div');
    div1.setAttribute('class', 'row');
    div1.setAttribute('id', countSubjects)
    
    var div2 = document.createElement('div');
    div2.setAttribute('class', 'col-6')

    var div3 = document.createElement('div');
    div3.setAttribute('class', 'row');

    var div4 = document.createElement('div');
    div4.setAttribute('class', 'col-4');
    div4.textContent = obj[countSubjects].nick
    div4.setAttribute('style', 'overflow: hidden;text-overflow: ellipsis;')

    var div4sister = document.createElement('div');
    div4sister.setAttribute('class', 'col-4')
    var div4brother = document.createElement('div');
    div4brother.setAttribute('class', 'col-4')

    var btn = document.createElement('button');
    btn.setAttribute('onclick', 'remove('+countSubjects+')')
    btn.setAttribute('class', 'btn btn-danger');
    btn.textContent = 'excluir'

    space = document.createElement('hr');

    div4brother.appendChild(btn);

    div3.appendChild(div4);
    div3.appendChild(div4sister);
    div3.appendChild(div4brother);

    div2.appendChild(div3);
    div1.appendChild(div2);
    father.appendChild(div1);
    father.appendChild(space);

    countSubjects = countSubjects + 1;


    /* window.alert(name + ' / ' + nick + ' / ' + classroom + ' / ' + clroomNick + ' / ' + year + ' / ' + numberClass + ' / ' + period) */

}

function sendRoom() {
    $.ajax({
        type: "POST",
        url: 'http://localhost:8000/salas',
        data: { "newClass": obj },
        success: function (response) {

            confirm = response;
            window.alert(confirm + '\n' + obj);
        },
        error: function (response) {
            window.alert('Perdão, tivemos um Erro... Recarregue a página e tente novamente')
        }
    });
}

function remove(id) {
    delete obj[id];
    const e = document.getElementById(id);

    // remove the last list item
    e.remove();
}
function count(value) {
    return countSubjects
}