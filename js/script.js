$(function() {

	$('#section-options').change(function(event) {
    event.preventDefault();
		console.log('this worked');
		
		var chosenSection = $('#section-options option').filter(':selected').val();
		console.log(chosenSection);

		var url = "https://api.nytimes.com/svc/topstories/v2/" + chosenSection + ".json";
		url += '?' + $.param({
			'api-key': "e44f8396e12a4c7c86f4a9cc6884330e"
		});
		console.log(url);
		
	// Header changes

	// Loading gif
		$('.generated-stories').before('<img src="./assets/images/ajax-loader.gif" alt="loading" id="loading-gif">');

		var storiesList = '';

	// Request stories
		$.ajax({
			method: 'GET',
			url: url,
		}).done(function(data) {
			$.each(data.results, function(index, value) {

				console.log(data);

				// storiesList +=  '<img src="' + value.artworkUrl100 + '"/img>' + value.collectionName + '</li>'
			});
		});

	});
});