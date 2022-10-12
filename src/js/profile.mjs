import { followUnfollow } from "./modules/followUnfollow.mjs";
import { getWithToken } from "./modules/getWithToken.mjs";
import { redirectToLogIn } from "./modules/redirectToLogIn.mjs";
import { putWithToken } from "./modules/putWithToken.mjs";
import * as manyPosts from "./modules/posts/postGather.mjs"

const API_URL = "https://nf-api.onrender.com";

const accessToken = localStorage.getItem("accessToken");

// Check if there's a token - if not, redirectToLogIn
function checkIfToken(token) {
    if(token) {
    } else {
        redirectToLogIn();
    }
}

checkIfToken(accessToken);


// LOG OUT
const logOutBtn = document.querySelector("#logout-header");

function logOut() {
    const savedCheckBox = localStorage.getItem("checkbox");
    const savedEmail = localStorage.getItem("email");

    localStorage.clear();

    //If Email was saved on login earlier, keep it in localStorage
    localStorage.setItem("checkbox", savedCheckBox);
    localStorage.setItem("email", savedEmail);


    redirectToLogIn();
}

logOutBtn.addEventListener("click", logOut);



// Get user from url param
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
let name = params.get("name"); 



// Check if the user is the owner of this profile
const userName = localStorage.getItem("name");
const followBtn = document.querySelector(".follow");
if(!name) {
    name = userName;
}


// Get profile info
const USER_URL = `${API_URL}/api/v1/social/profiles/${name}?_posts=true&_author=true&_following=true&_followers=true`
const userData = await getWithToken(accessToken, USER_URL); 

const profileName = document.querySelector(".profile-name");
profileName.innerHTML = name;


//FOLLOW
const UNFOLLOW_URL = `${API_URL}/api/v1/social/profiles/${name}/unfollow`
const FOLLOW_URL = `${API_URL}/api/v1/social/profiles/${name}/follow`

function clickToFollowUnfollow(e) {
    e.preventDefault();
    if(followers.find(item => item.name === userName)) { 
        followUnfollow(accessToken, UNFOLLOW_URL);
    } else {
        followUnfollow(accessToken, FOLLOW_URL)
    }
}


// Check if owner of user AND if they are following
const followers = userData.followers;
const optionsDropDown = document.querySelector("#options-dropdown");
if(name !== userName) {
    const dropDownToggle = optionsDropDown.querySelector(".dropdown-toggle")
    const dropDownMenu = optionsDropDown.querySelector(".dropdown-menu")

    optionsDropDown.removeChild(dropDownMenu);
    optionsDropDown.removeChild(dropDownToggle);

    if(followers.find(item => item.name === userName)) { 
        followBtn.innerHTML = "unfollow";
    }
    //LISTEN FOR CLICK ON FOLLOW/UNFOLLOW BUTTON
    followBtn.addEventListener("click", clickToFollowUnfollow);
} else {
    followBtn.remove();
}



// Display last 50 posts
const posts = userData.posts;
const postWrapper = document.querySelector(".post-wrapper");
postWrapper.innerHTML = "";
if(posts.length === 0) {
    postWrapper.innerHTML = `<div class="card d-flex flex-column p-3 green-text">This user doesn't have any posts :(</div>`
} else {

}
for(let i = posts.length - 1; i >= 0; i--) { 
    console.log(posts[i])
    postWrapper.innerHTML += `
    <div class="card d-flex flex-column p-3" id="${posts[i].id}">
        <div class="d-flex justify-content-between">
            <div class="d-flex align-items-center">
                <div class="profile-img-wrapper">
                ${userData.avatar ? 
                `<img src="${userData.avatar}" class="rounded-circle"  onerror="this.src='/assets/components/icons/account-icon.png'">` : `<img src="/assets/components/icons/account-icon.png" class="rounded-circle">`}
                </div>
                <h3 class="user-name"><a href="./profile.html?name=${posts[i].owner}" class="no-style user-hover">${posts[i].owner}</a></h3>
            </div>
            ${userName === posts[i].owner ? 
            `<div class="post-options dropdown d-flex justify-content-end" data-author="${posts[i].owner}">
                <div type="button" class="dropdown-toggle rounded-circle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img src="./assets/components/icons/options-icon.png" alt="edit wheel for posts">
                </div>
                <ul class="dropdown-menu  dropdown-menu-lg-end" aria-labelledby="dropdownMenuButton">
                    <li><a class="dropdown-item" href="./edit.html?id=${posts[i].id}" id="editPost">Edit Post</a></li>
                    <li><button class="dropdown-item" id="removePost"> Delete post</button></li>
                </ul>
            </div>` : ""}
        </div>
        <a href="./post.html?id=${posts[i].id}" class="no-style">
            <div class="ms-5" >
                <h4 class="post-title">${posts[i].title}</h4>
                <p class="post-content">${posts[i].body}</p>
            </div>
        </a>
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
    for(let i = 0; i < following.length; i++) { 
        followingWrapper.innerHTML += `
        <div class="d-flex align-items-center">
            <a href="./profile.html?name=${following[i].name}" class="no-style">
                <div class="profile-img-wrapper d-flex align-items-center w-100">
                ${following[i].avatar ? 
                    `<img class="rounded-circle" src="${following[i].avatar}" onerror="this.src='/assets/components/icons/account-icon.png'">` : `<img class="rounded-circle" src="/assets/components/icons/account-icon.png" onerror="this.src='/assets/components/icons/account-icon.png'">`}
                    <div class="ms-2">
                        <h5 class="mb-0">${following[i].name}</h5>
                    </div>
                </div>
            </a>
        </div>`

        if(i === 2) { 
            break;
        }
    }
}

// If there is an existing banner image, display it
if(userData.banner) {
    const bannerImgWrap = document.querySelector(".banner-img-wrapper");
    const bannerImg = document.createElement("img");
    bannerImg.className = "banner-image h-100";
    bannerImg.src = userData.banner;
    bannerImgWrap.appendChild(bannerImg);
}

if(userData.avatar) {
    const profilePic = document.querySelector("#profilePic");
    profilePic.src = userData.avatar;
}

// Click to Edit Profile Image/Banner
const dropDownMenu = document.querySelector(".dropdown-menu");
const editBanner = document.querySelector("#edit-banner");
const editProfileImage = document.querySelector("#edit-profile-image");

function clickToEdit(e) {

    if(e.target.id === editBanner.id){

        const main = document.querySelector("main");
        const modalWrap = document.createElement("div");
        modalWrap.className = "modal-wrap position-fixed top-0 start-0 w-100 h-100 row justify-content-center align-items-center";
        main.appendChild(modalWrap);
        const form = document.createElement("form");
        form.className = "card form col-11 col-md-6 p-4 d-flex";
        modalWrap.appendChild(form);
        form.innerHTML = `
            <h2 class="align-self-center">Choose a banner</h2>
            <input type="url" title="Please provide an imageURL" id="inputBanner" class="form-control rounded-pill w-75 align-self-center">
            <label for="inputBanner" class="col-form-label align-self-center">Banner must be added as URL/link.</label>
            <p class="text-center">(You can generate a <b>Direct Link</b> here: <a href="https://postimages.org/" target="_blank">https://postimages.org/</a>)</p>
            <button class="btn submitBtn w-50 align-self-center" type="submit">Send</button>
        `;

        document.addEventListener("mousedown", (e) => {
            if(e.target.className === modalWrap.className) {
                modalWrap.remove();
            }
        });

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const UPDATE_IMG_URL = `${API_URL}/api/v1/social/profiles/${userName}/media`;

            const inputBanner = document.querySelector("#inputBanner");
            const inputData = {
                banner: inputBanner.value
            }
        
            putWithToken(accessToken, UPDATE_IMG_URL, inputData);
        });
    }

    if(e.target.id === editProfileImage.id){

        const main = document.querySelector("main");
        const modalWrap = document.createElement("div");
        modalWrap.className = "modal-wrap position-fixed top-0 start-0 w-100 h-100 row justify-content-center align-items-center";
        main.appendChild(modalWrap);
        const form = document.createElement("form");
        form.className = "card form col-11 col-md-6 p-4 d-flex";
        modalWrap.appendChild(form);
        form.innerHTML = `
            <h2 class="align-self-center">Choose a profile image</h2>
            <input type="url" title="Please provide an imageURL" id="inputImage" class="form-control rounded-pill w-75 align-self-center">
            <label for="inputImage" class="col-form-label align-self-center">Image must be added as URL/link.</label>
            <p class="text-center">(You can generate a <b>Direct Link</b> here: <a href="https://postimages.org/" target="_blank">https://postimages.org/</a>)</p>
            <button class="btn submitBtn w-50 align-self-center" type="submit">Send</button>
        `;

        document.addEventListener("mousedown", (e) => {
            if(e.target.className === modalWrap.className) {
                modalWrap.remove();
            }
        });

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const UPDATE_IMG_URL = `${API_URL}/api/v1/social/profiles/${userName}/media`;

            const inputImage = document.querySelector("#inputImage");
            const inputData = {
                avatar: inputImage.value
            }
        
            putWithToken(accessToken, UPDATE_IMG_URL, inputData);
        });
    }
}

if(dropDownMenu){
dropDownMenu.addEventListener("click", clickToEdit);
}


const removeButton = document.querySelector('#removePost')
if(removeButton) {
removeButton.addEventListener('click', manyPosts.removePost)
}

