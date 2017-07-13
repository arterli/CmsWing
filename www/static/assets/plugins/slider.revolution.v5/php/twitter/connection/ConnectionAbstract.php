<?php
namespace TwitterPhp\Connection;

/**
 * Class Base
 * @package TwitterPhp
 * @subpackage Connection
 */
abstract class Base
{
    /**
     * Url for Twitter api
     */
    const TWITTER_API_URL = 'https://api.twitter.com';

    /**
     * Twitter URL that authenticates bearer tokens
     */
    const TWITTER_API_AUTH_URL = 'https://api.twitter.com/oauth2/token/';

    /**
     * Version of Twitter api
     */
    const TWITTER_API_VERSION = '1.1';

    /**
     * Timeout value for curl connections
     */
    const DEFAULT_TIMEOUT = 10;

    /**
     * METHOD GET
     */
    const METHOD_GET = 'GET';

    /**
     * METHOD POST
     */
    const METHOD_POST = 'POST';

    /**
     * @param string $url
     * @param array $parameters
     * @param $method
     * @return array
     */
    abstract protected function _buildHeaders($url,array $parameters = null,$method);


    /**
     * Do GET request to Twitter api
     *
     * @link https://dev.twitter.com/docs/api/1.1
     *
     * @param $resource
     * @param array $parameters
     * @return mixed
     */
    public function get($resource, array $parameters = array())
    {
        $url = $this->_prepareUrl($resource);
        $headers = $this->_buildHeaders($url,$parameters,self::METHOD_GET);
        $url = $url . '?' . http_build_query($parameters);
        $curlParams = array (
            CURLOPT_URL => $url,
            CURLOPT_HTTPHEADER => $headers
        );

        return $this->_callApi($curlParams);
    }

    /**
     * Do POST request to Twitter api
     *
     * @link https://dev.twitter.com/docs/api/1.1
     *
     * @param $resource
     * @param array $parameters
     * @return mixed
     */
    public function post($resource, array $parameters = array())
    {
        $url = $this->_prepareUrl($resource);
        $headers = $this->_buildHeaders($url,$parameters,self::METHOD_POST);
        $curlParams = array (
            CURLOPT_URL => $url,
            CURLOPT_POST => 1,
            CURLOPT_POSTFIELDS => $parameters,
            CURLOPT_HTTPHEADER => $headers
        );

        return $this->_callApi($curlParams);
    }

    /**
     * Call Twitter api
     *
     * @param array $params
     * @return array
     */
    protected function _callApi(array $params)
    {
        $curl = curl_init();
        curl_setopt_array($curl,$params);
        curl_setopt($curl, CURLOPT_HEADER, 0);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, self::DEFAULT_TIMEOUT);
        $response = curl_exec($curl);
        return json_decode($response,true);
    }

    /**
     * @param string $resource
     * @return string
     */
    private function _prepareUrl($resource)
    {
        return self::TWITTER_API_URL . '/' . self::TWITTER_API_VERSION . '/' . ltrim($resource,'/') . '.json';
    }
}