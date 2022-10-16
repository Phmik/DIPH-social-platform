/** 
 * Looks for checkbox check and email in localStorage, 
 * saves email to localStorage if checkbox is checked.
 * @param {boolean} isChecked 
 * @param {string} email 
 * @example 
 * ```js
    checkRememberMe(rememberCheck, inputEmail);
 * ```
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
