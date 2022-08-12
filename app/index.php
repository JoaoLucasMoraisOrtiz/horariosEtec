<?php

/*  O autoload do composer funciona como um pré-load de todos os arquivos, permitindo que
    trabalhemos com os namespaces sem ter de incluir em todos os arquivos o próprio arquivo da 
    classe */
require __DIR__ . "/vendor/autoload.php";


use \App\Http\Router;
use \App\Utils;

//cria nossas variáveis de ambiente contidas em .env
Utils\Environment ::load('../.env');

//Define o valor de variáveis comuns a todas as páginas chamadas pela class View;
Utils\View::init([
    'URL' => getenv('URL')
]);

//Nova instância da classe Router
$obRouter = new Router(getenv('URL'));

//inclui as rotas de página
include __DIR__ . '/routes/pages.php';

//chama a exibição da rota com o run, e a exibe com o sendResponse de Response(class)
$obRouter -> run()->sendResponse();