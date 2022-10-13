export const API_HOST_URL = "https://nf-api.onrender.com";
export const API_BASE = "/api/v1";
export const API_SOCIAL_BASE = "/social";
export const API_SOCIAL_URL = `${API_HOST_URL}${API_BASE}${API_SOCIAL_BASE}`;

export const userURL = `/api/v1/social/profiles`;

// export const returnPostDate = (date) => `${
//   [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Okt",
//     "Nov",
//     "Dec",
//   ][date.getMonth()]
// }-${date.getDate()}-${date.getFullYear()} at
// ${date.getHours()}:${date.getMinutes()}`;

// UPDATED DATES WITH nicePostDate(Looked alot better, thanks Oliver)


/**
 * @param {string | Date} date a date encoded string or date object
 * @returns {string} a Norwegian formatted date string
 */
 export const nicePostDate = (date) => new Date(date).toLocaleString("no-NO", {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
}) + ' at ' + new Date(date).toLocaleTimeString("no-NO", {
  hour: 'numeric',
  minute: 'numeric'
})