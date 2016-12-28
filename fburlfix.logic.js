fuf = {
	fixUrl: function(url) {
		tokens = [
			// Include completely useless query parameters
			'fref',
			'cref',
			'ref',
			'fb_ref',
			'hc_ref',
			'__mref',
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
			'app_id',
			'fbid',
			'set',
			'privacy_source',
			'l',
			'type'
		];

		darkTokensUrlRegex = [
			// Regexes matching URLs where darkTokens are used. darkTokens[a] matches darkTokensUrlRegex[a].
			/^https?:\/\/(?:(?:www|web)\.)?facebook\.com\/[^\/]+\/dialog\/live_broadcast\?/ig,
			/^https?:\/\/(?:(?:www|web|m|mobile|mbasic)\.)?facebook\.com\/(?:photo\.php\?|album\.php\?|login_alerts|photo\/download\/\?)/ig,
			/^https?:\/\/(?:(?:www|web|m|mobile|mbasic)\.)?facebook\.com\/(?:(?:media\/set\/|[a-z0-9.]+\/media_set)\?|profile\.php\?id=[0-9]+&sk=photos)/ig,
			/^https?:\/\/(?:(?:www|web)\.)?facebook\.com\/[a-z0-9.]+\/allactivity/ig,
			/^https?:\/\/(?:(?:m|mobile|mbasic)\.)?facebook\.com/ig,
			/^https?:\/\/(?:(?:www|web|m|mobile|mbasic)\.)?facebook\.com\/(?:[a-z0-9.]+\/activity_feed\/|media\/set\/\?set=vb\.|[a-z0-9.]+\/media_set\?set=vb\.)/ig
		];

		lightTokens = [
			// Query parameters that should be removed in some links.
			// If there is a number of parameters to be removed in one link (regex), write them in the same token (seperated by | ).
			// This token list is used for newly-introduced query parameters.
			// If any of these parameters are not used completely, it should be moved to the default token list.
			's|appid|sharer_type|feedback_referrer|feedback_source',
			'pp_source|id',
			'story_location',
			'size'
		];

		lightTokensUrlRegex = [
			// Regexes matching URLs where lightTokens are not used. darkTokens[a] matches lightTokensUrlRegex[a].
			/^https?:\/\/(?:(?:www|web|m|mobile|mbasic)\.)?facebook\.com\/ajax\/sharer\/\?/ig,
			/^https?:\/\/(?:(?:www|web|m|mobile|mbasic)\.)?facebook\.com\/photo\.php\?/ig,
			/^https?:\/\/(?:(?:www|web|m|mobile|mbasic)\.)?facebook\.com\/ajax\/nfx\/start_dialog\?/ig,
			/^https?:\/\/(?:(?:www|web|m|mobile|mbasic)\.)?facebook\.com\/[a-z0-9.]+\/photos\/[^\/]*\/[0-9]*\/\?/ig
		];

		var oldLink = url;
		var newLink = oldLink;

		// Rule 1: Skip Facebook outbound redirection (and warning)
		if (oldLink.match(/^https?:\/\/(?:[a-z0-9]*\.)?facebook\.com\/l\.php\?/ig)) {
			// Query parameter U contains the original outbound link
			if (oldLink.match(/[?&#]u=[^&#]*/ig)) {
				newLink = decodeURIComponent(/[?&#]u=([^&#]*)/ig.exec(oldLink)[1]);
				oldLink = newLink;
				// Skip other rules if outbound link is truly outside Facebook
				if (!newLink.match(/^https?:\/\/(?:.*\.)?facebook\.com/ig)) {
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
			// Add more useless query parameters from lightTokens to tokens array
			for (i = 0; i < lightTokens.length; i++) {
				if (oldLink.match(lightTokensUrlRegex[i])) {
					tokens.push(lightTokens[i]);
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

		// Rule 3: Shorten parameter SET on legacy a-type (SET has a value containing 'a.[something]') link for albums
		if (oldLink.match(/^https?:\/\/(?:(?:www|web|m|mobile)\.)?facebook\.com\/(?:media\/set\/|[a-z0-9.]+\/media_set)\?/ig)) {
			// Parameter SET must be there
			if (oldLink.match(/[?&#]set=[^&#]*/ig)) {
				var minimalAlbumID = /[?&#]set=[^&#]*a\.([0-9]+)[^&#]*/ig.exec(oldLink)[1];
				if ((minimalAlbumID.length > 15) || (parseInt(minimalAlbumID.charAt[0]) < 4)) {
					newLink = newLink.replace(/([?&#])set=[^&#]*a\.([0-9]+)\.([0-9]+)[^&#]*/ig, '$1set=a.$2.$3');
				} else {
					newLink = newLink.replace(/([?&#])set=[^&#]*a\.([0-9]+)[^&#]*/ig, '$1set=a.$2');
				}
				oldLink = newLink;
			}
		}
		

		// Only return shortened link
		if ( newLink != url ) {
			return newLink;
		}
	}
};
