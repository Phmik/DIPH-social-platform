export function postTemplate(postData) {
    const post = document.createElement("div")
    post.classList.add("post");
    post.innerText = postData.title;
    return post;
}