import { getWithToken } from "./modules/getWithToken.mjs";
import { postWithToken } from "./modules/postWithToken.mjs";
import { putWithToken } from "./modules/putWithToken.mjs";
import { redirectToLogIn } from "./modules/redirectToLogIn.mjs";
import { returnPostDate } from "./modules/constants.mjs";
import * as posts from "./modules/posts/postGather.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const API_URL = "https://nf-api.onrender.com";
const POST_URL = `${API_URL}/api/v1/social/posts/${id}?_author=true&_comments=true&_reactions=true`;

const accessToken = localStorage.getItem("accessToken");
const localUser = localStorage.getItem("name");

// Check if there's a token - if not, redirectToLogIn
function checkIfToken(token) {
  if (token) {
  } else {
    redirectToLogIn();
  }
}

checkIfToken(accessToken);

// Logged in user info
const USER_URL = `${API_URL}/api/v1/social/profiles/${localUser}?_posts=true&_author=true&_following=true&_followers=true`;
const userData = await getWithToken(accessToken, USER_URL);
const userImage = document.querySelectorAll(".user-image");
userImage.forEach((userImages) => {
  userImages.src = userData.avatar;
});

// GET post
const post = await getWithToken(accessToken, POST_URL);

// Display post information
const postAuthor = document.querySelector(".author-name");
const userLink = document.querySelector(".user-link");
const postTitle = document.querySelector(".post-title");
const postContent = document.querySelector(".post-content");
const commentCounter = document.querySelector("#comment-counter");
// const reactCounter = document.querySelector("#react-counter");
const postDate = document.querySelector(".post-date");
const postOptions = document.querySelector(".post-options");
const author = post.author;

userLink.href = `./profile.html?name=${author.name}`;
postAuthor.innerHTML = author.name;
postTitle.innerHTML = post.title;
postContent.innerHTML = post.body;
commentCounter.innerHTML = post._count.comments;
// reactCounter.innerHTML = post._count.reactions;
postDate.innerHTML = returnPostDate(new Date(post.created));
postOptions.innerHTML = `
${
  localUser === author.name
    ? `<div class="post-options" data-author="${author.name}">
        <div class="dropdown d-flex justify-content-end">
            <div type="button" class="dropdown-toggle mt-1" class="rounded-circle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img src="./assets/components/icons/options-icon.png" alt="edit wheel for posts">
            </div>
            <ul class="dropdown-menu dropdown-menu-lg-end" aria-labelledby="dropdownMenuButton">
                <li><a class="dropdown-item" href="./edit.html?id=${author.id}" id="editPost">Edit Post</a></li>
                <li><button class="dropdown-item" id="removePost"> Delete post</button></li>
            </ul>
        </div>
    </div>`
    : ""
}`;

// Display author image
const AUTHOR_URL = `${API_URL}/api/v1/social/profiles/${author.name}?_posts=true&_author=true&_following=true&_followers=true`;
const authorData = await getWithToken(accessToken, AUTHOR_URL);
const authorImage = document.querySelector(".author-image");

if (authorData.name !== localUser && authorData.avatar !== "") {
  authorImage.src = authorData.avatar;
}
if (authorData.name === localUser) {
  authorImage.src = userData.avatar;
}

// Display comments
const comments = post.comments;
const postWrapper = document.querySelector(".post-wrapper");

postWrapper.innerHTML = "";

for (let i = 0; i < comments.length; i++) {
  const COMMENTER_URL = `${API_URL}/api/v1/social/profiles/${comments[i].owner}?_posts=true&_author=true&_following=true&_followers=true`;
  const commenterData = await getWithToken(accessToken, COMMENTER_URL);

  postWrapper.innerHTML += `
    <div id="${comments[i].id}" class="card d-flex flex-column p-3 mt-3">
        <a href="./profile.html?name=${comments[i].owner}">
            <div class="d-flex align-items-center">
                <div class="profile-img-wrapper">
                ${
                  commenterData.avatar
                    ? `<img src="${commenterData.avatar}" class="rounded-circle"  onerror="this.src='/assets/components/icons/account-icon.png'">`
                    : `<img src="/assets/components/icons/account-icon.png" class="rounded-circle">`
                }
                </div>
                <h3 class="no-style user-hover">${comments[i].owner}</h3>
            </div>
        </a>
        <div class="ms-5">
            <h4 class="post-title"${comments[i].title}></h4>
            <p class="post-content">${comments[i].body}</p>
        </div>
        <div class="d-flex justify-content-between">
            <p class="post-content text-bg green-text ms-5">
                ${returnPostDate(new Date(comments[i].created))}
            </p>
        </div>
    </div>`;
}

const removeButton = document.querySelector("#removePost");
if (removeButton) {
  removeButton.addEventListener("click", posts.removePost);
}

// Display current user's Name
const name = localStorage.getItem("name");
const userName = document.querySelector(".profile-name");
userName.innerHTML = name;

// Post a comment
const form = document.querySelector("form");
const COMMENT_URL = `${API_URL}/api/v1/social/posts/${id}/comment`;
const comment = document.querySelector("#postInput");

function postComment(e) {
  const userInput = {
    body: comment.value,
  };

  e.preventDefault();
  if (userInput.body.length > 0) {
    postWithToken(accessToken, COMMENT_URL, userInput);
    form.reset();
  } else {
    console.log("value empty or isn't coming through");
  }
}

form.addEventListener("submit", postComment);

// React to post
const heart = document.querySelector("#react-icon");
const REACT_URL = `${API_URL}/api/v1/social/posts/${id}/react/♥`;

if (localStorage.getItem(`react-${id}`)) {
  heart.src = "/assets/components/icons/heart.png";
}

function clickHeart() {
  if (!localStorage.getItem(`react-${id}`)) {
    const react = {
      // symbol: "♥",
      // count: post._count.reactions,
      // postID: id
    };

    localStorage.setItem(`react-${id}`, "liked");
    heart.src = "/assets/components/icons/heart.png";
    putWithToken(accessToken, REACT_URL, react);
  } else {
    localStorage.removeItem(`react-${id}`);
    heart.src = "/assets/components/icons/heart-empty.png";
  }
}

heart.addEventListener("click", clickHeart);
