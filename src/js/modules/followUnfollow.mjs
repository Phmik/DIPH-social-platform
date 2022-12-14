let bodyObj = {};

/**
 * Follow/Unfollow users
 * @param {string} token the accessToken
 * @param {string} url the url to the API endpoint
 * @example
 * ```js
 * // Use this function to follow/unfollow users
 * putWithToken(accessToken, API_ENDPOINT_URL);
 * ```
 */

async function followUnfollow(token, url) {
  try {
    const postData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bodyObj),
    };
    const response = await fetch(url, postData);
    const json = await response.json();

    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

export { followUnfollow };
