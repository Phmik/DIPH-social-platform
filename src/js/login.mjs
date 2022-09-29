import { postLogIn } from "./modules/postLogIn.mjs";
import {checkRememberMe} from "./modules/rememberMe.mjs"

const API_URL = "https://nf-api.onrender.com";

const inputEmail = document.querySelector("#inputEmail");
const inputPassword = document.querySelector("#inputPassword");
const rememberCheck = document.querySelector("#rememberCheck");
const form = document.querySelector("form");

const userInput = {
    email: inputEmail.value,
    password: inputPassword.value
}

const LOGIN_URL = `${API_URL}/api/v1/social/auth/login`;

if (localStorage.checkbox && localStorage.checkbox !== "") {
    rememberCheck.setAttribute("checked", "checked");
    inputEmail.value = localStorage.email;
} if (!localStorage.checkbox && localStorage.checkbox === "") {
    rememberCheck.removeAttribute("checked");
    inputEmail.value = "";
}


// ------------ VALIDATIONS ------------
function validateEmail(email) {
    const regEx = /([\w\-\.])+@(stud\.)?noroff\.no/;
    const patternMatches = regEx.test(email);
    return patternMatches;
}

function validatePassword(password) {
    const regEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    const patternMatches = regEx.test(password);
    return patternMatches;
}


// VALIDATE INPUTS
function validateLogIn(e) {
    e.preventDefault();

    if(!validateEmail(inputEmail.value)) {
        const emailHelp = document.querySelector("#emailHelp");
        emailHelp.style.color = "#FF6F6C";
    } else {
        emailHelp.style.color = "";
    }

    if(!validatePassword(inputPassword.value)) {
        const passwordHelp = document.querySelector("#passwordHelp");
        passwordHelp.style.color = "#FF6F6C";
    } else {
        passwordHelp.style.color = "";
    }

    if(validateEmail(inputEmail.value) && validatePassword(inputPassword.value)){
        checkRememberMe(rememberCheck, inputEmail);
        postLogIn(LOGIN_URL, userInput);
    } 
}

form.addEventListener("submit", validateLogIn);