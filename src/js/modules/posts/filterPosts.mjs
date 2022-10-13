import { getPosts } from "./read.mjs";
import { renderPosts } from "./renderPosts.mjs";

// SETUP PAGE

export async function setupPage() {
  const allPosts = await getPosts();
  renderPosts(allPosts);

  const sortSelect = document.querySelector("#filterSelect");
  sortSelect.addEventListener("input", (event) =>
    onSortSelect(event, allPosts)
  );
  const formSelect = document.querySelector("#selectForm");
  formSelect.reset();

  return "Ready";
}
// SORTING ALGORHYTHM

function sortByNewest(postA, postB) {
  return new Date(postB.created) - new Date(postA.created);
}

function sortByOldest(postA, postB) {
  return new Date(postA.created) - new Date(postB.created);
}

function sortByUsername(postA, postB) {
  return postA.author.name.toLowerCase() < postB.author.name.toLowerCase()
    ? -1
    : 1;
}

function sortByTitle(postA, postB) {
  return postA.title.toLowerCase() < postB.title.toLowerCase() ? -1 : 1;
}

// POST SORT

function sortPostsByNewest(posts) {
  return posts.sort(sortByNewest);
}

function sortPostsByOldest(posts) {
  return posts.sort(sortByOldest);
}

function sortPostsByUsername(posts) {
  return posts.sort(sortByUsername);
}

function sortPostsByTitle(posts) {
  return posts.sort(sortByTitle);
}

// SORT EVENT HANDLERS

function onSortSelect(event, allPosts = []) {
  const select = event.target;
  const value = select.value;
  switch (value) {
    case "newest":
      renderPosts(sortPostsByNewest(allPosts));
      break;
    case "oldest":
      renderPosts(sortPostsByOldest(allPosts));
      break;
    case "username":
      renderPosts(sortPostsByUsername(allPosts));
      break;
    case "title":
      renderPosts(sortPostsByTitle(allPosts));
      break;
  }
}

// SEARCH FUNCTION

export function handleSearchControlUp(event, allPosts = []) {
  const inputValue = event.target.value.toLowerCase();
  const result = allPosts.filter((post) => {
    if(post.title.toLowerCase().startsWith(inputValue)) {

      return true
    }
    
  })

return renderPosts(result)

    }