<?php

//cria nossas rotas de página

use \App\Controller\Tables;

/* 
                        -=-=-=-=-=-=- ROTAS DE GET -=-=-=-=-=-=-
*/

//exemplo de como definir uma rota GET em '/'
/*$obRouter->get('/', [
    //quando o GET for em '/':
    function () {

        //inicia a sessão
        session_start();

        //recebe o usuário da sessão ou falso
        $login = $_SESSION['user'] ?? false;

        //se o usuário da sessão for falso
        if (!$login) {
            //retorna uma nova Response com HTTPCode = 200 na página de Home
            return new Response(200, Tables\Login::getLogin());
        } else {

            $payed = Validation::verifyPayment($_SESSION['user']);

            if ($payed) {

                return new Response(200, Tables\Home::getHome());
            } else {

                return new Response(200, Tables\Store::getStore());
            }
        }
    }
]);*/

/* //rota dinâmica que nos permite passar métodos de query na DB pelo método GET
$obRouter->get('/salas/{data}', [
    function ($data) {
        return new Response(200, 'data da url: '. $data);
    }
]); */

/* 
                        -=-=-=-=-=-=- ROTAS DE POST -=-=-=-=-=-=-
*/

$obRouter->post('/salas', [
    function () {
        /* 
            ~*~* Modelo *~*~
        */

        /* if (isset($data['login'])) {

            $data = json_decode($data['login'], true);

            if ($data['user'] == getenv('ADMIN_USER')) {
                if ($data['pass'] == getenv('ADMIN_PASS')) {
                    $_SESSION['admin'] = $data['user'];
                    $_SESSION['pass'] = $data['pass'];
                    print_r('true');
                    exit;
                } else {
                    print_r('false');
                    exit;
                }
            } else {
                print_r('false');
                exit;
            }
        } */

        $data = $_POST;

        if (isset($data['newClass'])) {
            Tables\Classroom::createNewClassroom($data['newClass']);
            exit;
        }

        if (isset($data['get'])) {
            Tables\Classroom::getClassrooms($data['get']);
            exit;
        }


        if (isset($data['query'])) {
            Tables\Classroom::deepQuerry($data['query']);
            exit;
        }
    }
]);

$obRouter->post('/materia', [
    function(){
        $data = $_POST;

        if (isset($data['get'])) {
            Tables\Room::getRoom($data['get']);
            exit;
        }

        if (isset($data['post'])) {
            Tables\Room::postRoom($data['post']);
            exit;
        }

        if (isset($data['delete'])) {
            Tables\Room::deleteRoom($data['delete']);
            exit;
        }
    }
]);

$obRouter->post('/professores', [
    function () {
        $data = $_POST;

        if(isset($data['newProfessor'])) {
            Tables\Professor::createProfessor($data['newProfessor']);
            exit;
        }
    }
]);