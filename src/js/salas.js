let countSubjects = 0;

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

            //caso a resposta seja negativa
            if (!confirm) {
                father = document.getElementById('subjects');
                count(1);
                var div = document.createElement('div');
                div.classList.add("sub" + countSubjects);

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

                var classroom = document.createElement('input');
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
                year.setAttribute('id', 'sub' + countSubjects + 'year');
                year.setAttribute('type', 'number');
                year.setAttribute('class', 'form-control');
                year.setAttribute('value', '');
                year.setAttribute('placeholder', 'ano letivo: 1 ou 2 ou 3');

                var numberClass = document.createElement('input');
                numberClass.setAttribute('id', 'sub' + countSubjects + 'numberClass');
                numberClass.setAttribute('type', 'number');
                numberClass.setAttribute('class', 'form-control');
                numberClass.setAttribute('value', '');
                numberClass.setAttribute('placeholder', 'número de aulas: 4');

                var period = document.createElement('input');
                period.setAttribute('id', 'sub' + countSubjects + 'ClroomNick');
                period.setAttribute('type', 'number');
                period.setAttribute('class', 'form-control');
                period.setAttribute('value', '');
                period.setAttribute('placeholder', 'período: integral ou manhã ...');

                var p = document.createElement('hr');
                var text = document.createTextNode('nome da sala')

                div.appendChild(name);
                div.appendChild(nick);

                div.appendChild(classroom);
                div.appendChild(clroomNick);
                div.appendChild(year);
                div.appendChild(numberClass);
                div.appendChild(period);
                div.appendChild(p);
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

function count(value) {
    return countSubjects = countSubjects + value;
}