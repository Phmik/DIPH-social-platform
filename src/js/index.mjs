import { getWithToken } from "./modules/getWithToken.mjs";
import { redirectToLogIn } from "./modules/redirectToLogIn.mjs";
import { fetchWithToken } from "./modules/fetchWithToken.mjs";
import { renderPosts } from "./modules/posts/renderPosts.mjs";
import { removePost } from "./modules/posts/postGather.mjs";
import { putWithToken } from "./modules/putWithToken.mjs";


// POSTS

import * as posts from "./modules/posts/postGather.mjs"
import { setupPage } from "./modules/posts/filterPosts.mjs";

const API_URL = "https://nf-api.onrender.com";
const accessToken = localStorage.getItem("accessToken");

function checkIfToken(token, url) {
    if(token) {
        getWithToken(token, url);
        console.log("yes, token!");
    } else {
        console.log("no token...");
        redirectToLogIn();
    }
}



const POSTS_URL = `${API_URL}/api/v1/social/posts/`

checkIfToken(accessToken, POSTS_URL);


// LOGGED IN USER POST AREA

const userName = localStorage.getItem('name');
const self = document.querySelector('.self-user');
self.innerHTML = `${userName}`;



//Get user info - and display avatar
const USER_API = `${API_URL}/api/v1/social/profiles/${userName}`
const currentUser = await getWithToken(accessToken, USER_API);
const userImage = document.querySelectorAll(".user-image")
userImage.forEach(userImages => {(userImages.src = currentUser.avatar)});


// FORM FOR CREATING POST (EVENT HANDLER)

const newPost = document.getElementById('newPost')

newPost.addEventListener('submit', onNewPostFormSubmit)

async function onNewPostFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const body = Object.fromEntries(formData.entries());
    const title = Object.fromEntries(formData.entries())
    posts.createPost(body, title)
        
        form.reset();
    }

  renderPosts();

  await renderPosts();

// React to post 
const heart = document.querySelectorAll(".heart");

function clickHeart(e) {

    const id = e.target.id.substring(6);
    const REACT_URL = `${API_URL}/api/v1/social/posts/${id}/react/♥`;

    if(!localStorage.getItem(`react-${id}`)){
        const react = {
            // symbol: "♥",
            // count: post._count.reactions,
            // postID: id
        }
    
        localStorage.setItem(`react-${id}`, "liked");
        e.target.src = "/assets/components/icons/heart.png"
        putWithToken(accessToken, REACT_URL, react);
    } else {
        localStorage.removeItem(`react-${id}`);
        e.target.src = "/assets/components/icons/heart-empty.png"
    }
}

heart.forEach(hearts => {(hearts.addEventListener("click", clickHeart))});