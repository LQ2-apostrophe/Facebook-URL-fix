# Facebook URL fix
This is a Google Chrome extension which shortens Facebook URLs to reduce tracking and unresponsive situations.

Author: **LQ2'** ([Website](http://www.LQ2music.com/) | [GitHub](https://github.com/LQ2-apostrophe))

Based on [Query stripper](https://github.com/rudiedirkx/Query-stripper) by Rudie Dirkx.

Thanks [Custom Icon Design](http://www.customicondesign.com/) for the wrench icon used in the icon of this extension.

## News!
A new extension focusing on fixing Facebook URLs (like this) is being written, with a completely different mechanism. It is **Blue Neutralization**.

New updates to *Facebook URL fix* will not change the main mechanism derived from *Query stripper*.

## Features
- Removes unnecessary query parameters from Facebook URLs
- *[Removed]* Changes modern photo links into legacy links
- Shortens album ID containing `a.<something>` in query parameter `set` in legacy album links
- Enters external links directly. (Facebook's reference tracking is skipped.)

## To do
- **[Major feature]** Actively shorten and remove unnecessary things in `<a>` tags in the page. *This feature will be implemented in the new extension!*
- *[Bugfix]* Tab content is not updated when external links are in fact inside Facebook network (e.g. `*.facebook.com`).

## Installation
1. Download the ZIP file of [the latest release of this extension](https://github.com/LQ2-apostrophe/Facebook-URL-fix/releases/latest).
2. Extract the file into a folder.
3. Open Chrome and [turn on its Developer mode](https://developer.chrome.com/extensions/faq#faq-dev-01).
4. Click **Load unpacked extension** and select the folder containing this extension.

## How does this extension work?
### 1. Removing unnecessary query parameters from Facebook URLs

For example, this URL points to a page that shows a reply to a comment on a post:
```
https://www.facebook.com/<somebody>/posts/<post_id>?ref=notif&notif_t=like&notif_id=<notif_id>&comment_id=<comment_id>&reply_comment_id=<reply_comment_id>
```
Unneeded query parameters: `ref, notif_t, notif_id`

New URL:
```
https://www.facebook.com/<somebody>/posts/<post_id>?comment_id=<comment_id>&reply_comment_id=<reply_comment_id>
```

### 2. *[Removed]* Changing modern photo links into legacy links

This is one modern photo link used in Facebook pages:
```
https://www.facebook.com/<onepage>/photos/<album_id>/<photo_id>
```
It will be changed into this legacy shorter link:
```
https://www.facebook.com/photo.php?fbid=<photo_id>
```

### 3. Shortening album ID containing `a.<something>` in query parameter `set` in legacy album links

(This feature is available since version 1.1.)

Here is a legacy link to a photo album:
```
https://www.facebook.com/media/set/?set=a.<minimal_numeric_part>.<extra_numeric_part_1>.<extra_numeric_part_2>
```
This will be changed into:
```
https://www.facebook.com/media/set/?set=a.<minimal_numeric_part>
```

### 4. Entering external links directly

(This feature is available since version 1.2.)

Here is a redirection link to an external site:
```
http://l.facebook.com/l.php?u=http%3A%2F%2Fexample.com%2F&h=<some code>
```
The external link is extracted and entered.
```
http://example.com/
```

## Version history
### 1.3
- Feature removed because of various bugs: Changing modern photo links to legacy ones.
- Updated more unneeded query parameters.
- Now some parameters are only removed at some links in order to prevent some unresponsive situations.
- Update to feature of entering external links directly: Redirection subdomains has been extended.

### 1.2
- New feature: Entering external links directly (skipping Facebook's warning and reference tracking).
- Updated more unneeded query parameters.
- Query parameter `app_id` is now excluded at Facebook Live dialogs.

### 1.1.1
- Updated more unneeded query parameters.
- Query parameter `type` is now excluded at Page's Notifications tab for access to Mentions and Shares. (Only people working on Pages can see.)
- Query parameter `id` is now excluded at Help Community for access to questions.

### 1.1
- Less code for existing features.
- More unneeded query parameters are added. Some of them are still necessary in some links; when these links are entered, they are properly excluded by this extension.
- New feature: Shortening album ID containing `a.<something>` in query parameter `set` in legacy album links

### 1.0
First release
