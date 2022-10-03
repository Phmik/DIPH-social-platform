import {redirectToLogIn} from "./redirectToLogIn.mjs";

/** -----------------
 * 
 * @param {string} url 
 * @param {object} userData 
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

        //FEEDBACK TO USER --- not finished --- Make feedback <div>!
        const formFeedback = document.querySelector(".form-feedback");

        if(json.code === "P2002") {
            formFeedback.innerHTML = "This E-mail address already exists";
            formFeedback.style.border = "solid 1px #FF6F6C";
        } else if (json.message === "Profile already exists") {
            formFeedback.innerHTML = "This username already exist";
            formFeedback.style.border = "solid 1px #FF6F6C";
        } else {
            window.location.href = "/login.html";
        }

    } catch (error) {
        console.log(error);
        redirectToLogIn();
    }
}

export { postSignUp }; 

