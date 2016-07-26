# Facebook URL fix
This is a Google Chrome extension which shortens Facebook URLs to reduce tracking and unresponsive situations.

Author: **LQ2'** ([Website](http://www.LQ2music.com/) | [GitHub](https://github.com/LQ2-apostrophe))

Based on [Query stripper](https://github.com/rudiedirkx/Query-stripper) by Rudie Dirkx.

Thanks [Custom Icon Design](http://www.customicondesign.com/) for the wrench icon used in the icon of this extension.

## Features
- Removes unnecessary query parameters from Facebook URLs
- Changes modern photo links into legacy links
- Shortens album ID containing `a.<something>` in query parameter `set` in legacy album links

## To do
- **[Major feature]** Actively shorten and remove unnecessary things in `<a>` tags in the page
- *[Bugfix]* Buttons Previous and Next in photo viewer are unresponsive in some special albums / posts

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

### 2. Changing modern photo links into legacy links

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

## Version history
### 1.1
- Less code for existing features
- New feature: Shortening album ID containing `a.<something>` in query parameter `set` in legacy album links

### 1.0
First release
