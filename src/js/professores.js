var dbcon = require("../connection/dbProfessor.js");

conProfessor = new dbcon;

function crate() {
    conProfessor.create('professor', NULL, 'Professor 1', '?7:10-12:30/13:00-15:30/**?', '102', '32', '12', '4');
    conProfessor.show('professor')
}