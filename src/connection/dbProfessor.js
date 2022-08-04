const dbcon = require('./Connection.js');
module.exports = class DbProfessor {
    constructor(){
        this.con = new dbcon;
    }

    create(...values) {

        sql = "INSERT INTO `professores`";
        sql = sql + " (`id`, `nome`, `horariosDisponiveis`, `pontuacao`, `numeroDeAulas`, `salasExcluidas`, `numeroDeAulasDia`) VALUES (";
        for (item of values){
            sql = sql + item;
        };

        sql = sql + ");";

        constructor.con.query(sql, function (err, result) {
            if (err) throw err;
            console.log('ok');
        })
    }

    show() {
        sql = "SELECT * FROM professores";
        constructor.con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
        })
    }
}