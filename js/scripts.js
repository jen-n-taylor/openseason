
// SCRIPTS -------------------------------------------------

// TO DO 
// - add error handling
// - consistent quotations
// - change loading screen to fade-in and make it "loading ... "
// - turn arrays into objects with images??
// fix MA 
// figuring out month based on js date!
// - change all markets to all months and set to default
// try produce as ajax json call (put in js file as produce.json...)



var marketApp = {};

// TORONTO FARMERS MARKET API--------------------------------
marketApp.tfmURL = 'https://sheetsu.com/apis/v1.0/f6cd8cab8160';
marketApp.tfmKey = 'EE5Au2q19xrzmfsqY2eR';
marketApp.tfmSecret = 'osmZgpP2ZLSqLngQFF3N4ToJPUWHXga7WjuRGHSy';


// SEASONAL PRODUCE ------------------------------------------
// Data taken from https://www.ontario.ca/foodland/page/availability-guide

var seasonalProduce = { 

	AllMarkets: ["Find out what produce is in season <a href='https://www.ontario.ca/foodland/page/availability-guide.'>here</a>."],

	January: ["Apples", "Rhubarb", "Beets", "Cabbage", "Carrots", "Garlic", "Leeks", "Mushrooms", "Onions (red)", "Parsnips", "Potatoes", "Rutabaga", "Sprouts", "Squash", "Sweet potatoes" ],

	February: ["Apples", "Rhubarb", "Beets", "Cabbage", "Carrots", "Garlic", "Leeks", "Mushrooms", "Onions (red)", "Parsnips", "Potatoes", "Rutabaga", "Sprouts", "Squash", "Sweet potatoes" ],

	March: ["Apples", "Rhubarb", "Beets", "Cabbage", "Carrots", "Mushrooms", "Onions (red)", "Parsnips", "Potatoes", "Rutabaga", "Sprouts", "Squash", "Sweet potatoes" ],
	
	April: ["Apples", "Rhubarb", "Beets", "Cabbage", "Carrots", "Mushrooms", "Parsnips", "Potatoes", "Rutabaga", "Sprouts", "Sweet potatoes"],
	
	May: ["Apples", "Rhubarb", "Asparagus", "Carrots", "Mushrooms", "Potatoes", "Radishes", "Rutabaga", "Spinach", "Sprouts", "Sweet potatoes" ],
	
	June: ["Apples", "Cherries", "Rhubarb", "Strawberries", "Asparagus", "Beans", "Bok choy", "Broccoli", "Cabbage", "Cauliflower", "Cucumber", "Lettuce", "Mushrooms", "Onions (green)", "Peas (green)", "Peas (snow)", "Potatoes", "Radicchio", "Radishes", "Rutabaga", "Spinach", "Sprouts", "Summer Squash", "Sweet potatoes" ],

	July: ["Apricots", "Blueberries", "Cherries", "Currants", "Gooseberries", "Peaches", "Plums", "Raspberries", "Strawberries", "Watermelon", "Beans", "Beets", "Bok choy", "Broccoli", "Cabbage", "Carrots", "Cauliflower", "Celery", "Corn", "Cucumber", "Garlic", "Lettuce", "Mushrooms", "Onions (green)", "Peas (green)", "Peas (snow)", "Peppers (field)", "Potatoes", "Radicchio", "Radishes", "Rapini", "Rutabaga", "Spinach", "Sprouts", "Summer Squash", "Sweet potatoes", "Tomatoes", "Zucchini" ],

	August: ["Apples", "Apricots", "Blueberries", "Currants", "Gooseberries", "Grapes", "Nectarines", "Peaches", "Pears", "Plums", "Raspberries", "Watermelon", "Artichoke", "Beans", "Beets", "Bok choy", "Broccoli", "Cabbage", "Carrots", "Cauliflower", "Celery", "Corn", "Cucumber", "Eggplant", "Garlic", "Leeks", "Lettuce", "Mushrooms", "Onions (green)", "Parsnips", "Peas (snow)", "Peppers (field)", "Potatoes", "Radicchio", "Radishes", "Rapini", "Rutabaga", "Spinach", "Sprouts", "Squash", "Summer Squash", "Sweet potatoes", "Tomatoes", "Zucchini"],
	
	September: ["Apples", "Blueberries", "Cranberries", "Grapes", "Nectarines", "Peaches", "Pears", "Plums", "Raspberries", "Watermelon", "Artichoke", "Beans", "Beets", "Bok choy", "Broccoli", "Brussels Sprouts", "Cabbage", "Carrots", "Cauliflower", "Celery",  "Corn", "Cucumber", "Eggplant", "Garlic", "Leeks", "Lettuce", "Mushrooms", "Onions (green)", "Onions (red)", "Parsnips", "Peas (snow)", "Peppers (field)", "Potatoes", "Pumpkin", "Radishes", "Rapini", "Rutabaga", "Spinach", "Sprouts", "Squash", "Summer Squash", "Sweet potatoes", "Tomatoes", "Zucchini" ],
	
	October: ["Apples", "Cranberries", "Pears", "Plums", "Raspberries", "Artichoke", "Beans", "Beets", "Bok choy", "Broccoli", "Brussels Sprouts", "Cabbage", "Carrots", "Cauliflower", "Celery", "Corn", "Cucumber", "Eggplant", "Garlic", "Leeks", "Lettuce", "Mushrooms", "Onions (green)", "Onions (red)", "Parsnips", "Peppers (field)", "Potatoes", "Pumpkin", "Radishes", "Rapini", "Rutabaga", "Spinach", "Sprouts", "Squash", "Summer Squash", "Sweet potatoes", "Tomatoes", "Zucchini" ],
	
	November: ["Apples", "Cranberries", "Pears", "Beets", "Bok choy", "Brussels Sprouts", "Cabbage", "Carrots", "Cauliflower", "Garlic", "Leeks", "Mushrooms", "Onions (green)", "Onions (red)", "Parsnips", "Potatoes", "Radishes", "Rutabaga", "Sprouts", "Squash", "Sweet potatoes" ],

	December: ["Apples", "Pears", "Beets", "Cabbage", "Carrots", "Garlic", "Leeks", "Mushrooms", "Onions (red)", "Parsnips", "Potatoes", "Rutabaga", "Sprouts", "Squash", "Sweet potatoes" ]
	}

// -----------------------------------------------------------
// STEP 1: First we get the user's location and the month: 
marketApp.getLocation = function() {
	// Collecting user data
	$('#marketsForm').on('submit', function(e) {
		e.preventDefault();
		marketApp.usersLocation = $('input[name=address]').val();
		marketApp.userMonth = $('#month').val();
		// console.log(marketApp.usersLocation);

		marketApp.getUserGeolocation(); // Remember: This tells the browser that the next step is to go to this function.
		$('.in-season ul').empty();
		$('.in-season-container, .in-season, .map-container').show();
	});
};

// STEP 2: Next we translate the user's location into a geocode
marketApp.getUserGeolocation = function() {
	// First create a variable that will create a new Geocode
	var geoCoder = new google.maps.Geocoder;
	// Now we use this .geocode method to grab our user's location and then perform a function to turn it into a geocode.  
	geoCoder.geocode({address: marketApp.usersLocation}, function(res) {
		
		// Next we take the latitude and longitude and put it into a concise variable 
		marketApp.latlng = {
			lat: res[0].geometry.location.lat(),
			lng: res[0].geometry.location.lng()
		}
		marketApp.plotUserGeolocation();
	});
};

// STEP 3: Then we plot that geocode on a map.
marketApp.plotUserGeolocation = function() {

	// Creating the map object:
	marketApp.map = new google.maps.Map(document.getElementById('mapid'), {
          center: {lat:marketApp.latlng.lat, lng: marketApp.latlng.lng},
          zoom: 12,
          styles: [
          {"featureType":"landscape","stylers":[{"hue":"#FFA800"},{"saturation":0},{"lightness":0},{"gamma":1}]},
          {"featureType":"road.highway","stylers":[{"hue":"#53FF00"},{"saturation":-73},{"lightness":40},{"gamma":1}]},
          {"featureType":"road.arterial","stylers":[{"hue":"#FBFF00"},{"saturation":0},{"lightness":0},{"gamma":1}]},
          {"featureType":"road.local","stylers":[{"hue":"#00FFFD"},{"saturation":0},{"lightness":30},{"gamma":1}]},
          {"featureType":"water","stylers":[{"hue":"#00BFFF"},{"saturation":6},{"lightness":8},{"gamma":1}]},
          {"featureType":"poi","stylers":[{"hue":"#679714"},{"saturation":33.4},{"lightness":-25.4},{"gamma":1}]}
          ]
        });

	// Creating the map marker:
	var userMarker = "images/userMarker.png"
	marketApp.marker = new google.maps.Marker({
          map: marketApp.map,
          position: marketApp.latlng,
          title: 'You are here.',
          icon: userMarker
    });

    marketApp.findMarkets();

    // Loading Screen appears with a duration of 0 miliseconds 
    $('.loading-screen').fadeIn(0);
};

// STEP 4: Collect data from Toronto Farmers Markets API and send to .plotMarkets.
marketApp.findMarkets = function() {
	$.ajax({
		url: marketApp.tfmURL,
		headers: {
    		"Authorization": "Basic " + btoa(marketApp.tfmKey + ":" + marketApp.tfmSecret)
  		},
		dataType: 'json',
		method: 'GET'
	}).then(function(marketData){
		marketApp.plotMarkets(marketData)
	});
};

// STEP 5: Plot Toronto Farmers Markets on the map.
marketApp.plotMarkets = function(marketData) {

	var filteredData;

	if (marketApp.userMonth !== 'allMarkets') {

		filteredData = marketData.filter(function(market){ 
			return market[marketApp.userMonth] === "T";
		});

	} else {
		filteredData = marketData;
	}

	filteredData.forEach(function(market, index) {
 	
		// Creates Info Window & Populates with Info
		var infowindow = new google.maps.InfoWindow({
    		content: `<h2 class="map-title">${market.name}</h2> <p class="map-address">${market.address}</p> <p class="map-hours">${market.hours}</p> <a class="map-url" href="${market.url}">Visit Market</a>`
  		});

		// Creates Marker
		var farmerMarker = "images/farmers-market-marker.png";
 		
 		var marker = new google.maps.Marker({
          map: marketApp.map,
          position: {
          lat: parseFloat(market.lat),
          lng: parseFloat(market.lng)
          }, /* /. position */
          icon: farmerMarker
    	}); /* /. mapMarker */

 		// Displays Info Window on click
 		marker.addListener('click', function() {
    		infowindow.open(marketApp.map, marker);
  		});

	}); /* /.forEach */

	marketApp.seasonalProduce();

}; /* /.plotmarkets*/


// STEP 6: Display seasonal produce for selected month.
marketApp.seasonalProduce = function() {

	var freshProduce = seasonalProduce[marketApp.userMonth];

	// Puts seasonal produce on the page
	freshProduce.forEach(function(freshProduce) {
		var displayProduce = $('<li>').text(freshProduce);
		$('.in-season ul').append(displayProduce);
	});

	
	// // Empties seasonal produce container  
	// $('').on('click', function() {
	// }); 

	// Loading Screen fades out
	$('.loading-screen').fadeOut(1000, function(){
		$.smoothScroll({
			scrollTarget:".container-2"
		});
	});
};

// INITIALIZE -------------------------------------------
marketApp.init = function(){
	marketApp.getLocation();
};


// DOCUMENT READY ---------------------------------------
$(function() {
	marketApp.init();
});