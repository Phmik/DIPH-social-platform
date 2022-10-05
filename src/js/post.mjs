<<<<<<< js2Phillip
import { checkIfToken } from "./modules/checkIfToken.mjs";
import { readSinglePost } from "./modules/posts/singlePost.mjs";
=======
import { getWithToken } from "./modules/getWithToken.mjs";
import { postWithToken } from "./modules/postWithToken.mjs";
>>>>>>> js2
import { redirectToLogIn } from "./modules/redirectToLogIn.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
// const id = params.get("id");                      <----- change to this when param has been added to url
const id = "1011";

// if(!id) {
//     window.location.href = "index.html";
// } 

const API_URL = "https://nf-api.onrender.com";
const POST_URL = `${API_URL}/api/v1/social/posts/${id}?_author=true&_comments=true&_reactions=true`

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


// GET post
const post = await getWithToken(accessToken, POST_URL)


// Display post information
const postAuthor = document.querySelector(".author-name");
const author = post.author;
postAuthor.innerHTML = author.name;

const postTitle = document.querySelector("#post-title");
const postContent = document.querySelector("#post-content");
const commentCounter = document.querySelector("#comment-counter");
const reactCounter = document.querySelector("#react-counter");

postTitle.innerHTML = post.title;
postContent.innerHTML = post.body;
commentCounter.innerHTML = post._count.comments;
reactCounter.innerHTML = post._count.reactions;


// Display comments
const comments = post.comments;
const postWrapper = document.querySelector(".post-wrapper");

postWrapper.innerHTML = ""
for(let i = 0; i < comments.length; i++) { 
    postWrapper.innerHTML += `
    <div id="${comments[i].id}" class="card d-flex flex-column p-3 mt-3">
        <div class="d-flex align-items-center">
            <div class="profile-img-wrapper">
                <img src="/assets/components/icons/account-icon.png">
            </div>
            <h3 class="ms-2">${comments[i].owner}</h3>
        </div>
        <div class="ms-5">
            <h4 id="post-title"${comments[i].title}></h4>
            <p id="post-content">${comments[i].body}</p>
        </div>
    </div>`
}



// Display current user's Name 
const name = localStorage.getItem("name");
const userName = document.querySelector(".profile-name");
userName.innerHTML = name;


// Post a comment
const form = document.querySelector("form");
const COMMENT_URL = `${API_URL}/api/v1/social/posts/${id}/comment`;
const comment = document.querySelector("#postInput");

const userInput = {
    body: comment.value
}

function postComment(e) {
    e.preventDefault();
    postWithToken(accessToken, COMMENT_URL, userInput);
}

form.addEventListener("submit", postComment);


// React to post
const heart = document.querySelector("#react-icon");
const REACT_URL = `${API_URL}/api/v1/social/posts/${id}/react/like`;

// const react = {
//     symbol: "like",
//     count: "number",
//     postID: id
// }

// function clickHeart(e) {
//     postWithToken()
// }

// heart.addEventListener("click", clickHeart);        ------------ UNDER CONSTRUCTION
