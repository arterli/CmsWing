<?php 

/**
 * Youtube
 *
 * with help of the API this class delivers all kind of Images/Videos from youtube
 *
 * @package    socialstreams
 * @subpackage socialstreams/youtube
 * @author     ThemePunch <info@themepunch.com>
 */

class TP_youtube {

	/**
	 * API key
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $api_key    Youtube API key
	 */
	private $api_key;

	/**
	 * Channel ID
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $channel_id    Youtube Channel ID
	 */
	private $channel_id;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $api_key	Youtube API key.
	 */
	public function __construct($api_key,$channel_id) {
		$this->api_key = $api_key;
		$this->channel_id = $channel_id;
	}


	/**
	 * Get Youtube Playlists
	 *
	 * @since    1.0.0
	 */
	public function get_playlists(){
		//call the API and decode the response
		$url = "https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=".$this->channel_id."&key=".$this->api_key;
		$rsp = json_decode(file_get_contents($url));
		return $rsp->items;
	}

	/**
	 * Get Youtube Playlist Items
	 *
	 * @since    1.0.0
	 * @param    string    $playlist_id 	Youtube Playlist ID
	 * @param    integer    $count 	Max videos count
	 */
	public function show_playlist_videos($playlist_id,$count=50){
		//call the API and decode the response
		$url = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=".$playlist_id."&maxResults=".$count."&fields=items%2Fsnippet&key=".$this->api_key;
		$rsp = json_decode(file_get_contents($url));
		return $rsp->items;
	}

	/**
	 * Get Youtube Channel Items
	 *
	 * @since    1.0.0
	 * @param    integer    $count 	Max videos count
	 */
	public function show_channel_videos($count=50){
		//call the API and decode the response
		$url = "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=".$this->channel_id."&maxResults=".$count."&key=".$this->api_key."&order=date";
		echo $url;
		$rsp = json_decode(file_get_contents($url));
		return $rsp->items;
	}
}
?>