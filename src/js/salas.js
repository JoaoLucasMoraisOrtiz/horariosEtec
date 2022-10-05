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

                //div que ira conter os campos para acrescentar as informaçoes da materia
                father = document.getElementById('subjects');
                count(1);
                var div = document.createElement('div');
                div.setAttribute('id', 'sub' + countSubjects);

                // input do nome da materia
                var name = document.createElement('input');
                name.setAttribute('id', 'sub' + countSubjects + 'Name');
                name.setAttribute('type', 'text');
                name.setAttribute('class', 'form-control');
                name.setAttribute('value', '');
                name.setAttribute('placeholder', 'nome da matéria: PROGRAMAÇÃO WEB I')

                //input do apelido da materia
                var nick = document.createElement('input');
                nick.setAttribute('id', 'sub' + countSubjects + 'Nick');
                nick.setAttribute('type', 'text');
                nick.setAttribute('class', 'form-control');
                nick.setAttribute('value', '');
                nick.setAttribute('placeholder', 'apelido da matéria: PWI')

                //input do numero de aulas desta materia
                var numberClass = document.createElement('input');
                numberClass.setAttribute('id', 'sub' + countSubjects + 'NumberClass');
                numberClass.setAttribute('type', 'number');
                numberClass.setAttribute('class', 'form-control');
                numberClass.setAttribute('value', '');
                numberClass.setAttribute('min', '1');
                numberClass.setAttribute('placeholder', 'número de aulas: 4');
                numberClass.setAttribute('oninput', 'validity.valid ? this.save = value : value = this.save;');

                //checkbox
                var radio = document.createElement('input');
                radio.setAttribute('id', 'sub' + countSubjects + 'Commun');
                radio.setAttribute('type', 'checkbox');
                radio.setAttribute('class', 'form-check-input');
                radio.setAttribute('value', 'true');

                //checkbox texto
                var radioText = document.createElement('label');
                radioText.setAttribute('for', 'sub' + countSubjects + 'Commun');
                radioText.innerText = ' Núcleo comum';

                //linha hr
                var p = document.createElement('hr');

                var br = document.createElement('br');

                //botão que adiciona a mateira dentro do dicionario de materias
                var btn = document.createElement('button');
                btn.setAttribute('onclick', 'getClass()');
                btn.setAttribute('class', 'btn btn-success');
                btn.textContent = 'salvar';

                //adicionando todo este conteúdo ao DOM
                div.appendChild(name);
                div.appendChild(nick);
                div.appendChild(numberClass);
                div.appendChild(p);
                div.appendChild(radio);
                div.appendChild(radioText);
                div.appendChild(br);
                div.appendChild(btn);
                father.appendChild(div);

            } else {
                //caso a matéria ja tiver sido cadastrada
                window.alert('há esta matéria ja cadastrada!');
            }

        },
        error: function (response) {
            //error do server
            window.alert('Perdão, tivemos um Erro... Recarregue a página e tente novamente')
        }
    });

}

/**
 * Método responsável por adcionar os valores digitados pelo usuário ao dicionário que será enviado a DB
 */
function getClass() {
    var name = document.getElementById('sub' + countSubjects + 'Name');
    var nick = document.getElementById('sub' + countSubjects + 'Nick');
    var classroom = document.getElementById('nCName');
    var clroomNick = document.getElementById('nCNick');
    var year = document.getElementById('year');
    var numberClass = document.getElementById('sub' + countSubjects + 'NumberClass');
    var period = document.getElementById('period');
    var commun = document.getElementById('sub' + countSubjects + 'Commun');
    var code = document.getElementById('sub1code');

    obj[countSubjects] = {
        'code': code.value,
        'name': name.value,
        'nick': nick.value,
        'classroom': classroom.value,
        'clroomNick': clroomNick.value,
        'year': year.value,
        'numberClass': numberClass.value,
        'period': period.value,
        'commun': commun.checked
    }

    const e = document.getElementById('sub' + countSubjects);

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
    btn.setAttribute('onclick', 'remove(' + countSubjects + ')')
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

/**
 * Método responsável por enviar a sala cadastrada com suas matérias para a DB
 */
function sendRoom() {
    $.ajax({
        type: "POST",
        url: 'http://localhost:8000/salas',
        data: { "newClass": obj },
        success: function (response) {

            r = response;
            if (r == 1) {
                $('#newClassModal').modal('hide');
                confirmation('a sala foi criada com sucesso', '', 'fechar')
            }
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

/**
 * escreve na tela um objeto
 * @param {object} obj 
 */
function dump(obj) {
    var out = '';

    //percorre o obj e adciona-o em *out*
    for (var i in obj) {
        out += obj[i] + "\n";
    }


    //escreve na tela os dumps do obj
    results = document.getElementById('querryResults');
    pre = document.createElement('pre');
    hr = document.createElement('hr');
    pre.innerHTML = out;
    /* results.innerHTML = ''; */
    results.appendChild(pre);
    results.appendChild(hr);
}

/**
 * Método responsável por trazer a querry na tela
 */
function openQuerry() {
    simple = document.getElementById('generalQuerry').value
    if (simple != 0) {
        /* obj = simple; */
        $.ajax({
            type: "POST",
            url: 'http://localhost:8000/salas',
            data: { "get": simple },
            success: function (response) {

                data = JSON.parse(response);
                if (simple == 'classroom') {
                    order(data, simple);
                };
                if (simple == 'commun') {
                    order(data, simple);
                }
                if (simple == 'course') {
                    order(data, simple);
                }

                /* for (let index = 0; index < data.length; index++) {
                    dump(data[index]);

                } */

                results = document.getElementById('querryResults');
                $('#querryField').modal('hide');
            },
            error: function (response) {
                window.alert('Perdão, tivemos um Erro... Recarregue a página e tente novamente')
            }
        });
    }
}

/**
 * método responsável por gerar o modal de confirmação de uma ação
 * 
 * @param {string} massage texto para o corpo do modal
 * @param {string} confirm texto para o botão de confirmar
 * @param {string} decline texto para o botão de cancelar
 */
function confirmation(massage, confirm = '', decline = '') {

    let decision;

    modal = document.getElementById('confirmation');
    modalMassage = document.getElementById('confirmationMassange');
    modalMassage.innerHTML = massage;

    //caso confirm
    if (!(confirm === '')) {
        btnConfirm = document.getElementById('acceptBtn');
        btnDecline = document.getElementById('declineBtn');

        btnConfirm.innerHTML = confirm;
        btnConfirm.setAttribute('data-dismiss', 'modal');

        btnDecline.setAttribute('style', 'visibility:hidden;');

    }

    //caso decline
    if (!(decline === '')) {
        btnConfirm = document.getElementById('acceptBtn');
        btnDecline = document.getElementById('declineBtn');

        btnDecline.innerHTML = decline;
        btnDecline.setAttribute('data-dismiss', 'modal');

        btnConfirm.setAttribute('style', 'visibility:hidden;');

    }

    $('#confirmation').modal();

}

/**
 * Método responsável por organizar as respostas das pesquisas simples, e imprimi-las na tela;
 * @param {object} obj uma array com a resposta da DB
 * @param {string} type o método de pesquisa que foi utilizado (pesquisa simples)
 */
function order(obj, type = 'classroom') {

    c = [];

    if (type == 'classroom') {

        end = [];

        //mapeia o array obj, e retorna os nomes de todas as classes
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                const element = obj[key];
                c.push([element['classe']+element['ano'], element]);
                //c.push([element['apelidoClasse'] + ', ano: ' + element['ano']]);
            }
        }
        c.sort();
        
        backup = 0;

        //mapeamos cada elemento de c,
        for (const key in c) {
            if (Object.hasOwnProperty.call(c, key)) {
                const element = c[key];
                n = parseFloat(key);

                //caso o backup não seja 0, ou seja, não é a primeira entrada:
                if (!(backup == 0)) {
                    //se a classe do elemento, e a classe do backup além do ano do elemento e o ano do backup são iguais:
                    if (element[1]['classe'] == backup['classe'] && element[1]['ano'] == backup['ano']) {

                        //verifica se o end já possuí algum elemento, ou se é a primeira entrada
                        if (end.length == 0) {
                            //se é a primeira entrada, adciona o titulo + matérias
                            end.push(['</select><select name=" ' + [element[1]['classe'] + '">'+ '<option value="" selected>' + element[1]['classe'] + element[1]['ano'] + '</option>'+ '<option value="' + element[1]['materia'] + '">' + element[1]['materia'] + '</option>'+'<option value="' + backup['materia'] + '">' + backup['materia'] + '</option>']]);
                        } else {
                            
                            //se não, adciona somente a matéria
                            end.at(-1).push('<option value="' + element[1]['materia'] + '">' + element[1]['materia'] + '</option>')
                        }
                    } else {
                        //se a classe e o ano não são iguais, adciona um titulo e a matéria
                        end.push(['</select><select name=" ' + [element[1]['classe'] + '">'+ '<option value="" selected>' + element[1]['classe'] +element[1]['ano']+ '</option>'+ '<option value="' + element[1]['materia'] + '">' + element[1]['materia'] + '</option>']])
                    }
                } else {
                    //caso o backup seja zero, quer dizer que é a primeira entrada do for, logo adciona titulo e matéria
                    end.push(['<select name=" ' + [element[1]['classe'] + '">'+ '<option value="" selected>' + element[1]['classe'] + '</option>'+ '<option value="' + element[1]['materia'] + '">' + element[1]['materia'] + '</option>']])

                }
                //backup recebe o elemento
                backup = element[1];
            }

        }
        //escreve end na tela;
        for (const key in end) {
            if (Object.hasOwnProperty.call(end, key)) {
                const element = end[key];
                dump(element)
            }
        }
    }

    if (type == 'commun') {

        end = [];


        //mapeia o array obj, e retorna todas as matérias de núcleo comum
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                const element = obj[key];
                if (element['commun']) {
                    c.push([element['classe'], element]);
                }
            }
        }

        //deixa os elementos com nomes iguais agrupados
        c.sort();

        //variável que vai ser utilizada para fazer a comparação entre as entradas de sala
        backup = 0;

        //mapeamos cada elemento de c,
        for (const key in c) {
            if (Object.hasOwnProperty.call(c, key)) {
                const element = c[key];
                n = parseFloat(key);

                //caso o backup não seja 0, ou seja, não é a primeira entrada:
                if (!(backup == 0)) {
                    //se a classe do elemento, e a classe do backup além do ano do elemento e o ano do backup são iguais:
                    if (element[1]['classe'] == backup['classe'] && element[1]['ano'] == backup['ano']) {

                        //verifica se o end já possuí algum elemento, ou se é a primeira entrada
                        if (end.length == 0) {
                            //se é a primeira entrada, adciona o titulo + matérias
                            end.push([element[1]['classe'] + ' <b>(' + element[1]['ano'] + 'º' + element[1]['apelidoClasse'] + ')<b>', backup['materia'], element[1]['materia']]);
                        } else {
                            //se não, adciona somente a matéria
                            end.at(-1).push(element[1]['materia'])
                        }
                    } else {
                        //se a classe e o ano não são iguais, adciona um titulo e a matéria
                        end.push([element[1]['classe'] + ' <b>(' + element[1]['ano'] + 'º' + element[1]['apelidoClasse'] + ')<b>', element[1]['materia']])
                    }
                } else {
                    //caso o backup seja zero, quer dizer que é a primeira entrada do for, logo adciona titulo e matéria
                    end.push([element[1]['classe'] + ' <b>(' + element[1]['ano'] + 'º' + element[1]['apelidoClasse'] + ')<b>', element[1]['materia']])

                }
                //backup recebe o elemento
                backup = element[1];
            }

        }
        //escreve end na tela;
        for (const key in end) {
            if (Object.hasOwnProperty.call(end, key)) {
                const element = end[key];
                dump(element)
            }
        }
    }

    if (type == 'course') {

        end = [];

        //mapeia o array obj, e retorna todas as matérias de curso
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                const element = obj[key];
                if (!(element['commun'])) {
                    c.push([element['classe'], element]);
                }
            }
        }

        //deixa os elementos com nomes iguais agrupados
        c.sort();

        //variável que vai ser utilizada para fazer a comparação entre as entradas de sala
        backup = 0;

        //mapeamos cada elemento de c,
        for (const key in c) {
            if (Object.hasOwnProperty.call(c, key)) {
                const element = c[key];
                n = parseFloat(key);

                //caso o backup não seja 0, ou seja, não é a primeira entrada:
                if (!(backup == 0)) {
                    //se a classe do elemento, e a classe do backup além do ano do elemento e o ano do backup são iguais:
                    if (element[1]['classe'] == backup['classe'] && element[1]['ano'] == backup['ano']) {

                        //verifica se o end já possuí algum elemento, ou se é a primeira entrada
                        if (end.length == 0) {
                            //se é a primeira entrada, adciona o titulo + matérias
                            end.push([element[1]['classe'] + ' <b>(' + element[1]['ano'] + 'º' + element[1]['apelidoClasse'] + ')<b>', backup['materia'], element[1]['materia']]);
                        } else {
                            //se não, adciona somente a matéria
                            end.at(-1).push(element[1]['materia'])
                        }
                    } else {
                        //se a classe e o ano não são iguais, adciona um titulo e a matéria
                        end.push([element[1]['classe'] + ' <b>(' + element[1]['ano'] + 'º' + element[1]['apelidoClasse'] + ')<b>', element[1]['materia']])
                    }
                } else {
                    //caso o backup seja zero, quer dizer que é a primeira entrada do for, logo adciona titulo e matéria
                    end.push([element[1]['classe'] + ' <b>(' + element[1]['ano'] + 'º' + element[1]['apelidoClasse'] + ')<b>', element[1]['materia']])

                }
                //backup recebe o elemento
                backup = element[1];
            }

        }
        //escreve end na tela;
        for (const key in end) {
            if (Object.hasOwnProperty.call(end, key)) {
                const element = end[key];
                dump(element)
            }
        }
    }
}