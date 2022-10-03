import { getWithToken } from "./modules/getWithToken.mjs";
import { redirectToLogIn } from "./modules/redirectToLogIn.mjs";

const API_URL = "https://nf-api.onrender.com";

const accessToken = localStorage.getItem("accessToken");

//Check if there's a token - if so, getWithToken
function checkIfToken(token) {
    if(token) {
        console.log("yes, token!");
    } else {
        console.log("no token...");
        redirectToLogIn();
    }
}

checkIfToken(accessToken);



//Get user from localStorage
const name = localStorage.getItem("name");
const USER_URL = `${API_URL}/api/v1/social/profiles/${name}`

//Get user info and display name
const userData = await getWithToken(accessToken, USER_URL); 

const profileName = document.querySelectorAll(".profile-name");
profileName.forEach(e => {
    e.innerHTML = userData.name;
});



//If there is an existing banner image, display it
if(!userData.banner === "") {
    const bannerImgWrap = document.querySelector(".banner-img-wrapper");

    const bannerImg = document.createElement("img");
    bannerImg.className = "banner-image w-100 h-100";
    bannerImg.src = userData.banner;
    bannerImgWrap.appendChild(bannerImg);
}