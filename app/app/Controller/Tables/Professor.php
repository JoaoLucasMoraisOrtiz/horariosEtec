<?php

//arquivos com configurações das variáveis da página de index

//define um "diretório" para o php, podendo assim existir uma class home diferente em outro namespace
namespace App\Controller\Tables;

use \App\Utils\View;
use \App\Model\Entity\Organization;

class Professor
{

    static function createProfessor($data)
    {
        
        $obOrganization = new Organization;
        $posts = $obOrganization->db_methods('POST', 'professor', $data);

        if($posts == 1 || $posts == '1'){
            print_r(1);
            exit;
        }else{
            print_r($posts);
            exit;
        }
    }
    
}
