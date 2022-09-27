
/** -----------------
 * 
 * @param {*} url 
 * @param {*} userData 
 */

async function postSignUp(url, userData) {
    try {
        const postData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData),
        };
        const response = await fetch(url, postData);
        const json = await response.json();
        console.log(json);

        const accessToken = json.accessToken;
        localStorage.setItem("accessToken", accessToken);
    } catch (error) {
        console.log(error);
    }
}

export { postSignUp }; 

