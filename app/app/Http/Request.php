<?php

//responsável por lidar com as requisições do nosso app

namespace App\Http;

class Request
{

    /**
     * Método HTTP da requisição (GET, POST, PATCH, DELETE)
     * @var string
     */
    private $httpMethod;

    /**
     * URI da página
     * @var string
     */
    private $uri;

    /**
     * Parâmetros da URL (obtidos com o $_GET[])
     * @var array
     */
    private $querryParams = [];

    /**
     * Variáveis recebidas no POST da página (obtidos com o $_POST[])
     * @var array
     */
    private $postVars = [];

    /**
     * Headers da requisição http
     * @var array
     */
    private $headers = [];

    /**  
    *    A func. __contruct() é chamada ao instanciar a classe, e ela toma as ações que definirmos.
    *    Neste caso, ela popula os dados das variáveis privadas da nossa classe.
    */
    public function __construct()
    {
        // o private querryParam recebe os dados do GET, se não ouver, recebe vazio.
        $this->querryParams = $_GET ?? [];

        // o private postVars recebe os dados do POST, se não ouver, recebe vazio.
        $this->postVars = $_POST ?? [];

        // o private headers recebe todos os headers da requisição
        $this->headers = getallheaders();

        // o private httpMethod recebe os dados do método da requisição, se não ouver, recebe vazio.
        $this->httpMethod = $_SERVER['REQUEST_METHOD'] ?? '';

        //o private uri recebe os dados da uri
        $this->uri = $_SERVER['REQUEST_URI'] ?? '';
    }

    /* 
        Todos os métodos até agora são provados da classe.
        As func. abaixo sevem para podermos resgatar este métodos.
    */

    /**
     * Método responsável por retornar qual requisão HTTP foi feita (GET, POST, PATCH, DELETE);
     * @return string
     */
    public function getHttpMethod(){
        return $this->httpMethod;

    }

    /**
     * Método responsável por retornar a URI em que foi feita a requisição HTTP;
     * @return string
     */
    public function getUri(){
        return $this->uri;

    }

    /**
     * Método responsável por retornar os headers da requisição;
     * @return string
     */
    public function getHeaders(){
        return $this->headers;

    }

    /**
     * Método responsável por retornar os parâmetros da URL, obtidos com $_GET[];
     * @return string
     */
    public function getQuerryParams(){
        return $this->querryParams;

    }

    /**
     * Método responsável por retornar os dados obtidos com o $_POST[];
     * @return string
     */
    public function getPostVars(){
        return $this->postVars;

    }
}
