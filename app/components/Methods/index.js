/**
 * Global Methods to be used instead of using a node_modules
 */

// Import Enums
import DateFormat from '../Enums/DateFormat';

/**
 * Parse Date
 * Parse date from retrieved data
 * @param {string}  dateData    The date string
 * @param {enum}    format      Output date format (default: 'MM-DD-YYYY')
 * @param {boolean} withTime    Indicate if our return includes time (default: false)
 * @param {string}  separator   String separator used for split (default: '/')
 * @return {string}             Returns a formatted string of the passed date data
 * Sample: parseDate('9/28/2018 12:00:00 AM', DateFormat.Long, true, '/')
 * NOTE:
 * replacement for moment.js for simplicity reason and conflict on timezone in user's machine
 * this is for displaying only the date in a Long date, short or number format.
 * not a total replacement if you need a date object (use moment instead)
 */
export function parseDate(dateData, format, withTime = false, separator = '/') {
  // First check if time is included in the date
  const dateTime = dateData.split(' ');

  // Store in variable the splitted string;
  const date = dateTime[0].split(separator); // Split the date to be pass on to our return value
  const time = (dateTime.length > 1) ? dateTime[1] : '';
  const ampm = (dateTime.length > 1) ? dateTime[2] : '';

  const monthLong = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const mI = date[0] - 1;

  let returnDate = `${date[0]}-${date[1]}-${date[2]}`;
  if (withTime) returnDate = `${date[0]}-${date[1]}-${date[2]} ${time} ${ampm}`;

  if (format === DateFormat.Long) {
    returnDate = `${monthLong[mI]} ${date[1]}, ${date[2]}`;
    if (withTime) returnDate = `${monthLong[mI]} ${date[1]}, ${date[2]} ${time} ${ampm}`;
    return returnDate;
  }

  if (format === DateFormat.Short) {
    returnDate = `${monthShort[mI]} ${date[1]}, ${date[2]}`;
    if (withTime) returnDate = `${monthShort[mI]} ${date[1]}, ${date[2]} ${time} ${ampm}`;
    return returnDate;
  }

  // default return value (format MM-DD-YYYY)
  return returnDate;
}

/**
 * Action Word convert to Past Tense
 * @param {string}  value     String value of word to be converted
 */
export function convertPastTense(value) {
  const lastChar = value.substr(value.length - 1).toLocaleLowerCase();
  let newWord;
  if (lastChar === 'a' || lastChar === 'e' || lastChar === 'i' || lastChar === 'o' || lastChar === 'u') {
    newWord = value.slice(0, -1);
  } else {
    newWord = value;
  }
  newWord += 'ed';
  return newWord;
}
