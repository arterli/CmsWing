<?php
/**
 * @author   Albert Kozlowski <vojant@gmail.com>
 * @license  MIT License
 * @link     https://github.com/vojant/Twitter-php
 */

namespace TwitterPhp;

use \TwitterPhp\Connection\Application;
use \TwitterPhp\Connection\User;

require_once 'connection/ConnectionAbstract.php';
require_once 'connection/Application.php';
require_once 'connection/User.php';

/**
 * Class TwitterRestApiException
 */
class RestApiException extends \Exception {};

/**
 * Class RestApi
 * @package TwitterPhp
 */
class RestApi
{
    /**
     * @var string
     */
    private $_consumerKey;

    /**
     * @var string
     */
    private $_consumerSecret;

    /**
     * @var string
     */
    private $_accessToken;

    /**
     * @var string
     */
    private $_accessTokenSecret;


    /**
     * @param string $consumerKey
     * @param string $consumerSecret
     * @param null|string $accessToken
     * @param null|string $accessTokenSecret
     * @throws TwitterRestApiException
     */
    public function __construct($consumerKey,$consumerSecret,$accessToken = null,$accessTokenSecret = null)
    {
        if (!function_exists('curl_init')) {
            throw new TwitterRestApiException('You must have the cURL extension enabled to use this library');
        }
        $this->_consumerKey = $consumerKey;
        $this->_consumerSecret = $consumerSecret;
        $this->_accessToken = $accessToken;
        $this->_accessTokenSecret = $accessTokenSecret;
    }

    /**
     * Connect to Twitter API as application.
     * @link https://dev.twitter.com/docs/auth/application-only-auth
     *
     * @return \TwitterPhp\Connection\Application
     */
    public function connectAsApplication()
    {
        return new Application($this->_consumerKey,$this->_consumerSecret);
    }

    /**
     * Connect to Twitter API as user.
     * @link https://dev.twitter.com/docs/auth/oauth/single-user-with-examples
     *
     * @return \TwitterPhp\Connection\User
     * @throws TwitterRestApiException
     */
    public function connectAsUser()
    {
        if (!$this->_accessToken || !$this->_accessTokenSecret) {
            throw new TwitterRestApiException('Missing ACCESS_TOKEN OR ACCESS_TOKEN_SECRET');
        }
        return new User($this->_consumerKey,$this->_consumerSecret,$this->_accessToken,$this->_accessTokenSecret);
    }

}