<?php

//aqui ficará nossos dados vindos das conexões com o banco de dados;

namespace App\Model\Entity;

use ActionsClassroom;
use ActionsTeacher;

require_once __DIR__ . '/../API/controller/ActionsClassroom.php';
require_once __DIR__ . '/../API/controller/ActionsTeacher.php';

class Organization
{

    /**
     * Variável para guardar a coneção com o banco de dados;
     * @var instance
     */
    private $api;

    /* 
        Funções privadas da classe
    */

    /**
     * Inicia dentro da variável $api uma instância da nossa função de conexão com o banco de
     * dados, na coluna que colocarmos como parametro.
     * @param string $table
     */
    private function init($table)
    {

        if (strtolower($table) == 'classroom') {

            $this->api = new ActionsClassroom;
        }

        if (strtolower($table) == 'teacher') {

            $this->api = new ActionsTeacher;
        }
    }

    /**
     * Método responsável por fazer nossas ações de CRUD em posts
     * @param string $method
     * @param string $table
     * @param array $param
     * @return array/instance quando $method == GET/quando $method == INSTANCE
     */
    public function db_methods($method, $table, $params = '')
    {

        if (strtoupper($method) == "GET") {

            $this->init($table);

            return $this->api->get($params);
        }

        if (strtoupper($method) == "GET_FILTER") {

            $this->init($table);

            return $this->api->get($params);
        }

        if (strtoupper($method) == "POST") {

            $this->init($table);

            if(gettype($params) == 'array'){

                try {
                    //adciona na DB os dados
                    $anser = $this->api->post($params);
                    return $anser;

                } catch (\Throwable $e) {
                    return "error: ".$e;
                }
                
            }

            
        }

        if (strtoupper($method) == "PUT") {

            $this->init($table);

            $this->api->update($params);
        }

        if (strtoupper($method) == "DELETE") {

            $this->init($table);

            $this->api->delete($params);
        }

        if (strtoupper($method) == "INSTANCE") {

            $this->init($table);

            return $this->api;
        }
    }
}
