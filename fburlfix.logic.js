fuf = {
	tokens: [
		// Facebook tracking query parameters (can be safely stripped)
		'fref',
		'cref',
		'ref',
		'fb_ref',
		'refid',
		'pnref',
		'fb_source',
		'refsource',
		'ref_type',
		'source_ref',
		'notif_t',
		'notif_id',
		'tsid',
		'source',
		'type',
		'hsi',
		'rid',
		'qid',
		'rt',
		'rf',
		'from_bookmark',
		'__tn__',
		'__xt__',
		'mf_story_key',
		'mt_nav',
		'count',
		'fb_bmpos',
		'app_id',
		'entry_point',
		'video_source',
		'returnto'
	],

	stripQueries: function(url) {
		if (url.indexOf('?') > 0 || url.indexOf('#') > 0) {
			var regex = new RegExp('([?&#])(?:' + fuf.tokens.join('|') + ')=[^&#]*', 'ig');
			var filtered = url;
			filtered = filtered.replace(regex, '$1'); // Remove `name=value`
			if ( filtered != url ) {
				filtered = filtered.replace(/([?&#])[?&#]+/g, '$1'); // Replace double ?&# by first occurring
				filtered = filtered.replace(/[?&#]+$/, ''); // Remove trailing ?&#
				return filtered;
			}
		}
	},

	forceLegacyPhotoUrl: function(url) {
		if (url.match(/^(?:http|https):\/\/(?:www|web|m|mobile)\.facebook\.com\/[a-z0-9.]*\/photos\/[^#\?\/]*\/[0-9]*/ig)) {
			var newUrl = url;
			// Strip FBID parameter (not needed)
			newUrl = newUrl.replace(/([?&#])fbid=[^&#]*/ig, '$1') // Remove `FBID=value`
			if ( newUrl != url ) {
				newUrl = newUrl.replace(/([?&#])[?&#]+/g, '$1'); // Replace double ?&# by first occurring
				newUrl = newUrl.replace(/[?&#]+$/, ''); // Remove trailing ?&#
			}
			// Rewrite legacy photo URL
			if (url.indexOf('?') > 0) {
				newUrl = newUrl.replace(/[^\/]*\/photos\/[^\/]*\/([^\/]*)\/\?/ig, 'photo.php?fbid=$1&'); // Preserve existing queries
			} else {
				newUrl = newUrl.replace(/[^\/]*\/photos\/[^\/]*\/([^\/]*)\//ig, 'photo.php?fbid=$1'); // Knockout trailing slash
				newUrl = newUrl.replace(/[^\/]*\/photos\/[^\/]*\/([^\/]*)/ig, 'photo.php?fbid=$1'); // Ideal situation (no queries)
			}
			return newUrl;
		}
	},

	stripQuerySet: function(url) {
		// Strip SET parameter from legacy photo.php links
		if (url.match(/^(?:http|https):\/\/(?:www|web|m|mobile)\.facebook\.com\/photo\.php\?/ig)) {
			var newUrl = url;
			// Strip SET parameter (not needed)
			newUrl = newUrl.replace(/([?&#])set=[^&#]*/ig, '$1') // Remove `SET=value`
			if ( newUrl != url ) {
				newUrl = newUrl.replace(/([?&#])[?&#]+/g, '$1'); // Replace double ?&# by first occurring
				newUrl = newUrl.replace(/[?&#]+$/, ''); // Remove trailing ?&#
				return newUrl;
			}
		}
	},

	stripQueryId: function(url) {
		// Strip query parameter ID on all links except profile.php
		if (!url.match(/^(?:http|https):\/\/(?:www|web|m|mobile)\.facebook\.com\/profile\.php\?/ig)) {
			var newUrl = url;
			// Strip SET parameter (not needed)
			newUrl = newUrl.replace(/([?&#])id=[^&#]*/ig, '$1') // Remove `SET=value`
			if ( newUrl != url ) {
				newUrl = newUrl.replace(/([?&#])[?&#]+/g, '$1'); // Replace double ?&# by first occurring
				newUrl = newUrl.replace(/[?&#]+$/, ''); // Remove trailing ?&#
				return newUrl;
			}
		}
	},

	stripQueryPrivacySource: function(url) {
		// Strip query parameter PRIVACY_SOURCE on all places except at Home of desktop site
		if (!url.match(/^(?:http|https):\/\/(?:www|web)\.facebook\.com\/[a-z0-9.]*\/allactivity/ig)) {
			var newUrl = url;
			// Strip SET parameter (not needed)
			newUrl = newUrl.replace(/([?&#])privacy_source=[^&#]*/ig, '$1') // Remove `SET=value`
			if ( newUrl != url ) {
				newUrl = newUrl.replace(/([?&#])[?&#]+/g, '$1'); // Replace double ?&# by first occurring
				newUrl = newUrl.replace(/[?&#]+$/, ''); // Remove trailing ?&#
				return newUrl;
			}
		}
	}
};
