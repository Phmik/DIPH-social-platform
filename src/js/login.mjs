import { postLogIn } from "./modules/postLogIn.mjs";
import {checkRememberMe} from "./modules/rememberMe.mjs"

const API_URL = "https://nf-api.onrender.com";

const inputEmail = document.querySelector("#inputEmail");
const inputPassword = document.querySelector("#inputPassword");
const rememberCheck = document.querySelector("#rememberCheck");
const form = document.querySelector("form");

const LOGIN_URL = `${API_URL}/api/v1/social/auth/login`;

// "Remember Me" checkbox
if (localStorage.checkbox && localStorage.checkbox !== "") {
    rememberCheck.setAttribute("checked", "checked");
    inputEmail.value = localStorage.email;
} if (!localStorage.checkbox && localStorage.checkbox === "") {
    rememberCheck.removeAttribute("checked");
    inputEmail.value = "";
}


// VALIDATE INPUTS
function validateLogIn(e) {
    e.preventDefault();

    const userInput = {
        email: inputEmail.value,
        password: inputPassword.value
    }

    checkRememberMe(rememberCheck, inputEmail);
    postLogIn(LOGIN_URL, userInput);

    //TEST
    console.log(userInput)
    //
}

form.addEventListener("submit", validateLogIn);