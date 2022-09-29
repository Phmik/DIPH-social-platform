
/** ----------------
 * 
 * @param {string} url 
 * @param {object} userData 
 */

 async function postLogIn(url, userData) {
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

//Feedback --- not finished --- Display feedback in <div>
        if(json.message) {
            console.log(json.message)
        }

//Save access token to localStorage
        const accessToken = json.accessToken;
        if(accessToken) {
            localStorage.setItem("accessToken", accessToken);
        }
    } catch (error) {
        console.log(error);
    }
}

export { postLogIn }; 