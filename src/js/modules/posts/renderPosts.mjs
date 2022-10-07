import * as posts from "./postGather.mjs"

export async function renderPosts() {
    const post = await posts.getPosts();
    for(let i = 0; i < post.length; i++) {
        const postRender = post[i];

        const postContainer = document.querySelector('#postContent')

        const localUser = localStorage.getItem('name')

        
    postContainer.innerHTML += `<div class="card d-flex flex-column p-3 mt-3" id="${postRender.id}">
                                    <div class="d-flex justify-content-between">
                                    <div class="d-flex align-items-center">
                                        <div class="profile-img-wrapper">
                                        <img src="/assets/components/icons/account-icon.png">
                                        </div>
                                        <h3 class="ms-2 user-name"><a href="./profile.html?name=${postRender.author.name}" class="no-style user-hover">${postRender.author.name}</a></h3>
                                    </div>
                                    ${localUser === postRender.author.name ? `<div class="post-options" data-author="${postRender.author.name}">
                                    <img src="./assets/components/icons/options-icon.png" alt="edit wheel for posts"  width="20" height="20">
                                    </div>` : ""}
                                    </div>
                                    <a href="./post.html?id=${postRender.id}" class="no-style">
                                    <div class="ms-5" >
                                        <h4 class="post-title">${postRender.title}</h4>
                                        <p class="post-content">${postRender.body}</p>
                                    </div>
                                    <div class="small-icons d-flex">
                                        <div class="me-3">
                                        <img src="/assets/components/icons/comment.png">
                                            <span>${postRender._count.comments}</span>
                                        </div>
                                    </a>
                                    <div>
                                        <img src="/assets/components/icons/heart-empty.png">
                                        <span>${postRender._count.reactions}</span>
                                    </div>
                                    </div>
                                </div>`                  
    }                        
}