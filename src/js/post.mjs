import { checkIfToken } from "./modules/checkIfToken.mjs";
import { redirectToLogIn } from "./modules/redirectToLogIn.mjs";

const API_URL = "https://nf-api.onrender.com";

const accessToken = localStorage.getItem("accessToken");

//Check if accessToken, if not, redirect to login
checkIfToken(accessToken, API_URL);
