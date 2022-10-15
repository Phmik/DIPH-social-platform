import { getPost } from "./read.mjs";
import { updatePost } from "./update.mjs";
import { getWithToken } from "../getWithToken.mjs";

// UPDATE POST
const accessToken = localStorage.getItem("accessToken");
const localUser = localStorage.getItem("name");
const API_URL = "https://nf-api.onrender.com";
const USER_URL = `${API_URL}/api/v1/social/profiles/${localUser}?_posts=true&_author=true&_following=true&_followers=true`;
const userData = await getWithToken(accessToken, USER_URL);
const userImage = document.querySelectorAll(".user-image");
userImage.forEach((userImages) => {
  userImages.src = userData.avatar;
});

export async function setUpdateFormListener() {
  const form = document.querySelector("#editForm");

  const url = new URL(location.href);
  const id = url.searchParams.get("id");

  
  if (form) {
    const post = await getPost(id);
    form.title.value = post.title;
    form.body.value = post.body;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const post = Object.fromEntries(formData.entries());
      post.id = id;
      
      // API SEND
      if (confirm("Are you sure you want to update this post?")) {
        updatePost(post);
      } else {
        alert("Did not update your post");
      }
    });
  }
}
