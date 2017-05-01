$(function () {
	$('select').selectric();

  $('#section-options').change(function (event) {
		event.preventDefault();

		var chosenSection = $('#section-options option').filter(':selected').val();
		var url = 'https://api.nytimes.com/svc/topstories/v2/' + chosenSection + '.json';
		url += '?' + $.param({
			'api-key': 'e44f8396e12a4c7c86f4a9cc6884330e'
		});
		$('.generated-stories').empty();

		// Header changes
		$('div.landing-header').removeClass('landing-header').addClass('stories-header');

		// Loading gif
		$('.loading-gif').append('<img src="./assets/images/ajax-loader.gif" alt="loading" id="loading-gif">');

		var storiesList = [];

		// Request stories
		$.ajax({
			method: 'GET',
			url: url,
		}).done(function (data) {
			var filtered = data.results
				.filter(function(el) {
					return el.multimedia.length;
				})
				.slice(0, 12);

			$.each(filtered, function (index, value) {
				storiesList.push(
					'<li class="story">' + '<a href="' + value.url + '" target="_blank">' + '<div style="background-image: url(\'' + value.multimedia[4].url + '\')" class="image-container">' +  '<p>' + value.abstract + '</p>' + '</div>' + '</a>' + '</li>')
			});

			var firstTwelve = storiesList.join('');
			$('.generated-stories').append(firstTwelve);
		}).fail(function () {
			$('.generated-stories').append('Sorry. Looks like something isn\'t working right!');
		}).always(function () {
			$('#loading-gif').remove();
		});
	});
});