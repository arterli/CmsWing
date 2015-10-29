!function ($) {

  $(function(){
		map = new GMaps({
			div: '#gmap_geocoding',
			lat: 37.77493,
			lng: -122.419416,
			zoom: 4
		});

		map.addMarker({
			lat: 37.77493,
			lng: -122.419416,
			title: 'Marker',
			infoWindow: {
				content: 'Info content here...'
			}
		});

		$('#geocoding_form').submit(function(e){
			e.preventDefault();
			GMaps.geocode({
			  address: $('#address').val().trim(),
			  callback: function(results, status){
			    if(status=='OK'){
			      var latlng = results[0].geometry.location;
			      map.setCenter(latlng.lat(), latlng.lng());
			      map.addMarker({
			        lat: latlng.lat(),
			        lng: latlng.lng()
			      });
			    }
			  }
			});
		});

		$('#start_travel').click(function(e){
			$('#instructions').html('');
		  e.preventDefault();
		  map.setZoom(8);
		  map.travelRoute({
		    origin: [37.77493,-122.419416],
		    destination: [37.339386,-121.894955],
		    travelMode: 'driving',
		    step: function(e){
		      $('#instructions').append('<li><i class="fa-li fa fa-map-marker fa-lg icon-muted"></i> '+e.instructions+'</li>');
		      $('#instructions li:eq('+e.step_number+')').delay(450*e.step_number).fadeIn(200, function(){
		        map.setCenter(e.end_location.lat(), e.end_location.lng());
		        map.drawPolyline({
		          path: e.path,
		          strokeColor: '#131540',
		          strokeOpacity: 0.6,
		          strokeWeight: 4
		        });
		      });
		    }
		  });
		});

  });
}(window.jQuery);