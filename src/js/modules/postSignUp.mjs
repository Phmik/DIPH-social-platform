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
                "Content-Type": "application/json",
                // Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRpbmFPIiwiaWF0IjoxNjY0MjAxNzc3fQ.VT9sYZ1ZSMaKJnOxfnITzLcsAkzTJGf0sWFSp6QvCSw"
            },
            body: JSON.stringify(userData),
        };
        const response = await fetch(url, postData);
        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.log(error);
    }
}


/** ----------------
 * 
 * @param {*} url 
 * @param {*} userData 
 */

async function postLogIn(url, userData) {
    try {
        const postData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRpbmFPIiwiaWF0IjoxNjY0MjAxNzc3fQ.VT9sYZ1ZSMaKJnOxfnITzLcsAkzTJGf0sWFSp6QvCSw"
            },
            body: JSON.stringify(userData),
        };
        const response = await fetch(url, postData);
        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.log(error);
    }
}




//------------------- EXPORTS ----------------------
export { postSignUp, postLogIn }; 