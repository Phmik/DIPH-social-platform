/**
 * PUT method/Updates to API endpoint with accessToken 
 * @param {string} token the accessToken
 * @param {string} url the url to the API endpoint
 * @param {string} postInfo an object with the information you want to update
 * @example
 * ```js
 * // Use this function to update to an API endpoint with an
 * // accessToken, a url and the information you want to update.
 * postWithToken(accessToken, API_ENDPOINT_URL, someData);
 * ```
 */
 async function putWithToken(token, url, postInfo) {
    try {
        const postData = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(postInfo),
        };
        const response = await fetch(url, postData);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}

export { putWithToken }; 