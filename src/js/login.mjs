import { postLogIn } from "./modules/postLogIn.mjs";
import { checkRememberMe } from "./modules/rememberMe.mjs";

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
}
if (!localStorage.checkbox && localStorage.checkbox === "") {
  rememberCheck.removeAttribute("checked");
  inputEmail.value = "";
}

//  INDIVIDUAL E-MAIL
function validateEmail(email) {
  const regEx = /([\w\-\.])+@(stud\.)?noroff\.no/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}

// VALIDATE INPUTS
function validateLogIn(e) {
  e.preventDefault();

  const userInput = {
    email: inputEmail.value.trim(),
    password: inputPassword.value,
  };

  if (!validateEmail(inputEmail.value)) {
    const emailHelp = document.querySelector("#emailHelp");
    emailHelp.style.color = "#FF6F6C";
  } else {
    emailHelp.style.color = "";
  }

  if (validateEmail(inputEmail.value)) {
    postLogIn(LOGIN_URL, userInput);
  }

  checkRememberMe(rememberCheck, inputEmail);
}

form.addEventListener("submit", validateLogIn);
