import { postSignUp } from "./modules/postSignUp.mjs";

const API_URL = "https://nf-api.onrender.com";

const inputUsername = document.querySelector("#inputUsername").value;
const inputEmail = document.querySelector("#inputEmail").value;
const inputPassword = document.querySelector("#inputPassword").value;
const form = document.querySelector("form");

const userInput = {
    name: inputUsername,
    email: inputEmail,
    password: inputPassword,
}

const REG_URL = `${API_URL}/api/v1/social/auth/register`;

// form.addEventListener("submit", postSignUp(LOGIN_URL, userInput)); ------------ SKAL FIKSES