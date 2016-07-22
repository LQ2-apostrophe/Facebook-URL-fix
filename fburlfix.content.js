
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
		var nUrl = url;
		var nUrltmp = fuf.stripQueries(url);
		if ( nUrltmp ) {
			console.log('Facebook URL fix did strip most query parameters on "' + url + '".');
			nUrl = nUrltmp;
		}
		nUrltmp = fuf.stripQuerySet(nUrl);
		if ( nUrltmp ) {
			console.log('Facebook URL fix did strip query parameter SET on "' + url + '".');
			nUrl = nUrltmp;
		}
		nUrltmp = fuf.stripQueryId(nUrl);
		if ( nUrltmp ) {
			console.log('Facebook URL fix did strip query parameter ID on "' + url + '".');
			nUrl = nUrltmp;
		}
		nUrltmp = fuf.stripQueryPrivacySource(nUrl);
		if ( nUrltmp ) {
			console.log('Facebook URL fix did strip query parameter PRIVACY_SOURCE on "' + url + '".');
			nUrl = nUrltmp;
		}
		nUrltmp = fuf.forceLegacyPhotoUrl(nUrl);
		if ( nUrltmp ) {
			console.log('Facebook URL fix did change the following URL to legacy style: ' + url);
			nUrl = nUrltmp;
		}
		if ( nUrl != url ) {
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
