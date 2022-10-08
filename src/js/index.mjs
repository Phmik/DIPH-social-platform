import { getWithToken } from "./modules/getWithToken.mjs";
import { redirectToLogIn } from "./modules/redirectToLogIn.mjs";
import { fetchWithToken } from "./modules/fetchWithToken.mjs";
import { renderPosts } from "./modules/posts/renderPosts.mjs";
import { removePost } from "./modules/posts/postGather.mjs";


// POSTS

import * as posts from "./modules/posts/postGather.mjs"




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

