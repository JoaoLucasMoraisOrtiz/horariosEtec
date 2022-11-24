<?php

require_once __DIR__ . "/../helpers/dbConection.php";

use FFI\Exception;

class ActionsProfessor
{

    /**
     * Sub vindo do google
     * @var integer
     */
    private $id;

    /**
     * nome do usuário
     * @var string
     */
    private $name;

    /**
     * email do usuário
     * @var string
     */
    private $email;

    /**
     * armazena o valor do pagamento do usuário
     * @var string
     */
    private $amounth;

    /**
     * guarda data do pagamento do usuário
     * @var string
     */
    private $date;


    /* 
        funções privadas das classes
    */

    /**
     * Método responsável por setar o host da nossa DB
     */
    private function getHost()
    {
        $this->link = getenv('DB_HOST');
    }

    /**
     * Método responsável por setar o host da nossa DB
     */
    private function getName()
    {
        $this->dbName = getenv('DB_NAME');
    }

    /**
     * Método responsável por setar o host da nossa DB
     */
    private function getUser()
    {
        $this->usr = getenv('DB_USER');
    }

    /**
     * Método responsável por setar o host da nossa DB
     */
    private function getPass()
    {
        $this->pass = getenv('DB_PASS');
    }

    /**
     * Método responsável por setar o host da nossa DB
     */
    private function getTableName()
    {
        $this->tableName = getenv('DB_POSTS_TABLE');
    }


    /**
     * Método responsável por professores na DB
     * @param array
     */
    public function post($param): array
    {

        try {
            $con = '';
            $this->getHost();
            $this->getName();
            $this->getUser();
            $this->getPass();
            $this->getTableName();

            //tenta se conectar com o banco de dados
            $con = connection($this->link, $this->dbName, $this->usr, $this->pass);
            $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (Exception $e) {

            //em caso de erro exibe a window.allert()
            echo `window.allert('Erro ao conectar com o banco de dados! <br> {$e->getMessage()}')`;
        }

        try {
            $t = '[';
            $c = 0;
            foreach ($param['classes'] as $key => $element) {
                if ($t == "["){
                    $t = $t . '"' . (string)$c . '":' . '"' . $element . '"';
                }else{
                    $t = $t .', '. '"' . (string)$c . '":' . '"' . $element . '"';
                };
                $c += 1;
            };
            $t = $t . ']';

            //prepara uma string para ser executada posteriormente com o prepare;
            //:_mark - é uma forma de se proteger, para ninguem colocar um drop database e acabar com o banco
            $statement = $con->prepare("INSERT INTO professores (id, nome, apelido, login, senha, materias) VALUES(NULL, :nome, :apelido, :login, :senha, :materias)");

            //substitui o :_mark por um valor, e expecifica o tipo do valor (explicitado por segurança);
            $statement->bindValue(":nome", $param['name'], PDO::PARAM_STR);
            $statement->bindValue(":apelido", $param['nick'], PDO::PARAM_STR);
            $statement->bindValue(":login", $param['login'], PDO::PARAM_STR);
            $statement->bindValue(":senha", $param['pass'], PDO::PARAM_STR);
            $statement->bindValue(":materias", $t, PDO::PARAM_STR);
        } catch (Exception $e) {
            print_r("ERROR " . $e);
            exit();
        }
        
        try {

            //tenta executar a string que estava sendo preparada, ou seja, envia para o DB os dados.
            if ($statement->execute()) {

                //pega o ID do usuário que foi enviado para o DB;
                $this->id = $con->lastInsertId();
                //exibe o usuário inserido na DB;
                print_r(1);
                exit;

            }
        } catch (Exception $e) {
            //em caso de erro 
            echo `window.allert('Erro ao conectar com o banco de dados! <br> {$e->getMessage()}')`;
        }
        return [];
    }

    /**
     * Método responsável por atualizar um post na DB
     * @param array
     */
    public function update($param)
    {
        try {

            $con = '';
            $this->getHost();
            $this->getName();
            $this->getUser();
            $this->getPass();
            $this->getTableName();

            //tenta se conectar com o banco de dados
            $con = connection($this->link, $this->dbName, $this->usr, $this->pass);
            $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (Exception $e) {

            //em caso de erro exibe a window.allert()
            echo `window.allert('Erro ao conectar com o banco de dados! <br> {$e->getMessage()}')`;
        }


        try {

            $this->id =  $this->getId($param['id']);
            $this->payment = $this->getPayment($param['payment'], $param['id']);

            //prepara uma string para ser executada posteriormente com o prepare;
            //:_mark - é uma forma de se proteger, para ninguem colocar um drop database e acabar com o banco
            $statement = $con->prepare("UPDATE users SET id=:id, name=:name, email=:email, amounth=:amounth, payment=:payment, date=:date WHERE id=:id");

            //substitui o :_mark por um valor, e expecifica o tipo do valor (explicitado por segurança);
            $statement->bindParam(":id", $this->id, PDO::PARAM_STR);
            $statement->bindValue(":name", $param['name'], PDO::PARAM_STR);
            $statement->bindValue(":email", $param['email'], PDO::PARAM_STR);
            $statement->bindValue(":amounth", $param['amounth'], PDO::PARAM_STR);
            $statement->bindValue(":payment", $this->payment, PDO::PARAM_STR);
            $statement->bindValue(":date", $this->date, PDO::PARAM_STR);
        } catch (Exception $e) {
            echo "ERROR " . $e;
            exit();
        }

        try {


            //tenta executar a string que estava sendo preparada, ou seja, envia para o DB os dados.
            $statement->execute();

            return $this->get($param['id']);
        } catch (Exception $e) {
            //em caso de erro 
            echo `window.allert('Erro ao conectar com o banco de dados! <br> {$e->getMessage()}')`;
        }
        return [];
    }

    /**
     * Método responsável por deletar um post do banco de dados
     * @param int
     */
    public function delete($id)
    {

        try {

            $con = '';
            $this->getHost();
            $this->getName();
            $this->getUser();
            $this->getPass();
            $this->getTableName();

            //tenta se conectar com o banco de dados
            $con = connection($this->link, $this->dbName, $this->usr, $this->pass);
            $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (Exception $e) {
            //em caso de erro exibe a window.allert()
            echo `window.allert('Erro ao conectar com o banco de dados! <br> {$e->getMessage()}')`;
        }

        try {
            //prepara uma string para ser executada posteriormente com o prepare;
            //:_mark - é uma forma de se proteger, para ninguem colocar um drop database e acabar com o banco
            $statement = $con->prepare("DELETE FROM users WHERE id=:id");

            //substitui o :_mark por um valor, e expecifica o tipo do valor (explicitado por segurança);
            $statement->bindValue(":id", $id, PDO::PARAM_STR);
        } catch (Exception $e) {
            echo `window.allert('Erro ao conectar com o banco de dados! <br> {$e->getMessage()}')`;
        }

        try {
            //tenta executar a string que estava sendo preparada, ou seja, envia para o DB os dados.
            $statement->execute();
        } catch (Exception $e) {
            //em caso de erro 
            echo `window.allert('Erro ao conectar com o banco de dados! <br> {$e->getMessage()}')`;
        }
        return [];
    }
}
