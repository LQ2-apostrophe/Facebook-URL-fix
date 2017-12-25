// Attach URL filter
var filter = {
	urls: ["*://*.facebook.com/*"],
	types: ["main_frame", "sub_frame"],
};
var extraInfoSpec = ['blocking'];

chrome.webRequest.onBeforeRequest.addListener(function(details) {
	var nUrl = fuf.fixUrl(details.url);
	if ( nUrl ) {
		console.log('Facebook URL fix did its thing on this URL:\n' + details.url + '\nNew URL:\n' + nUrl);
		return {redirectUrl: nUrl};
	}
}, filter, extraInfoSpec);
