<?php

//responsável por lidar com as respostas do nosso app

namespace App\Http;

class response{

    /**
     * Código do status HTTP - Padrão 200: success;
     * @var integer
     */
    private $httpCode = 200;

    /**
     * Headers do response;
     * @var array
     */
    private $headers = [];

    /**
     * Tipo do conteúdo da resposta, por padrão é um html;
     * @var string
     */
    private $contentType = 'text/html';

    /**
     * Conteúdo do response;
     * @var mixed
     */
    private $content;


    /** 
    *    A func. __contruct() é chamada ao instanciar a classe, e ela toma as ações que definirmos.
    *    Neste caso, ela popula os dados das variáveis privadas da nossa classe.
    *    Recebe três argumentos, sendo respectivamente: o código http, o conteúdo da resposta,
    *    e o tipo do conteúdo da resposta - por padrão "text/html".
    */
    public function __construct($httpCode, $content, $contentType = 'text/html'){
        $this -> httpCode = $httpCode;
        $this -> content = $content;

        //$contentType não é passado diretamente como as outras vars pois ele também deve ser adicionado ao header
        $this -> setContentType($contentType);

    }

    /*
        Para utilizarmos os metodos privados fora da classe, vamos adicionar algumas func. publicas
    */

    /**
     * Método utilizado para definir o content type do __construct() e inseri-lo no header;
     * @param string
     * @return string
     */

    public function setContentType($contentType){
        //define a private var como o $contetType
        $this -> contentType = $contentType;

        //adiciona o contetType ao header
        $this -> addHeader('ContentType', $contentType);

    }

    /**
     * Método responsável por adicionar uma chave e um valor ao array do header;
     * @param string $key
     * @param string $value
     */
    public function addHeader($key, $value){
        $this -> header[$key] = $value;
    }

    /**
     * Método responsável por enviar a resposta ao usuário
     */
    public function sendResponse(){

        //envia os headers para o navegador
        $this->sendHeaders();

        //avalia o tipo de resposta a ser encaminhada ao usuário
        switch ($this->contentType) {
            case 'text/html':
                echo $this->content;
            
            default:
                # code...
                break;
        }
    }

    /**
     * Método utilizado para enviar o header ao navegador.
     * 
     */
    private function sendHeaders(){
        //define o status (200, 400, 404, 500, etc...)
        http_response_code($this->httpCode);

        //enviar os headers de dentro de $this->header, onde há chaves e valores respectivamente.
        foreach ($this->header as $key => $value) {

            //envia para o header no modelo que ele deve receber (key : value);
            header($key . ": " . $value);
        }
    }
}