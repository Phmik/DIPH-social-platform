import { getPost } from "./read.mjs";
import { updatePost } from "./update.mjs";

// UPDATE POST

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
        alert("Post updated! Cheerio");
        updatePost(post);
      } else {
        alert("Did not update your post");
      }
    });
  }
}
