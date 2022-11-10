var td = $('table td');          // pôr todas as td em cache
td.on('click', function () {     // agregar um event handler para executar aquando um click
    td.not(this).removeClass('colorir');   // remover a classe em todas as td menos a que recebeu click
    $(this).toggleClass('colorir'); // adicionar/remover a classe àquela que foi clicada
});