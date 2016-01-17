<?php 

/**
 * Facebook
 *
 * with help of the API this class delivers album images from Facebook
 *
 * @package    socialstreams
 * @subpackage socialstreams/facebook
 * @author     ThemePunch <info@themepunch.com>
 */

class TP_facebook {
	/**
	 * Get User ID from its URL
	 *
	 * @since    1.0.0
	 * @param    string    $user_url URL of the Page
	 */
	public function get_user_from_url($user_url){
		$theid = str_replace("https", "", $user_url);
		$theid = str_replace("http", "", $theid);
		$theid = str_replace("://", "", $theid);
		$theid = str_replace("www.", "", $theid);
		$theid = str_replace("facebook", "", $theid);
		$theid = str_replace(".com", "", $theid);
		$theid = str_replace("/", "", $theid);
		$theid = explode("?", $theid);
		return $theid[0];
	}

	/**
	 * Get Photosets List from User
	 *
	 * @since    1.0.0
	 * @param    string    $user_id 	Facebook User id (not name)
	 * @param    int       $item_count 	number of photos to pull
	 */
	public function get_photo_sets($user_id,$item_count=10){
		//photoset params
		$url = "https://graph.facebook.com/$user_id/albums";
		$photo_sets_list = json_decode(file_get_contents($url));
		return $photo_sets_list->data;
	}

	/**
	 * Get Photoset Photos
	 *
	 * @since    1.0.0
	 * @param    string    $photo_set_id 	Photoset ID
	 * @param    int       $item_count 	number of photos to pull
	 */
	public function get_photo_set_photos($photo_set_id,$item_count=10){
		$url = "https://graph.facebook.com/v2.0/$photo_set_id?fields=photos";
		$photo_set_photos = json_decode(file_get_contents($url));
		return $photo_set_photos->photos->data;
	}

	/**
	 * Get Feed
	 *
	 * @since    1.0.0
	 * @param    string    $user 	User ID
	 * @param    int       $item_count 	number of itmes to pull
	 */
	public function get_post_feed($user,$app_id,$app_secret,$item_count=10){
		$oauth = file_get_contents("https://graph.facebook.com/oauth/access_token?type=client_cred&client_id=".$app_id."&client_secret=".$app_secret);
		$url = "https://graph.facebook.com/$user/feed?".$oauth."&fields=id,from,message,picture,link,name,icon,privacy,type,status_type,object_id,application,created_time,updated_time,is_hidden,is_expired,likes,comments";
		$feed = json_decode(file_get_contents($url));
		return $feed->data;
	}

	/**
	 * Decode URL from feed
	 *
	 * @since    1.0.0
	 * @param    string    $url 	facebook Output Data
	 */
	public static function decode_facebook_url($url) {
		$url = str_replace('u00253A',':',$url);
		$url = str_replace('\u00255C\u00252F','/',$url);
		$url = str_replace('u00252F','/',$url);
		$url = str_replace('u00253F','?',$url);
		$url = str_replace('u00253D','=',$url);
		$url = str_replace('u002526','&',$url);
		return $url;
	}
}
?>