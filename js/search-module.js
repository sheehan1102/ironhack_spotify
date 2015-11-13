var searchModule = (function () {

	var url = 'https://api.spotify.com/v1/';

	var receiveArtistsData = function (data) {
		data.artists.items.forEach(function (artist) {
			if (artist.images.length) {
				$('#results ul').append("<li><img src='" + artist.images[artist.images.length - 1].url + "' /><p><a artist-id='" + artist.id + "' class='artist-link'>" + artist.name + "</a></p></li>"
				);
			}
		});
	};

	var receiveAlbumsData = function (data) {
		data.items.forEach(function (album) {
			$("#albums ul").append("<li><img src='" + album.images[album.images.length - 1].url + "' /><p><a album-id='" + album.id + "' class='album-link' target='_blank'>" + album.name + "</a></p></li>");
		});
	};

	var receiveAlbumInfo = function (data) {
		$(".modal-title").html(data.name);
		$(".modal-body ul").html('');
		data.tracks.items.forEach(function (track) {
			$(".modal-body ul").append('<li><a href="' + track.preview_url + '" target="_blank">' + track.name + '</a></li>');
		});
		$('#album-modal').modal();
	};

	var searchArtists = function (query) {
		var apiQuery = url + "search?type=artist&query=" + query;
		$.get(apiQuery, receiveArtistsData);
	};

	var searchAlbums = function (artistId) {
		var apiQuery = url + "artists/" + artistId + "/albums";
		$.get(apiQuery, receiveAlbumsData);
	};

	var albumInfo = function (albumId) {
		var apiQuery = url + 'albums/' + albumId;
		$.get(apiQuery, receiveAlbumInfo);
	};

	return {
		publicArtistSearch: searchArtists,
		publicAlbumsSearch: searchAlbums,
		publicAlbumInfo: albumInfo
	};
})();




