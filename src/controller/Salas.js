const dbcon = require('./Connection.js');
module.exports = class Salas {
    constructor(){
        this.con = new dbcon;
    };

    create(...values) {

        sql = "INSERT INTO `salas`";
        sql = sql + " (`ano`, `curso`, `cursoApelido`, `periodo`) VALUES (";
        for (item of values){
            sql = sql + item;
        };

        sql = sql + ");";

        constructor.con.query(sql, function (err, result) {
            if (err) throw err;
            console.log('ok');
        })
    };

    read() {

    }

    update() {

    }

    delete() {

    }
}