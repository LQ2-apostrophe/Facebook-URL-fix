fuf = {
	fixUrl: function(url) {
		tokens = [
			// Include completely useless query parameters
			'fref',
			'cref',
			'ref',
			'fb_ref',
			'refid',
			'pnref',
			'fb_source',
			'hc_location',
			'refsource',
			'ref_type',
			'source_ref',
			'notif_t',
			'notif_id',
			'tsid',
			'source',
			'hsi',
			'rid',
			'qid',
			'rt',
			'rf',
			'rc',
			'from_bookmark',
			'__tn__',
			'__xt__',
			'mf_story_key',
			'mt_nav',
			'count',
			'fb_bmpos',
			'app_id',
			'story_id',
			'content_id',
			'entry_point',
			'video_source',
			'returnto'
		];

		darkTokens = [
			// Query parameters that are only used on some links
			'id',
			'fbid',
			'set',
			'privacy_source',
			'l',
			'type'
		];

		darkTokensUrlRegex = [
			// Regexs matching URLs where darkTokens are used. darkTokens[a] matches darkTokensUrlRegex[a].
			/^https:\/\/(?:www|web|m|mobile)\.facebook\.com\/(?:profile\.php|permalink\.php|(?:business\/)?help\/community\/question\/)\?/ig,
			/^https:\/\/(?:www|web|m|mobile)\.facebook\.com\/(?:photo\.php\?|login_alerts)/ig,
			/^https:\/\/(?:www|web|m|mobile)\.facebook\.com\/(?:media\/set\/|[a-z0-9\.]*\/media_set)\?/ig,
			/^https:\/\/(?:www|web)\.facebook\.com\/[a-z0-9.]*\/allactivity/ig,
			/^https:\/\/(?:m|mobile)\.facebook\.com/ig,
			/^https:\/\/(?:www|web|m|mobile)\.facebook\.com\/[a-z0-9.]*\/activity_feed\//ig
		];

		var oldLink = url;
		var newLink = oldLink;

		// Rule 1: Remove useless query parameters
		if (oldLink.indexOf('?') > 0 || oldLink.indexOf('#') > 0) {
			// Add more useless query parameters from darkTokens to tokens array
			var i;
			for (i = 0; i < darkTokens.length; i++) {
				if (!oldLink.match(darkTokensUrlRegex[i])) {
					tokens.push(darkTokens[i]);
				}
			}
			// Remove query parameters now
			var regex = new RegExp('([?&#])(?:' + tokens.join('|') + ')=[^&#]*', 'ig');
			newLink = newLink.replace(regex, '$1'); // Remove `name=value`
			if ( newLink != oldLink ) {
				newLink = newLink.replace(/([?&#])[?&#]+/g, '$1'); // Replace double ?&# by first occurring
				newLink = newLink.replace(/[?&#]+$/, ''); // Remove trailing ?&#
				oldLink = newLink;
			}
		}

		// Rule 2: Force legacy link for photos
		if (oldLink.match(/^https:\/\/(?:www|web|m|mobile)\.facebook\.com\/[a-z0-9\.]*\/photos\/[^\/]*\/[0-9]*/ig)) {
			if (oldLink.indexOf('?') > 0) { // Preserve existing queries
				newLink = newLink.replace(/[a-z0-9\.]*\/photos\/[^\/]*\/([0-9]*)\/\?/ig, 'photo.php?fbid=$1&');
			} else {
				newLink = newLink.replace(/[a-z0-9\.]*\/photos\/[^\/]*\/([0-9]*)\//ig, 'photo.php?fbid=$1');
				newLink = newLink.replace(/[a-z0-9\.]*\/photos\/[^\/]*\/([0-9]*)/ig, 'photo.php?fbid=$1');
			}
			oldLink = newLink;
		}

		// Rule 3: Shorten parameter SET on legacy a-type (SET has a value containing 'a.[something]') link for albums
		if (oldLink.match(/^https:\/\/(?:www|web|m|mobile)\.facebook\.com\/(?:media\/set\/|[a-z0-9\.]*\/media_set)\?/ig)) {
			// Parameter SET must be there
			if (oldLink.match(/[?&#]set=[^&#]*/ig)) {
				newLink = newLink.replace(/([?&#])set=[^&#]*a\.([0-9]*)[^&#]*/ig, '$1set=a.$2');
				oldLink = newLink;
			}
		}

		// Only return shortened link
		if ( newLink != url ) {
			return newLink;
		}
	}
};
