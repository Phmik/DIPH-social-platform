import { postSignUp } from "../modules/postSignUp.mjs";
import { validateEmail, validatePassword } from "./validators.mjs";

const API_URL = "https://nf-api.onrender.com";
const REG_URL = `${API_URL}/api/v1/social/auth/register`;

// VALIDATE INPUTS
export async function validateSignUp(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const warningColour = "#FF6F6C";

    const userInput = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password")
    }

    const usernameHelp = document.querySelector("#usernameHelp");
    const emailHelp = document.querySelector("#emailHelp");
    const passwordHelp = document.querySelector("#passwordHelp");

    const valid = {
      name: userInput.name.trim().length > 4,
      email: validateEmail(userInput.email),
      password: validatePassword(userInput.password)
    }

    const formIsValid = Object.entries(valid).every(([key, value]) => value);

    if (formIsValid) {
        await postSignUp(REG_URL, userInput);
        // Post signup actions
    } else {
      usernameHelp.style.color = !valid.name ? warningColour : "";
      emailHelp.style.color = !valid.email ? warningColour : "";
      passwordHelp.style.color = !valid.password < 4 ? warningColour : "";
    }
}

export function setSignupListener() {
  const target = document.querySelector("form#signup");
  if (target) {
    target.addEventListener("submit", validateSignUp);
  }
}
