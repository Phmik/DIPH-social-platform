import { followUnfollow } from "./modules/followUnfollow.mjs";
import { getWithToken } from "./modules/getWithToken.mjs";
import { redirectToLogIn } from "./modules/redirectToLogIn.mjs";

const API_URL = "https://nf-api.onrender.com";

const accessToken = localStorage.getItem("accessToken");

// Check if there's a token - if not, redirectToLogIn
function checkIfToken(token) {
    if(token) {
        console.log("yes, token!");
    } else {
        console.log("no token...");
        redirectToLogIn();
    }
}

checkIfToken(accessToken);


// Get user from url param
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
let name = params.get("name"); 



// Check if the user is the owner of this profile
const userName = localStorage.getItem("name");
const followBtn = document.querySelector(".follow");
if(!name) {
    followBtn.remove();
    name = userName;
}



// Get profile info
const USER_URL = `${API_URL}/api/v1/social/profiles/${name}?_posts=true&_following=true&_followers=true`
const userData = await getWithToken(accessToken, USER_URL); 

console.log(userData)

const profileName = document.querySelector(".profile-name");
profileName.innerHTML = name;




// Check if following ------------------------ NOT working
// const followers = userData.followers;
// if(name !== userName) {
//     for(let i = 0; i < followers.length; i++){
//         if(followers[i].name.includes(userName)) {
//             console.log(followers[i].name)
//             console.log("You're following");
//             followBtn.innerHTML = "unfollow";
    
//             const UNFOLLOW_URL = `${API_URL}/api/v1/social/profiles/${name}/unfollow`

//             followBtn.addEventListener("submit", followUnfollow(accessToken, UNFOLLOW_URL));
//         } else {
//             console.log("You're NOT following");

//             const FOLLOW_URL = `${API_URL}/api/v1/social/profiles/${name}/follow`
//             followBtn.addEventListener("submit", followUnfollow(accessToken, FOLLOW_URL));
//         }
//     }
// } 



// Display last 50 posts
const posts = userData.posts;
const postWrapper = document.querySelector(".post-wrapper");
postWrapper.innerHTML = "";

if(posts.length === 0) {
    postWrapper.innerHTML = `<div class="card d-flex flex-column p-3 green-text">This user doesn't have any posts :(</div>`
} else {

}
for(let i = 0; i < posts.length; i++) { 
    postWrapper.innerHTML += `
    <div class="card d-flex flex-column p-3 ${posts[i].id}">
        <div class="d-flex align-items-center">
            <div class="profile-img-wrapper">
                <img src="/assets/components/icons/account-icon.png">
            </div>
            <h3 class="ms-2">${posts[i].owner}</h3>
        </div>
        <div class="ms-5">
            <h4 id="post-title"${posts[i].title}></h4>
            <p id="post-content">${posts[i].body}</p>
        </div>
    </div>`

    if(i === 50) {
        break;
    }
}



// Display following-section
const following = userData.following;
const followingWrapper = document.querySelector(".following-wrap");
followingWrapper.innerHTML = ""

if(following.length === 0) {
    followingWrapper.innerHTML = `<span class="green-text">This user doesn't follow anyone :(<span>`
} else {
    for(let i = 0; i < 3; i++) { 
        followingWrapper.innerHTML += `
        <div class="d-flex align-items-center">
            <div class="profile-img-wrapper d-flex align-items-center w-100">
                <img src="/assets/components/icons/account-icon.png">
                <div class="ms-2">
                    <h5 class="mb-0">${following[i].name}</h5>
                    <button class="btn px-3 py-0">Follow</button>
                </div>
            </div>
        </div>`
    }
}


// If there is an existing banner image, display it
if(!userData.banner === "") {
    const bannerImgWrap = document.querySelector(".banner-img-wrapper");

    const bannerImg = document.createElement("img");
    bannerImg.className = "banner-image w-100 h-100";
    bannerImg.src = userData.banner;
    bannerImgWrap.appendChild(bannerImg);
}

