<?php 
	/** **********************************************************
 	 *
 	 *	DEMO/DEBUG ONLY
 	 *
	********************************************************** **/

	/*

		CHECK YOUR CONSOLE WHEN TESTING AJAX UPLOADER!
		All received params from ajax post are visible in there!

	*/

	if(isset($_GET) && !empty($_GET))
		print_r($_GET); 	// params

	if(isset($_POST) && !empty($_POST))
		print_r($_POST); 	// params

	if(isset($_FILES) && !empty($_FILES))
		print_r($_FILES); 	// files

	die;

?>