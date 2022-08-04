var mysql = require("mysql");
var json = require("../../secrets.json");
var data = JSON.parse(json);

module.exports = class Connection {

    constructor() {
        this.con = mysql.createConnection({
            host: data.host,
            user: data.data,
            password: data.password,
            database: database
        });
    };

    
}