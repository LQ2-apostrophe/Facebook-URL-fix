# Facebook URL fix
This is a Google Chrome extension which shortens Facebook URLs to reduce tracking and unresponsive situations.

Author: **LQ2'** ([Website](http://www.LQ2music.com/) | [GitHub](https://github.com/LQ2-apostrophe))

Based on [Query stripper](https://github.com/rudiedirkx/Query-stripper) by Rudie Dirkx.

Thanks [Custom Icon Design](http://www.customicondesign.com/) for the wrench icon used in the icon of this extension.

## Note
A new extension focusing on fixing Facebook URLs (like this) is being written, with a completely different mechanism. New updates to *Facebook URL fix* will not change the main mechanism derived from *Query stripper*.

## Features
- Removes unnecessary query parameters from Facebook URLs
- Shortens album ID containing `a.<something>` in query parameter `set` in legacy album links
- Enters external links directly. (Facebook's reference tracking is skipped.)
- Directly enters a single post in a group from a notification about the post.

### Removed feature
- Changes modern photo links into legacy links

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

### 2. Shortening album ID containing `a.<something>` in query parameter `set` in legacy album links

(Available since version 1.1)

Here is a legacy link to a photo album:
```
https://www.facebook.com/media/set/?set=a.<minimal_numeric_part>.<extra_numeric_part_1>.<extra_numeric_part_2>
```
This will be changed into:
```
https://www.facebook.com/media/set/?set=a.<minimal_numeric_part>
```

### 3. Entering external links directly

(Available since version 1.2)

Here is a redirection link to an external site:
```
http://l.facebook.com/l.php?u=http%3A%2F%2Fexample.com%2F&h=<some code>
```
The external link is extracted and entered.
```
http://example.com/
```

### 4. Directly entering a single post in a group from a notification about the post

(Available since version 1.5)

A link to the post points to a page containing not only the post, but also other posts in the same group.
```
https://www.facebook.com/groups/<group_name_or_id>/?multi_permalinks=<single_post_id>
```
The page can cause additional, unnecessary load. A Facebook user has already got a choice to view all posts in the group by clicking *Discussion.*

The following link is much straighter.
```
https://www.facebook.com/groups/<group_name_or_id>/permalink/<single_post_id>
```
**Notes:**
- The user will not see pinned post in the group until he/she clicks *Discussion*.
- Notifications about multiple posts in a group are safely bypassed by this feature.

## Version history
### 1.5
- Updated useless parameters.
- New feature: Directly entering a single post in a group from a notification about the post.

### 1.4.1
- Added two useless query parameters: `qsefr` and `lst`
- Query parameter `notif_id` is now excluded for a special notification about the engagement of recent posts by current user.
- Fix for links of albums contributed by more than one person.

### 1.4
- Added support for all possible protocols that Facebook works on.
- Added support for `http(s)://facebook.com` links.

### 1.3.1
- Added `__mref` to the list of completely useless query parameters.
- Query parameter `type` is now excluded in default album for videos in profiles. (`set=vb.<numeric_part>`)

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
