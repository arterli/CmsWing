$(document).ready(function(){

	$('#basicuse').jflickrfeed({
		limit: 14,
		qstrings: {
			id: '37304598@N02'
		},
		itemTemplate: '<li><a href="{{image_b}}"><img src="{{image_s}}" alt="{{title}}" /></a></li>'
	});
	
	$('#cbox').jflickrfeed({
		limit: 14,
		qstrings: {
			id: '37304598@N02'
		},
		itemTemplate: '<li>'+
						'<a rel="colorbox" href="{{image}}" title="{{title}}">' +
							'<img src="{{image_s}}" alt="{{title}}" />' +
						'</a>' +
					  '</li>'
	}, function(data) {
		$('#cbox a').colorbox();
	});
	
	$('#cycle').jflickrfeed({
		limit: 14,
		qstrings: {
			id: '37304598@N02'
		},
		itemTemplate: '<li><img src="{{image}}" alt="{{title}}" /><div>{{title}}</div></li>'
	}, function(data) {
		$('#cycle div').hide();
		$('#cycle').cycle({
			timeout: 5000
		});
		$('#cycle li').hover(function(){
			$(this).children('div').show();
		},function(){
			$(this).children('div').hide();
		});
	});
	
	$('#nocallback').jflickrfeed({
		limit: 4,
		qstrings: {
			id: '37304598@N02'
		},
		useTemplate: false,
		itemCallback: function(item){
			$(this).append("<li><img src='" + item.image_m + "' alt=''/></li>");
		}
	});

});