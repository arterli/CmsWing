<?php 
include 'RestApi.php';
/**
 * Twitter
 *
 * with help of the API this class delivers all kind of tweeted images from twitter
 *
 * @package    socialstreams
 * @subpackage socialstreams/twitter
 * @author     ThemePunch <info@themepunch.com>
 */

class TP_twitter {

  /**
   * Consumer Key
   *
   * @since    1.0.0
   * @access   private
   * @var      string    $consumer_key    Consumer Key
   */
  private $consumer_key;

  /**
   * Consumer Secret
   *
   * @since    1.0.0
   * @access   private
   * @var      string    $consumer_secret    Consumer Secret
   */
  private $consumer_secret;

  /**
   * Access Token
   *
   * @since    1.0.0
   * @access   private
   * @var      string    $access_token    Access Token
   */
  private $access_token;

  /**
   * Access Token Secret
   *
   * @since    1.0.0
   * @access   private
   * @var      string    $access_token_secret    Access Token Secret
   */
  private $access_token_secret;

  /**
   * Initialize the class and set its properties.
   *
   * @since    1.0.0
   * @param      string    $api_key flickr API key.
   */
  public function __construct($consumer_key,$consumer_secret,$access_token,$access_token_secret) {
    $this->consumer_key         =   $consumer_key;
    $this->consumer_secret      =   $consumer_secret;
    $this->access_token         =   $access_token;
    $this->access_token_secret  =   $access_token_secret;
  }

  /**
   * Get Tweets
   *
   * @since    1.0.0
   * @param    string    $twitter_account   Twitter account without trailing @ char
   */
  public function get_public_photos($twitter_account){
    $twitter = new \TwitterPhp\RestApi($this->consumer_key,$this->consumer_secret,$this->access_token,$this->access_token_secret);
    /*
     * Connect as application
     * https://dev.twitter.com/docs/auth/application-only-auth
     */
    $connection = $twitter->connectAsApplication();

    /*
     * Collection of the most recent Tweets posted by the user indicated by the screen_name, without replies
     * https://dev.twitter.com/docs/api/1.1/get/statuses/user_timeline
     */
    $tweets = $connection->get('/statuses/user_timeline',array('screen_name' => $twitter_account,  'entities' => 1, 'trim_user' => 0 , 'exclude_replies' => 'true'));
    //var_dump($tweets);
    return $tweets;
  }


  /**
   * Find Key in array and return value (multidim array possible)
   *
   * @since    1.0.0
   * @param    string    $key   Needle
   * @param    array     $form  Haystack
   */
  public static function array_find_element_by_key($key, $form) {
      if (array_key_exists($key, $form)) {
        $ret =& $form[$key];
        return $ret;
      }
      foreach ($form as $k => $v) {
        if (is_array($v)) {
          $ret =TP_twitter::array_find_element_by_key($key, $form[$k]);
          if ($ret) {
            return $ret;
          }
        }
      }
      return FALSE;
  }

  /**
   * Prepare output array $stream
   *
   * @since    1.0.0
   * @param    string    $tweets  Twitter Output Data
   */
  public static function makeClickableLinks($s) {
    return preg_replace('@(https?://([-\w\.]+[-\w])+(:\d+)?(/([\w/_\.#-]*(\?\S+)?[^\.\s])?)?)@', '<a href="$1" target="_blank">$1</a>', $s);
  }
  
}
?>