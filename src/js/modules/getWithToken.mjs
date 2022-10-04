/**
 * Gets the API endpoint with accessToken
 * @param {string} token the accessToken
 * @param {string} url the url to the API endpoint
 * @example
 * ```js
 * // Use this function to get an API endpoint with a url
 * // and an accessToken.
 * const data = await getWithToken(accessToken, API_ENDPOINT_URL);
 * ```
 */

 async function getWithToken(token, url) {
    try {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        };

        const response = await fetch(url, options);
        const json = await response.json();
        console.log(json);
        return json;
    } catch(error) {
        console.log(error);
    }
}

export { getWithToken };