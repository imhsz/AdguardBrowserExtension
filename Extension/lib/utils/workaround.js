/**
 * This file is part of Adguard Browser Extension (https://github.com/AdguardTeam/AdguardBrowserExtension).
 *
 * Adguard Browser Extension is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Adguard Browser Extension is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Adguard Browser Extension.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Initializing required libraries for this file.
 * require method is overridden in Chrome extension (port/require.js).
 */
var Log = require('../lib/utils/log').Log;
var UrlUtils = require('../lib/utils/url').UrlUtils;

/**
 * We collect here all workarounds and ugly hacks:)
 */
var WorkaroundUtils = exports.WorkaroundUtils = {

	/**
	 * @returns true if e10s is enabled
	 */
	isMultiProcessFirefoxMode: function() {
		return this.multiProcessFirefoxMode;
	},

	/**
	 * Saves FF multi-process flag.
	 *
	 * In case if FF is working in e10s we change the way we do the following:
	 * 1. No more collapsing elements from the chrome process.
	 * We now use the same way as chromium extension - collapsing elements in the content script.
	 * It is slow, but it won't slow down the browser.
	 *
	 * More info:
	 * https://github.com/AdguardTeam/AdguardBrowserExtension/issues/4
	 *
	 * @param value true if multiprocess
	 */
	setMultiProcessFirefoxMode: function(value) {

		if (this.multiProcessFirefoxMode !== value) {
			Log.info("Set multi-process mode to {0}", value);
		}

		this.multiProcessFirefoxMode = value;
	},

	/**
	 * Converts blocked counter to the badge text.
	 * Workaround for FF - make 99 max.
	 *
	 * @param blocked Blocked requests count
	 */
	getBlockedCountText: function(blocked) {
		var blockedText = blocked == "0" ? "" : blocked;
		if (blocked - 0 > 99) {
			blockedText = '\u221E';
		}

		return blockedText;
	},

	/**
	 * Checks if it is facebook like button iframe
	 * TODO: Ugly, remove this
	 *
	 * @param url URL
	 * @returns true if it is
	 */
	isFacebookIframe: function (url) {
		// facebook iframe workaround
		// do not inject anything to facebook frames
		return url.indexOf('www.facebook.com/plugins/like.php') > -1;
	}
};