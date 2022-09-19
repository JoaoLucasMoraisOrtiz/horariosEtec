<?php

//define um "diretório" para o php, podendo assim existir uma class Classroom diferente em outro namespace
namespace App\Controller\Tables;

use \App\Model\Entity\Organization;

class Classroom
{

    /**
     * Método responsável por criar todas as matérias de uma nova sala de aula na DB
     * @param obj $data
     * @return bool
     */
    static function createNewClassroom($data){
        //aqui deverá ser tratado a entrada do dado na DB

        $db = new Organization;

        foreach ($data as $key => $value) {
            $db->db_methods('POST', 'classroom', $value);
        }
        exit;
        

    }

    /**
     * Método responsável por trazer todas as salas de aula para o usuário,
     * com todas as suas respectivas matérias.
     * @return string
     */
    static function getClassrooms($data=''){
        $db = new Organization;

        $db->db_methods('GET', 'classroom', $data);
        print_r(FALSE);
        exit;
    }

    /**
     * Método responsável por fazer uma busca com parâmetros na DB, e retornar o resultado
     * @param obj $data
     * @return string
     */
    static function deepQuerry($data){
        //aqui deverá ser tratada a pesquisa por meio de termos na DB
        print_r($data . " fazendo uma pesquisa profunda com estes dados");
    }
}
