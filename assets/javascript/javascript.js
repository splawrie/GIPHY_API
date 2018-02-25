$(function() {
	populateButtons(searchArray, 'searchButton', '#buttonsArea');
	console.log("Page Loaded");

})

var searchArray = ['Grand Teton National Park', 'Great Smoky Mountains National Park', 'Grand Canyon', 'Serengeti National Park', 'Hawaii Volcanoes National Park', 'Yellowstone National Park', 'Sequoia National Park', 'Rocky Mountain National Park', 'Yosemite National Park', 'Mount Rainier National Park', 'Zion National Park', 'Arches National Park', 'Great Barrier Reef', 'Joshua Tree National Park', 'Olympic National Park', 'Bryce Canyon National Park', 'Haleakala National Park', 'Kruger National Park', 'Capitol Reef National Park', 'Torres Del Paine National Park'];

//Add animal not working either

 function populateButtons(searchArray, classToAdd, areaToAddTo) {
  //this doesn't work
  console.log(searchArray);
 $(areaToAddTo).empty();
 	for (var i=0; i<searchArray.length;i++) {
 		var a = $('<button>');
 		a.addClass(classToAdd);
 		a.attr('data-type',searchArray[i]);
 		a.text(searchArray[i]);
 		$(areaToAddTo).append(a);
 	}
 }

   $(document).on('click', '.searchButton', function() {
 	 $('#searches').empty();
 	 var type = $(this).data('type');
 	  	 var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + type + '&api_key=GVITKYuCjEdmR264ze6m4fdjyy37ct8U&limit=10';


   	 $.ajax({url:queryURL,method:'GET'})
  	 .done(function(response){
  	 	//console.log(response);

  	 	//6.3 activity
  	 	for (var i=0; i<response.data.length;i++) {
  	 		var searchDiv = $('<div class="search-item">');
  	 		var rating = response.data[i].rating;
// 	 		console.log(rating);
 	 		var p = $('<p>').text('Rating: ' + rating);
 	 		var animated = response.data[i].images.fixed_height.url;
 // 	 		console.log(animated);
 	 		var still = response.data[i].images.fixed_height_still.url;
 	 		var image = $('<img>');
 // 	 		//console.log(image);
  	 		 image.attr('src', still);
  	 		 image.attr('data-still', still);
  	 		 image.attr('data-animated', animated);
 	 		   image.attr('data-state', 'still');
 // 	 		// The SSL certificate used to load resources from is distrusted
 	 		   image.addClass('searchImage');
 // 	 		// The SSL certificate used to load resources from is distrusted
  	 		searchDiv.append(p);
 	 		searchDiv.append(image);
 	 		$('#searches').append(searchDiv);
 	 	}


 	 })
  })

   $(document).on('click', '.searchImage', function(){
   		var state = $(this).attr('data-state');
   		if(state == 'still') {
   			$(this).attr('src',$(this).data('animated'));
   			$(this).attr('data-state','animated');
   		} else
   		{
   			$(this).attr('src',$(this).data('still'));
   			$(this).attr('data-state','still');
   		}
   })

 $('#search-form').on('submit', function(event) {
    event.preventDefault()
 	var newSearch = $('input').eq(0).val();
  	searchArray.push(newSearch);
  	populateButtons(searchArray, 'searchButton','#buttonsArea');
  	return false;
 })
