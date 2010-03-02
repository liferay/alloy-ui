/**
 * The text module lets you format and parse text in many languages from around the world.
 * <p>This module uses the following identifiers:
 * <ul>
 * <li><em>Languages:</em> RFC 4646 language tags, such as "en-GB" (English as used
 *     in the United Kingdom), "zh-Hans-CN" (simpified Chinese as used in China).
 * <li><em>Time zones:</em> tz database identifiers, such as "Europe/Berlin"
 *     (time zone of Germany), "America/Los_Angeles" (Pacific time zone in the United States),
 *     "Asia/Kolkata" (time zone of India).
 * </ul>
 * @module text
 * @requires yahoo, json
 */

/** 
 * Provides functionality for formatting date and time information.
 * @class DateFormat
 * @namespace YAHOO.text
 * @constructor
 * @param {Style | Style[] | String} style Style constant or pattern string for the desired date format.
 * @param {String} language The RFC 4646 language tag for the language of the date format.
 * @param {String} timeZone <b>future</b> The tz database identifier for the time zone of the date format.
 *     Optional - the browser time zone is used by default.
 */

    /**
     * <b>future</b> Calendar month format. Examples:
     * <ul>
     * <li>June 2009
     * <li>2009年6月
     * </ul>
     * @property CALENDAR_MONTH
     */
