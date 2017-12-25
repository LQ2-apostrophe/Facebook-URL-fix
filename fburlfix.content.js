(function() {

	// Only for top frame
	try {
		if ( location.href != top.location.href ) {
			return;
		}
	}
	catch (ex) {
		return;
	}

	// Local logic
	function replaceQuery(url) {
		var nUrl = fuf.fixUrl(url);
		if ( nUrl ) {
			console.log('Facebook URL fix did its thing on this URL:\n' + url + '\nNew URL:\n' + nUrl);
			history.replaceState({}, '', nUrl);
		}
	}

	// 'Listen' for URL changes (pushState, replaceState, hash)
	var href = location.href;
	function checkQuery() {
		if ( location.href != href ) {
			href = location.href;
			replaceQuery(href);
		}

		requestAnimationFrame(checkQuery);
	}
	requestAnimationFrame(checkQuery);

})();
