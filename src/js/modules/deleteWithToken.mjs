/**
 * Deletes entry 
 * @param {string} token the accessToken
 * @param {string} url the url to the API endpoint
 * @param {string} postInfo an object with the information you want to delete
 * @example
 * ```js
 * // Use this function to put/update an entry in the API with
 * // accessToken, a url and the information you want to post.
 * putWithToken(accessToken, API_ENDPOINT_URL, someData);
 * ```
 */
 async function putWithToken(token, url, postInfo) {
    try {
        const postData = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(postInfo),
        };
        const response = await fetch(url, postData);
        const json = await response.json();

        window.location.reload();
    } catch (error) {
        console.log(error);
    }
}

export { putWithToken }; 

//UNDER CONSTRUCTION... --- idk if it works