
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
        if(json.code === "P2002") {
            console.log("There is already a user for this E-mail address")
        } else if (json.message === "Profile already exists") {
            console.log("This username already exist")
        } else {
            console.log("Success!")
        }
    } catch (error) {
        console.log(error);
    }
}

export { postSignUp }; 

