import { getWithToken } from "./modules/getWithToken.mjs";
import { redirectToLogIn } from "./modules/redirectToLogIn.mjs";

const API_URL = "https://nf-api.onrender.com";

const accessToken = localStorage.getItem("accessToken");

//Check if there's a token - if so, getWithToken
function checkIfToken(token, url) {
    if(token) {
        getWithToken(token, url);
        console.log("yes, token!");
    } else {
        console.log("no token...");
        redirectToLogIn();
    }
}

//edit edit edit edit edit
const POSTS_URL = `${API_URL}/api/v1/social/posts/`

checkIfToken(accessToken, POSTS_URL);