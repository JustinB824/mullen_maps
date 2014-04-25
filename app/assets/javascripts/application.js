// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap
//= require_tree .

var map;
var addressInput;
var autocomplete;
var newAddress;
var storedAddresses = new Array();

$(function() {

	$('#quickSubmit').click(function() {
		var marker = new google.maps.Marker({
			position: newAddress
		});
		
		marker.setMap(map);
	});
	
	$('#searchTextField').blur(function() {
		//if (!$('#user_address_coords').val()) {
			$('#searchTextField').val('');
		//}
	});
	
});

google.maps.event.addDomListener(window, 'load', Initialize);

function Initialize() {
	if ($('#searchTextField').length) {
		addressInput = document.getElementById('searchTextField');
		autocomplete = new google.maps.places.Autocomplete(addressInput);
		google.maps.event.addListener(autocomplete, 'place_changed', function() {
			SetLatLong();
		});
	}

	if ($('#googleMap').length) {
		var mapProp = {
			center: new google.maps.LatLng(42.35828,-71.05417),
			zoom: 9,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
		
		LoadMarkers();
	}
}

function SetLatLong() {
	var place = autocomplete.getPlace();
	newAddress = place.geometry.location;
	
	if ($('#user_address_coords')) {
		$('#user_address_coords').val(newAddress);
	}
}

function ParseCoords(ll) {
	ll = ll.replace('(', '').replace(')', '').trim();
	var coords = ll.split(',');
	var address = new google.maps.LatLng(Number(coords[0]), Number(coords[1]));
	
	storedAddresses.push(address);
}

function LoadMarkers() {
	$.each(storedAddresses, function() {
		var marker = new google.maps.Marker({
			position: this
		});
		
		marker.setMap(map);
	});
}
