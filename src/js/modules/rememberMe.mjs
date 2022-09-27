/** -----------------
 * 
 * @param {*} url 
 * @param {*} userData 
 */

function checkRememberMe(isChecked, email) {
    if (isChecked.checked && email.value !== "") {
        localStorage.email = email.value;
        localStorage.checkbox = isChecked.value;
    } else {
        localStorage.email = "";
        localStorage.checkbox = "";
    }
}

export { checkRememberMe };