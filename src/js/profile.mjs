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



// Get user from localStorage
const userName = localStorage.getItem("name");
if(!name) {
    name = userName;
}



// Get user info
const USER_URL = `${API_URL}/api/v1/social/profiles/${name}?_posts=true&_following=true&_followers=true`
const userData = await getWithToken(accessToken, USER_URL); 

const profileName = document.querySelectorAll(".profile-name");
profileName.forEach(e => {
    e.innerHTML = userData.name;
});

// Display posts
// const posts = userData.posts;
// const postWrapper = document.querySelector(".post-wrapper");

// for(let i = 0; i < posts.length; i++) { 
//     postWrapper.innerHTML += `
//     <div id="${posts[i].id}" class="card d-flex flex-column p-3 mt-3">
//         <div class="d-flex align-items-center">
//             <div class="profile-img-wrapper">
//                 <img src="/assets/components/icons/account-icon.png">
//             </div>
//             <h3 class="ms-2">${posts[i].owner}</h3>
//         </div>
//         <div class="ms-5">
//             <h4 id="post-title"${posts[i].title}></h4>
//             <p id="post-content">${posts[i].body}</p>
//         </div>
//         <div class="small-icons d-flex">
//             <div class="me-3">
//                 <img src="/assets/components/icons/comment.png">
//                 <span>0</span>
//             </div>
//             <div>
//                 <img src="/assets/components/icons/heart-empty.png">
//                 <span>0</span>
//             </div>
//         </div>
//     </div>`
// }



// Display following
// const following = userData.following;
// const followingWrapper = document.querySelector(".following-wrap");

// for(let i = 0; i < 3; i++) { 
//     followingWrapper.innerHTML += `
//     <div class="d-flex align-items-center">
//         <div class="profile-img-wrapper d-flex align-items-center w-100">
//             <img src="/assets/components/icons/account-icon.png">
//             <div class="ms-2">
//                 <h5 class="mb-0">${following[i].name}</h5>
//                 <button class="btn px-3 py-0">Follow</button>
//             </div>
//         </div>
//     </div>`
// }


// If there is an existing banner image, display it
if(!userData.banner === "") {
    const bannerImgWrap = document.querySelector(".banner-img-wrapper");

    const bannerImg = document.createElement("img");
    bannerImg.className = "banner-image w-100 h-100";
    bannerImg.src = userData.banner;
    bannerImgWrap.appendChild(bannerImg);
}



// Post a post
const titleInput = document.querySelector("#titleInput");
const postInput = document.querySelector("#postInput");
// const 

const postInputs = {
        title: titleInput.value,
        body: postInput.value
}

// const postedData = await postWithToken(accessToken, url, postInputs); 

