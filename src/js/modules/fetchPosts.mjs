/** ----------------
 * 
 * @param {*} url 
 * @param {*} userData 
 */

 const API_URL = "https://nf-api.onrender.com";
 const POSTS_URL = "/api/v1/social/posts"

async function fetchPostsWithToken(url) {
    try {
        const token = localStorage.getItem('accessToken');
        const getData = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(url, getData);
        const json = await response.json();
        console.log(json)
    }
    catch {
        console.log(error)
    }
}

fetchPostsWithToken(API_URL + POSTS_URL);

export { fetchPostsWithToken };