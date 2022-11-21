<?php

//define um "diretório" para o php, podendo assim existir uma class Classroom diferente em outro namespace
namespace App\Controller\Tables;

use \App\Model\Entity\Organization;
use FFI\Exception;

class Room
{

    /**
     * Método responsável por trazer todas as salas de aula para o usuário,
     * com todas as suas respectivas matérias.
     * @return string
     */
    static function getRoom($data=''){
        $db = new Organization;

        //print_r(gettype($data));

        $querry = $db->db_methods('GET', 'room', $data);

        if($querry == ''){
            print_r(false);
        }else{
            print_r($querry);
        }
    }

    static function postRoom($data){
        $db = new Organization;

        try {
            $answer = '';

            //cria a requisição na DB, e recebe uma resposta (True//False);
            $answer = $db->db_methods('POST', 'room', $data);

            $c = true;
            while ($c) {
                
                try {
                    
                    if($answer['1']){
                        $c = false;
                    } else if (!$answer['0']){
                        $c = false;
                    }
                } catch (Exception $e){
                    continue;
                }
            }
            print_r($answer);
            //caso a entrada na DB falhar, exibe um erro.
            if (array_key_exists('0', $answer)) {
                if(!$answer['0']){
                    throw new Exception("O servidor não pode inserir as requisições, time out", 1);            
                }
                
            }
        
        } catch (Exception $e) {
            //caso algo mais falhar, exibe um erro.
            print_r('o servidor está com erro');
        }
    }

    static function deleteRoom($data){
        $db = new Organization;

        //print_r(gettype($data));

        $querry = $db->db_methods('DELETE', 'room', $data);

    }
}
