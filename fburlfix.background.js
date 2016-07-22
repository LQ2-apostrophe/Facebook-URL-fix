
// Attach URL filter
var filter = {
	urls: ["http://*.facebook.com/*", "https://*.facebook.com/*"],
	types: ["main_frame", "sub_frame"],
};
var extraInfoSpec = ['blocking'];

chrome.webRequest.onBeforeRequest.addListener(function(details) {
	var nUrl = details.url;
	var nUrltmp = fuf.stripQueries(details.url);
	if ( nUrltmp ) {
		console.log('Facebook URL fix did strip most query parameters on "' + details.url + '".');
		nUrl = nUrltmp;
	}
	nUrltmp = fuf.stripQuerySet(nUrl);
	if ( nUrltmp ) {
		console.log('Facebook URL fix did strip query parameter SET on "' + details.url + '".');
		nUrl = nUrltmp;
	}
	nUrltmp = fuf.stripQueryId(nUrl);
	if ( nUrltmp ) {
		console.log('Facebook URL fix did strip query parameter ID on "' + details.url + '".');
		nUrl = nUrltmp;
	}
	nUrltmp = fuf.stripQueryPrivacySource(nUrl);
	if ( nUrltmp ) {
		console.log('Facebook URL fix did strip query parameter PRIVACY_SOURCE on "' + details.url + '".');
		nUrl = nUrltmp;
	}
	nUrltmp = fuf.forceLegacyPhotoUrl(nUrl);
	if ( nUrltmp ) {
		console.log('Facebook URL fix did change the following URL to legacy style: ' + details.url);
		nUrl = nUrltmp;
	}
	if ( nUrl ) {
		return {redirectUrl: nUrl};
	}
}, filter, extraInfoSpec);
