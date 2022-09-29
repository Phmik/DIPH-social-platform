import { getWithToken } from "./modules/getWithToken.mjs";
import { redirectToLogIn } from "./modules/redirectToLogIn.mjs";

const API_URL = "https://nf-api.onrender.com";

const accessToken = localStorage.getItem("accessToken");


/**Check if there is an existing accessToken
 * 
 * @param {string} token 
 * @param {string} url
 */
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


/* Tror ikke du trenger denne lenger, men gjør noen tester før du sletter!
async function fetchWithToken(url) {

        const token = localStorage.getItem('accessToken');
        const getData = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(url, getData);
        if(response.ok) {
        return response
        }
        else {
            throw new Error("Auch")
        }
}
*/

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
    const method = form.method;
    const url = form.action;
    const formData = new FormData(form);
    const body = Object.fromEntries(formData.entries());
    await createPost(body, url, method) 
    form.reset();
  }

  // CREATE POST 

  

  async function createPost(postData, url, method) {
    const options = {
      method,
      body: JSON.stringify(postData)
    }
    console.log(postData);
   const response = await fetchWithToken(url, options)
   const post = await response.json();
   console.log(post)
  }

const posts = document.querySelector('.post-content');

async function fetchPosts(method) {
  const options = {
    method,
  }
  const response = await fetchWithToken(`${API_URL}/api/v1/social/posts/?_author=true`, options)
  const postResults = await response.json();
  console.log(postResults)
  for(let i = 0; i < postResults.length; i++) {
    const postIndex = postResults[i];
    posts.innerHTML += "";
    posts.innerHTML += `<div class="card d-flex flex-column p-3 mt-3">
    <div class="d-flex align-items-center">
        <div class="profile-img-wrapper">
            <img src="/assets/components/icons/account-icon.png">
        </div>
        <h2 class="ms-2 user-name">${postIndex.author.name}</h2>
    </div>
    <div class="ms-5">
    <h5>${postIndex.title}</h5>
        <p class="posts">${postIndex.body}</p>
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

fetchPosts();

  


