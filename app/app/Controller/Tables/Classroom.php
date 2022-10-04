<?php

//define um "diretório" para o php, podendo assim existir uma class Classroom diferente em outro namespace
namespace App\Controller\Tables;

use \App\Model\Entity\Organization;
use FFI\Exception;

class Classroom
{

    /**
     * Método responsável por criar todas as matérias de uma nova sala de aula na DB
     * @param obj $data
     * @return bool
     */
    static function createNewClassroom($data){

        //instancia da DB
        $db = new Organization;

        /* 
            Aqui temos um improviso para substituir uma função async.
            O foreach deve esperar que o 1º input na DB seja concluído para enviar o 2º,
            para isto deveríamos utilizar uma função async que aguardaria a resposta.
            O PHP puro, como esta sendo utilizado neste projeto, não possui esta função,
            entretanto podemos utilizar o sleep, que pausa o código por algum tempo, e depois
            continua-o. Desta forma podemos fazer com que o foreach funcione como um async.
        */

        //percorre os valores de $data
        foreach ($data as $key => $value) {
            try {
                //cria a requisição na DB, e recebe uma resposta (True//False);
                $anser = $db->db_methods('POST', 'classroom', $value);
                //espera 0.9 segundos
                sleep(0.9);
                //caso a entrada na DB falhar, exibe um erro.
                if (!$anser) {
                    throw new Exception("O servidor não pode inserir as requisições, time out", 1);            
                }
            
            } catch (Exception $e) {
                //caso algo mais falhar, exibe um erro.
                print_r('o servidor está com erro');
            }
        }
        print_r(true);    
        //exita para não dar erro no método run();
        exit;
        

    }

    /**
     * Método responsável por trazer todas as salas de aula para o usuário,
     * com todas as suas respectivas matérias.
     * @return string
     */
    static function getClassrooms($data=''){
        $db = new Organization;

        if ($data == 'classroom' || $data == 'commun' || $data == 'course') {
            $querry = $db->db_methods('GET', 'classroom');
            print_r(json_encode($querry));
            
        }
        
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
