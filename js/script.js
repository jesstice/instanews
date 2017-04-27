$(function() {

	$('#section-options').change(function(event) {
    event.preventDefault();
		
		var chosenSection = $('#section-options option').filter(':selected').val();

		var url = 'https://api.nytimes.com/svc/topstories/v2/' + chosenSection + '.json';
		url += '?' + $.param({
			'api-key': 'e44f8396e12a4c7c86f4a9cc6884330e'
		});
		
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
				for (var i = 0; i < 12; i++ ) {
					if (value['multimedia']['url'] != '' ) {
						storiesList += value.abstract;						
					}
				}
				// '<img src="' + value.artworkUrl100 + '"/img>'
			});
			console.log(storiesList);
			// $('.generated-stories').append(storiesList);
		}).fail(function() {
			$('.generated-stories').append('Sorry. Looks like something isn\'t working right!');
		}).always(function() {
			$('#loading-gif').remove();
		});

	});
});