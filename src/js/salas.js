let countSubjects;
countSubjects = 1;
let obj = {};
let elemsToRemove;
elemsToRemove = [];
let allClassrooms;
allClassrooms = [];

/**
 * Método responsável por verificar se a matéria do id registrado existe no banco de dados
 * 
 * @param {string} inputPlace <- o id da caixa onde o usuário digitou o id da materia
 */
function verifyId(inputPlace, divName='subjects') {

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
                father = document.getElementById(divName)
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
                radioText.innerText = 'Núcleo comum';

                //linha hr
                var p = document.createElement('hr');

                var br = document.createElement('br');

                //botão que adiciona a mateira dentro do dicionario de materias
                var btn = document.createElement('button');
                btn.setAttribute('onclick', 'getClass("true")');
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
function getClass(edit='false') {
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

    if(edit=='false'){
        father = document.getElementById('codeClass');
    }else{
        father = document.getElementById('codeClassEdit');
    }
    

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
            console.log(r)
            if (r[0] == 1) {
                $('#newClassModal').modal('hide');
                confirmation('a sala foi criada com sucesso', '', 'fechar')
            }
        },
        error: function (response) {
            window.alert('Perdão, tivemos um Erro... Recarregue a página e tente novamente')
        }
    });
}

function remove(id, edit = false) {
    if (!edit) {
        delete obj[id];
        const e = document.getElementById(id);

        // remove the last list item
        e.remove();
    } else {
        const e = document.getElementById(id);

        // remove the last list item
        e.remove();
    }
}
function count(value) {
    countSubjects = countSubjects + value
    return countSubjects
}

/**
 * escreve na tela um objeto
 * @param {object} obj 
 */
function dump(obj, pre) {
    var out = '';

    //percorre o obj e adciona-o em *out*
    for (var i in obj) {
        out += obj[i] + "<br>";
    }


    //escreve na tela os dumps do obj
    results = document.getElementById('querryResults');
    if (pre) {
        pre = document.createElement('pre');
    } else {
        pre = document.createElement('p')
    }
    pre.innerHTML = out;
    results.appendChild(pre);
}

/**
 * Método responsável por trazer a querry na tela
 */
function openQuerry() {
    document.getElementById('querryResults').innerHTML = '';
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
                c.push([element['classe'] + element['ano'], element]);
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
                            end.push(['</select><div class="row"><button type="button" class="btn btn-primary" data-toggle="modal" onclick="openEditModal(\'' + element[1]['ano'] + '\',\'' + element[1]['classe'] + '\')">Editar Sala</button></div><select name=" ' + [element[1]['classe'] + '" class="form-select" multiple aria-label="multiple select example">' + '<option value="" selected><h3>' + element[1]['ano'] + 'º ' + element[1]['classe'] + '</h3></option>' + '<option value="' + element[1]['materia'] + '">' + element[1]['materia'] + '</option>' + '<option value="' + backup['materia'] + '">' + backup['materia'] + '</option>']]);
                        } else {

                            //se não, adciona somente a matéria
                            end.at(-1).push('<option value="' + element[1]['materia'] + '">' + element[1]['materia'] + '</option>')
                        }
                    } else {
                        //se a classe e o ano não são iguais, adciona um titulo e a matéria
                        end.push(['</select><hr><div class="row"><button type="button" class="btn btn-primary" data-toggle="modal" onclick="openEditModal(\'' + element[1]['ano'] + '\',\'' + element[1]['classe'] + '\')">Editar Sala</button></div><select name=" ' + [element[1]['classe'] + '" class="form-select" multiple aria-label="multiple select example">' + '<option value="" selected><h3>' + element[1]['ano'] + 'º ' + element[1]['classe'] + '</h3></option>' + '<option value="' + element[1]['materia'] + '">' + element[1]['materia'] + '</option>']])
                    }
                } else {
                    //caso o backup seja zero, quer dizer que é a primeira entrada do for, logo adciona titulo e matéria
                    end.push(['<br><button type="button" class="btn btn-primary" data-toggle="modal" onclick="openEditModal(\'' + element[1]['ano'] + '\',\'' + element[1]['classe'] + '\')">Editar Sala</button><select name=" ' + [element[1]['classe'] + '" class="form-select" multiple aria-label="multiple select example">' + '<option value="" selected><h3>' + element[1]['ano'] + 'º ' + element[1]['classe'] + '</h3></option>' + '<option value="' + element[1]['materia'] + '">' + element[1]['materia'] + '</option>']])

                }
                //backup recebe o elemento
                backup = element[1];
            }

        }
        //escreve end na tela;
        for (const key in end) {
            if (Object.hasOwnProperty.call(end, key)) {
                const element = end[key];
                dump(element, false)
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
                            end.push([element[1]['classe'] + ' <b>(' + element[1]['ano'] + 'º' + element[1]['apelidoClasse'] + ')</b>', backup['materia'] + ';', element[1]['materia'] + ';']);
                        } else {
                            //se não, adciona somente a matéria
                            end.at(-1).push(element[1]['materia'] + ';<br>')
                        }
                    } else {
                        //se a classe e o ano não são iguais, adciona um titulo e a matéria
                        end.push(['<hr>', element[1]['classe'] + '<b>(' + element[1]['ano'] + 'º' + element[1]['apelidoClasse'] + ')<b><br>', element[1]['materia'] + ';'])
                    }
                } else {
                    //caso o backup seja zero, quer dizer que é a primeira entrada do for, logo adciona titulo e matéria
                    end.push([element[1]['classe'] + ' <b>(' + element[1]['ano'] + 'º' + element[1]['apelidoClasse'] + ')<b>', element[1]['materia'] + ';'])

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
                            end.push([element[1]['classe'] + ' <b>(' + element[1]['ano'] + 'º' + element[1]['apelidoClasse'] + ')</b>', backup['materia'] + ';', element[1]['materia'] + ';']);
                        } else {
                            //se não, adciona somente a matéria
                            end.at(-1).push(element[1]['materia'] + ';<br>')
                        }
                    } else {
                        //se a classe e o ano não são iguais, adciona um titulo e a matéria
                        end.push(['<hr>', element[1]['classe'] + '<b>(' + element[1]['ano'] + 'º' + element[1]['apelidoClasse'] + ')<b><br>', element[1]['materia'] + ';'])
                    }
                } else {
                    //caso o backup seja zero, quer dizer que é a primeira entrada do for, logo adciona titulo e matéria
                    end.push([element[1]['classe'] + ' <b>(' + element[1]['ano'] + 'º' + element[1]['apelidoClasse'] + ')<b>', element[1]['materia'] + ';'])

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

function openEditModal(ano, classroom) {

    data = 'classe="' + classroom + '" AND ano=' + ano + ';';

    //pega a sala
    resp = $.ajax({
        type: "POST",
        url: 'http://localhost:8000/salas',
        data: { "querry": data },
        success: function (response) {

            modal = document.getElementById('codeClass');
            modal.innerHTML = '';


            response = JSON.parse(response)

            classroom = document.getElementById('eCName');
            nick = document.getElementById('eCNick');
            year = document.getElementById('eCyear');
            period = document.getElementById('eCperiod');
            classes = document.getElementById('existedClasses');
            classes.innerHTML = '';

            classroom.value = response[0]['classe'];
            nick.value = response[0]['apelidoClasse'];
            year.value = response[0]['ano'];
            period.value = response[0]['periodo'];

            for (const key in response) {
                if (Object.hasOwnProperty.call(response, key)) {
                    const element = response[key];
                    allClassrooms.push(element)
                    const base = '<div class="row" id="' + element['id'] + '">' + element['apelidoMateria'] + '</p><button type="button" class="btn btn-danger" data-toggle="modal" onclick="deleteViewClass(\'' + element['id'] + '\')">Excluír matéria</button></div>';
                    classroom = document.createElement('div')
                    classroom.innerHTML = base
                    /* console.log(classroom) */
                    classes.appendChild(classroom)
                }
            }
        },
        error: function (response) {
            window.alert('Perdão, tivemos um Erro... Recarregue a página e tente novamente ' + response)
        }
    });
    /* data = 'classe='+classroom;
    $.ajax({
        type:"POST",
        url: 'https://localhost:8000/salas',
        data: {"querry": data},
        success: function (resp){
            rooms = []
            for (const key in resp) {
                if (Object.hasOwnProperty.call(object, key)) {
                    const element = resp[key];
                    rooms.push('<div class=row><p>'+element+' </p><button type="button" class="btn btn-primary" data-toggle="modal" onclick="openEditModal(' + element[1]['id'] + ')">Editar Sala</button></div>');
                }
            }

            for (const key in rooms) {
                if (Object.hasOwnProperty.call(object, key)) {
                    const element = rooms[key];
                    classes.appendChild(element) ;
                }
            }
        },
        error: function(response){
            window.alert('Perdão, tivemos um Erro... Recarregue a página e tente novamente')
        }
    }); */
    $('#editClassModal').modal('show');
}

function deleteViewClass(id) {
    elemsToRemove.push(id);
    remove(id);
}

function deleteDbClass() {

    for (const key in elemsToRemove) {
        if (Object.hasOwnProperty.call(elemsToRemove, key)) {
            const id = elemsToRemove[key];
            $.ajax({
                type: "POST",
                url: 'http://localhost:8000/salas',
                data: { "delete": id },
                success: function (response) {

                    if (response == 'true') {

                    } else {
                        window.alert('Desculpe, houve um erro ao apagar esta materia... Tente novamente.');
                    }
                },
                error: function (response) {
                    window.alert('Perdão, tivemos um Erro... Recarregue a página e tente novamente ')
                    console.log(response)
                }
            })
        }
    }

    for (const key in elemsToRemove) {
        if (Object.hasOwnProperty.call(elemsToRemove, key)) {
            const element = elemsToRemove[key];
            allClassrooms.splice(allClassrooms.indexOf(element), 1)
        }
    }

    //pega todos os elementos que podem ser alterados
    classroom = document.getElementById('eCName');
    nick = document.getElementById('eCNick');
    year = document.getElementById('eCyear');
    period = document.getElementById('eCperiod');

    newValues = { "name": classroom.value, "nick": nick.value, "year": year.value, "period": period.value, "where": '' }

    for (const key in allClassrooms) {
        if (Object.hasOwnProperty.call(allClassrooms, key)) {
            const element = allClassrooms[key];
            newValues['where'] = 'id=' + element['id']

            $.ajax({
                type: "POST",
                url: 'http://localhost:8000/salas',
                data: { "update": newValues },
                success: function (response) {
                    
                },
                error: function (response) {
                    window.alert('Perdão, tivemos um Erro... Recarregue a página e tente novamente ' + response)
                }
                })
        }
    }

    getClass()
    console.log(obj)
    returnCodeClass()
    $('#editClassModal').modal('hide');
    newValues = [];
};

function returnCodeClass() {

    t = '<p>código da matéria <input type="number" name="sub1code" id="sub1code" class="form-controll" placeholder="ex: 1"> <button class="btn btn-danger" onclick="verifyId(\'sub1code\')">verificar</button></p>'
    addClassroom = document.getElementById('codeClass');
    addClassroom.innerHTML = t;
}