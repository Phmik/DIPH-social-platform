import * as posts from "./postGather.mjs"

export async function renderPosts() {
    const post = await posts.getPosts();
    for(let i = 0; i < post.length; i++) {
        const postRender = post[i];
    const postContainer = document.querySelector('#postContent')
    postContainer.innerHTML += `
                                <div class="card d-flex flex-column p-3 mt-3">
                                    <div class="d-flex align-items-center">
                                        <div class="profile-img-wrapper">
                                            <img src="/assets/components/icons/account-icon.png">
                                        </div>
                                        <h2 class="ms-2 user-name">${postRender.author.name}</h2>
                                    </div>
                                    <div class="ms-5" >
                                        <h4 class="post-title">${postRender.title}</h4>
                                        <p class="post-content">${postRender.body}</p>

                                    </div>
                                    <div class="small-icons d-flex">
                                        <div class="me-3">
                                            <img src="/assets/components/icons/comment.png">
                                            <span>0</span>
                                        </div>
                                        <div>
                                            <img src="/assets/components/icons/heart-empty.png">
                                            <span>0</span>
                                        </div>
                                    </div>
                                </div>`
    }
  }