function doit(...args) {
    data = "i'm alive!!";
    $.ajax({
        type: "POST",
        url: 'http://localhost:8000/professores',
        data: { "query": data },
        success: function (response) {
            window.alert(response);
        },
        error: function (response) {
            window.alert('Perdão, tivemos um Erro... Recarregue a página e tente novamente')
        }
    });
}