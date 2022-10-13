import * as posts from "./postGather.mjs";
import { returnPostDate } from "../constants.mjs";
import { handleSearchControlUp } from "./filterPosts.mjs";

export async function renderPosts(postList) {
  const postContainer = document.querySelector("#postContent");
  const media = document.querySelector('.img-wrapper')

  

  // POST RENDER
  postContainer.innerHTML = "";
  for (let i = 0; i < postList.length; i++) {
    const postRender = postList[i];
    
    console.log(postRender)

    const localUser = localStorage.getItem("name");

    postContainer.innerHTML += `<div class="card d-flex flex-column p-3 mt-3" id="${
      postRender.id
    }">
                                        <div class="d-flex justify-content-between">
                                        <div class="d-flex align-items-center">
                                            <div class="profile-img-wrapper">
                                            ${
                                              postRender.author.avatar
                                                ? `<img src="${postRender.author.avatar}" class="rounded-circle" onerror="this.src='/assets/components/icons/account-icon.png'">`
                                                : `<img src="/assets/components/icons/account-icon.png" class="rounded-circle">`
                                            }
                                            </div>
                                            <h3 class="ms-2 user-name"><a href="./profile.html?name=${
                                              postRender.author.name
                                            }" class="no-style user-hover">${
      postRender.author.name
    }</a></h3>
                                        </div>
                                        ${
                                          localUser === postRender.author.name
                                            ? `
                                            <div class="post-options" data-author="${postRender.author.name}">
                                                <div class="dropdown d-flex justify-content-end">
                                                    <div type="button" class="dropdown-toggle mt-1" class="rounded-circle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        <img src="./assets/components/icons/options-icon.png" alt="edit wheel for posts"  width="40" height="40">
                                                    </div>
                                                    <ul class="dropdown-menu dropdown-menu-lg-end" aria-labelledby="dropdownMenuButton">
                                                        <li><a class="dropdown-item" href="./edit.html?id=${postRender.id}" id="editPost">Edit Post</a></li>
                                                        <li><button class="dropdown-item" id="removePost"> Delete post</button></li>
                                                    </ul>
                                                </div>
                                            </div>`
                                            : ""
                                        }
                                        </div>
                                        <a href="./post.html?id=${
                                          postRender.id
                                        }" class="no-style">
                                        <div class="ms-5" >
                                            <h4 class="post-title">${
                                              postRender.title
                                            }</h4>
                                            <p class="post-content">${
                                              postRender.body
                                            }</p>
                                            ${postRender.media ?
                                            `<div class="img-wrapper">
                                              <img src="${postRender.media}" alt=">
                                            </div>
                                            `
                                            : ""
                                          }
                                        </div>
                                        <div class="d-flex justify-content-between">
                                            <p class="post-content green-text ms-5">
                                                ${returnPostDate(
                                                  new Date(postRender.updated)
                                                )}
                                            </p>
                                        </div>
                                        <div class="small-icons d-flex">
                                            <div class="me-3">
                                            <img src="/assets/components/icons/comment.png">
                                                <span>${
                                                  postRender._count.comments
                                                }</span>
                                            </div>
                                        </a>
                                        <div>
                                             ${
                                               localStorage.getItem(
                                                 `react-${postRender.id}`
                                               )
                                                 ? `<img src="/assets/components/icons/heart.png" class="heart" id="react-${postRender.id}">`
                                                 : `<img src="/assets/components/icons/heart-empty.png" class="heart" id="react-${postRender.id}">`
                                             }
                                        </div>
                                        `;            
  }



  // REMOVE POST

  const removeButton = document.querySelector("#removePost");
  if (removeButton) {
    removeButton.addEventListener("click", posts.removePost);
  }

  // SEARCH

  const search = document.querySelector("#searchInput");
  search.addEventListener("keyup", (event) =>
    handleSearchControlUp(event, postList)
  );
}
