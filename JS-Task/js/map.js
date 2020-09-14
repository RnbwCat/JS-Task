function initMap() {
	let coordinates = new google.maps.LatLng (53.908097, 27.556681);
	let mapCanvas = document.querySelector("#map");
	let mapOptions = {
		center: coordinates,
		zoom: 12
	}
	let map = new google.maps.Map(mapCanvas, mapOptions);

	let markersArray = [];

	function makeMarker(lat, lng, title, content) {
		let marker = new google.maps.Marker({
			position: new google.maps.LatLng (lat, lng),
			map: map,
			title: title,
			content: content,
		});
		markersArray.push(marker);
	}

	makeMarker(53.908097, 27.556681, "Главный офис", "<h3>Главный офис</h3> <p><i>Адрес</i></p> <p>Описание Далеко-далеко за <br> словесными горами в стране.</p>");
	makeMarker(53.9273993,27.6042008, "Oфис", "<h3>Oфис</h3> <p><i>Адрес</i></p> <p>Описание Далеко-далеко за <br> словесными горами в стране.</p>");
	makeMarker(53.882226,27.5389363, "Oфис", "<h3>Oфис</h3> <p><i>Адрес</i></p> <p>Описание Далеко-далеко за <br> словесными горами в стране.</p>");
	makeMarker(53.942408,27.5535523, "Oфис", "<h3>Oфис</h3> <p><i>Адрес</i></p> <p>Описание Далеко-далеко за <br> словесными горами в стране.</p>");
	makeMarker(53.8938433,27.4816517, "Oфис", "<h3>Oфис</h3> <p><i>Адрес</i></p> <p>Описание Далеко-далеко за <br> словесными горами в стране.</p>");

	console.log(markersArray);

	for(let marker of markersArray) {
		marker.addListener("click", showInfoWindow);
		function showInfoWindow() {
			for(let key in marker) {
				let infoWindow = new google.maps.InfoWindow({
					content: marker.content
				});
				infoWindow.open(map, marker);
			}
		}
	}
}