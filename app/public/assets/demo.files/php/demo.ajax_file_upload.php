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


	if(isset($_POST) && !empty($_POST))
		print_r($_POST); 	// params

	if(isset($_FILES) && !empty($_FILES))
		print_r($_FILES); 	// files

	die;



	/**


		UPLOADED FILES RECOMMENDED RESPONSE
			** to enable delete button & reorder

		$response = array(

			// file_list array containing uploaded files: 
			// 1. original file name (optional but required if internal id is empty or 0)
			// 2. internal id (int and/or string)
			'file_list'	=> array(

				// original file name 		internal id
				'orig_file_name_1.jpg'		=> 1,
				'orig_file_name_2.jpg'		=> 345,

			),

			// more stuff for callback (if used)
			'something_else'	=> array(),

		);

		echo json_encode($response);
		exit;

	**/
?>