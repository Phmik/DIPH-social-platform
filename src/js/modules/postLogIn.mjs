/**
 * Log in user
 * @param {string} url the url to the API endpoint
 * @param {object} userData an object with email and password
 * @example
 * ```js
 * // Use this function to sign up a user
 * postWithToken(REG_URL, userData);
 * ```
 */

async function postLogIn(url, userData) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    const response = await fetch(url, postData);
    const json = await response.json();

    //Gives user Feedback
    const formFeedback = document.querySelector(".form-feedback");
    if (json.message) {
      formFeedback.innerHTML = json.message;
      formFeedback.style.border = "solid 1px #FF6F6C";
    } else {
      window.location.href = "index.html";
    }

    //Save access token to localStorage
    const accessToken = json.accessToken;
    const name = json.name;
    if (accessToken && name) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("name", name);
    }
  } catch (error) {
    console.log(error);
  }
}

export { postLogIn };
