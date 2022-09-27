import { postLogIn } from "./modules/postLogIn.mjs";

const API_URL = "https://nf-api.onrender.com";

const inputEmail = document.querySelector("#inputEmail").value;
const inputPassword = document.querySelector("#inputPassword").value;
const loginBtn = document.querySelector("#loginBtn");

const userInput = {
    username: inputEmail,
    password: inputPassword
}

const LOGIN_URL = `${API_URL}/api/v1/social/auth/login`;

// loginBtn.addEventListener("submit", validateLogin()); -------------- IKKE FERDIG