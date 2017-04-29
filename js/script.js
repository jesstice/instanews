$(function () {

	$('#section-options').change(function (event) {
		event.preventDefault();

		var chosenSection = $('#section-options option').filter(':selected').val();
		var url = 'https://api.nytimes.com/svc/topstories/v2/' + chosenSection + '.json';
		url += '?' + $.param({
			'api-key': 'e44f8396e12a4c7c86f4a9cc6884330e'
		});
		$('.generated-stories').empty();

		// Header changes


		// Loading gif
		$('.loading-gif').append('<img src="./assets/images/ajax-loader.gif" alt="loading" id="loading-gif">');

		var storiesList = [];

		// Request stories
		$.ajax({
			method: 'GET',
			url: url,
		}).done(function (data) {
			$.each(data.results, function (index, value) {
				
				if (value.multimedia.length !== 0) {
					storiesList.push(
						'<li class="story">' + '<a href="' + value.url + '" target="_blank">' + '<div style="background-image: url(\'' + value.multimedia[4].url + '\')" class="image-container">' +  '<p>' + value.abstract + '</p>' + '</div>' + '</a>' + '</li>');

					// $('.image-container').css('background-image', 'url("https://static.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg")');

				}
			});
			var firstTwelve = storiesList.slice(0, 12).join('');
			$('.generated-stories').append(firstTwelve);
		}).fail(function () {
			$('.generated-stories').append('Sorry. Looks like something isn\'t working right!');
		}).always(function () {
			$('#loading-gif').remove();
		});

	});
});

						// '<li class="story">' + '<div class="image-container">' + '<img class="story-image" src="' + value.multimedia[4].url + '"/>' + '</div>' + '<p>' + value.abstract + '</p>' + '</li>');