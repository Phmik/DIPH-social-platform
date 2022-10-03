
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

//Gives user Feedback 
        const loginFeedback = document.querySelector(".login-feedback");
        if(json.message) {
            loginFeedback.innerHTML = json.message;
            loginFeedback.style.border = "solid 1px #FF6F6C";
        } else {
                window.location.href = "index.html";
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