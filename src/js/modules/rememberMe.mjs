/** -----------------
 * 
 * @param {HTMLInputElement} isChecked 
 * @param {HTMLInputElement} email 
 */

export function checkRememberMe(isChecked, email) {
    if (isChecked.checked && email.value !== "") {
        localStorage.setItem("email", email.value);
        localStorage.setItem("rememberMe", isChecked.checked);
    } else {
        localStorage.removeItem("email")
        localStorage.removeItem("rememberMe")
    }
}