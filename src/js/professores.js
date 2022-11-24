classroomTeacher = [];

//adciona as matérias que o professor pode lecionar
function addClass(id){
    field = document.getElementById(id);
    saved = document.getElementById('rooms');

    classroomTeacher.push(field.value)
    

    t = classroomTeacher.indexOf(field.value);
    div = document.createElement('div');
    div.setAttribute('id', classroomTeacher[t])
    
    p = document.createElement('p');
    p.innerText = classroomTeacher[t]+'  ';

    btn = document.createElement('btn');
    btn.setAttribute('onClick', 'remove("'+classroomTeacher[t]+'")');
    btn.setAttribute('id', classroomTeacher[t]);
    btn.setAttribute('class', 'btn btn-danger')
    btn.innerText = 'Excluir'

    p.appendChild(btn);
    div.appendChild(p);
    saved.appendChild(div);
    field.value = '';
}

//remove as matérias que o professor pode lecionar
function remove(item) {
    pos = classroomTeacher.indexOf(item);
    classroomTeacher.splice(pos, 1);
    cl = document.getElementById(item);
    cl.remove()
}

function sendProfessor(){
    name = document.getElementById('nPName').value;
    nick = document.getElementById('nPNick').value;
    login = document.getElementById('login').value;
    pass = document.getElementById('pass').value;
    
    t = "{";
    c = 0
    for (const key in classroomTeacher) {
        if (Object.hasOwnProperty.call(classroomTeacher, key)) {
            element = classroomTeacher[key];
            
            if (t == "{"){
                t = t + '"' + c + '":' + '"' + element + '"';
            }else{
                t = t +', '+ '"' + c + '":' + '"' + element + '"';
            }
            c += 1
        }
    }   
    t = t+"}";
    obj = JSON.parse(t);
    p = {
        "name": name,
        "nick": nick,
        "login": login,
        "pass": pass,
        "classes": obj
    }

    $.ajax({
        type: "POST",
        url: 'http://localhost:8000/professores',
        data: { "newProfessor": p },
        success: function (response) {
            r = response;
            console.log(r);
            if (r == 1) {
                $('#newProfessorModal').modal('hide');
                window.alert('o professor foi cadastrado com sucesso')
            }
        },
        error: function (response) {
            window.alert('Perdão, tivemos um Erro... Recarregue a página e tente novamente')
        }
    });
    
}