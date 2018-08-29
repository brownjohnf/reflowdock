![banner](https://github.com/petrosagg/reflowdock/blob/master/src/extension/chromium/icon128.png?raw=true)

# Reflowdock
> Visually appealing Flowdock with extra features.

Reflowdock is a chromium (and firefox soon) extension that improves user experience while using Flowdock.

## New features:

* You can mark a notification as unread to leave it for later
* Language specific code highlighting. Now you can start your block with \`\`\`javascript
* Mention indicators include mention count

## Enhancements:

* Compact sidebar
* Thin thread indicators
* Much wider thread view
* Better color scheme

## Future ideas

* Multiflows: Allow creating of synthetic flows that aggregate messages. Like multi-reddits
* Starred notification: Have a list of starred notification that don't go away when you look at them
* Firefox extension
* Snoozed notification: Send a notification to the future
* Timezone next to username:
* important mentions
* Global search: It looks like there is a [new API for that](https://twitter.com/flowdock/status/1022102006922530825)
* Grouped, collapsible flows in sidebar. Bonus points if the group is automatically a multiflow

## Contributing

You're more than welcome to work on the ideas above or even new ones!

To build the extension locally clone this repo, install modules with `npm
install`, and then build with `npm run build`.

You should end up with the built extension in `dist/chromium`. All you have to
do now is to [load an unpacked
extension](https://github.com/web-scrobbler/web-scrobbler/wiki/Install-an-unpacked-extension)
in your browser and start modifying.  Once you're happy with the results send
the PR over :)