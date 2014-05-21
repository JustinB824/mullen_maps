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
var emailRegEx = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
var storedAddresses = new Array();

$(function() {

	if ($('.users_form').length) {
		CheckValues();
	}
	
	$('.users_form .emptyVal').focus(function() {
		$(this).val('').removeClass('emptyVal');
		if ($(this).attr('placeholder')) {
			$(this).attr('placeholder', '');
		}
	});
	
	$('.users_form input:text').blur(function() {
		CheckValues();
	});
	
	$('.users_form form').on('submit', function(e) {
		Validation(e);
	});
	
	$(window).keydown(function(event){
		if (event.keyCode == 13) {
			if ($('#searchTextField').is(':focus')){
				event.preventDefault();
				return false;
			}
		}
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
			zoom: 8,
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

function CheckValues() {
	if ($('#user_first_name').val() == '') {
		$('#user_first_name').val('First Name').addClass('emptyVal');
	}
	if ($('#user_last_name').val() == '') {
		$('#user_last_name').val('Last Name').addClass('emptyVal');
	}
	if ($('#user_email').val() == '') {
		$('#user_email').val('Email').addClass('emptyVal');
	}
	if ($('#searchTextField').val() == '') {
		$('#searchTextField').attr('placeholder', 'Address').addClass('emptyVal');
	}
}

function Validation(e) {
		if (($('#user_first_name').hasClass('emptyVal')) || ($('#user_first_name').val().trim() == '')) {
			$('#fn_error').html('You must enter your First Name');
			e.preventDefault();
		}
		else {
			$('#fn_error').html('');
		}
		
		if (($('#user_last_name').hasClass('emptyVal')) || ($('#user_last_name').val().trim() == '')) {
			$('#ln_error').html('You must enter your Last Name');
			e.preventDefault();
		}
		else {
			$('#ln_error').html('');
		}

		if (($('#user_email').hasClass('emptyVal')) || ($('#user_email').val().trim() == '')) {
			$('#email_error').html('You must enter your Email Address');
			e.preventDefault();
		}
		else if (($('#user_email').val().trim() != '') && (!$('#user_email').hasClass('emptyVal')) && (!emailRegEx.test($('#user_email').val()))) {
			$('#email_error').html('Please enter a valid Email Address');
			e.preventDefault();
		}
		else {
			$('#email_error').html('');
		}
		
		if (($('#searchTextField').hasClass('emptyVal')) || ($('#searchTextField').val().trim() == '')) {
			$('#address_error').html('You must enter your Address or City');
			e.preventDefault();
		}
		else if (($('#searchTextField').val().trim() != '') && ($('#user_address_coords').val() == '')) {
			$('#address_error').html('You must select your location from the MapQuest dropdown options');
			e.preventDefault();
		}
		else {
			$('#address_error').html('');
		}
}
