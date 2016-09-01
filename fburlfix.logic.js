fuf = {
	fixUrl: function(url) {
		tokens = [
			// Include completely useless query parameters
			'fref',
			'cref',
			'ref',
			'fb_ref',
			'hc_ref',
			'refid',
			'pnref',
			'fb_source',
			'fbs',
			'hc_location',
			'refsource',
			'ref_type',
			'ref_component',
			'ref_page',
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
			'sr',
			'from_bookmark',
			'__tn__',
			'__xt__',
			'mf_story_key',
			'mt_nav',
			'count',
			'fb_bmpos',
			'story_id',
			'content_id',
			'entry_point',
			'video_source',
			'returnto'
		];

		darkTokens = [
			// Query parameters that are only used on some links
			'id',
			'app_id',
			'fbid',
			'set',
			'privacy_source',
			'l',
			'type'
		];

		darkTokensUrlRegex = [
			// Regexs matching URLs where darkTokens are used. darkTokens[a] matches darkTokensUrlRegex[a].
			/^https?:\/\/(?:www|web|m|mobile|mbasic)\.facebook\.com\/(?:profile\.php|permalink\.php|album\.php|(?:business\/)?help\/community\/question\/)\?/ig,
			/^https?:\/\/(?:www|web)\.facebook\.com\/[^\/]+\/dialog\/live_broadcast/ig,
			/^https?:\/\/(?:www|web|m|mobile|mbasic)\.facebook\.com\/(?:photo\.php\?|album\.php\?|login_alerts)/ig,
			/^https?:\/\/(?:www|web|m|mobile|mbasic)\.facebook\.com\/(?:media\/set\/|[a-z0-9.]+\/media_set)\?/ig,
			/^https?:\/\/(?:www|web)\.facebook\.com\/[a-z0-9.]+\/allactivity/ig,
			/^https?:\/\/(?:m|mobile|mbasic)\.facebook\.com/ig,
			/^https?:\/\/(?:www|web|m|mobile|mbasic)\.facebook\.com\/[a-z0-9.]+\/activity_feed\//ig
		];

		var oldLink = url;
		var newLink = oldLink;

		// Rule 1: Skip Facebook outbound redirection (and warning)
		if (oldLink.match(/^https?:\/\/(?:l|www|web|m|mobile|mbasic)\.facebook\.com\/l\.php\?/ig)) {
			// Query parameter U contains the original outbound link
			if (oldLink.match(/[?&#]u=[^&#]*/ig)) {
				newLink = decodeURIComponent(/[?&#]u=([^&#]*)/ig.exec(oldLink)[1]);
				oldLink = newLink;
				// Skip other rules if outbound link is truly outside Facebook
				if (!newLink.match(/^https?:\/\/.*\.facebook\.com/ig)) {
					return newLink;
				}
			}
		}

		// Rule 2: Remove useless query parameters
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

		// Rule 3: Force legacy link for photos
		if (oldLink.match(/^https?:\/\/(?:www|web|m|mobile)\.facebook\.com\/[a-z0-9.]+\/photos\/[^?&#\/]+\/[0-9]+/ig)) {
			if (oldLink.indexOf('?') > 0) { // Preserve existing queries
				newLink = newLink.replace(/[a-z0-9.]+\/photos\/[^?&#\/]+\/([0-9]+)\/\?/ig, 'photo.php?fbid=$1&');
			} else {
				newLink = newLink.replace(/[a-z0-9.]+\/photos\/[^?&#\/]+\/([0-9]+)\//ig, 'photo.php?fbid=$1');
				newLink = newLink.replace(/[a-z0-9.]+\/photos\/[^?&#\/]+\/([0-9]+)/ig, 'photo.php?fbid=$1');
			}
			oldLink = newLink;
		}

		// Rule 4: Shorten parameter SET on legacy a-type (SET has a value containing 'a.[something]') link for albums
		if (oldLink.match(/^https?:\/\/(?:www|web|m|mobile)\.facebook\.com\/(?:media\/set\/|[a-z0-9.]+\/media_set)\?/ig)) {
			// Parameter SET must be there
			if (oldLink.match(/[?&#]set=[^&#]*/ig)) {
				newLink = newLink.replace(/([?&#])set=[^&#]*a\.([0-9]+)[^&#]*/ig, '$1set=a.$2');
				oldLink = newLink;
			}
		}

		// Only return shortened link
		if ( newLink != url ) {
			return newLink;
		}
	}
};
