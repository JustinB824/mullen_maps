var map;
var initCenter = new google.maps.LatLng(42.35828,-71.05417);
var initZoom = 8;
var initType = google.maps.MapTypeId.ROADMAP;
var storedAddresses = new Array();
var infowindow;

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
			center: initCenter,
			zoom: initZoom,
			scrollwheel: false,
			mapTypeId: initType
		};
		map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
		
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
	
	return address;
}

function LoadMarkers(obj) {
	var stored = {};
	var pos = ParseCoords(obj.address_coords);
	var name = obj.first_name + ' ' + obj.last_name;
	var address = obj.address_text;

	var marker = new google.maps.Marker({
		position: pos,
		title: name,
		content: address
	});
	
	marker.setMap(map);
	
	stored.id = obj.id;
	stored.marker = marker;
	storedAddresses.push(stored);

	google.maps.event.addListener(marker, 'mouseover', function(event) {
		$('#angularUsers tr[data-id=' + obj.id + ']').addClass('info');
	});
	google.maps.event.addListener(marker, 'mouseout', function(event) {
		$('#angularUsers tr[data-id=' + obj.id + ']').removeClass('info');
	});

	google.maps.event.addListener(marker, 'click', function(event) {
		ZoomWithWindow(marker, 17);
	});
}

function FindAddress(id) {
	for (var i = 0; i < storedAddresses.length; i++) {
		if (storedAddresses[i].id == id) {
			return storedAddresses[i];			
		}
	}
	return null;
}

function ZoomWithWindow(obj, zoom) {
	if (infowindow) {
		infowindow.close();
	}
	infowindow = new google.maps.InfoWindow({
		content: obj.content
	});

	map.setZoom(zoom);
	map.panTo(obj.position);
	infowindow.open(map, obj);
}

function ResetMap() {
	map.setZoom(initZoom);
	map.panTo(initCenter);
	map.setMapTypeId(initType);
	if (infowindow) {
		infowindow.close();
	}
}
