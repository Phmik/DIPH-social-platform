
const API_URL = "https://nf-api.onrender.com";

async function fetchUserInfo(url) {

        const token = localStorage.getItem('accessToken');
        const getData = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(url, getData);
        const json = await response.json();
        console.log(json)
        for(let i = 0; i < json.length; i++) {
            if(i = 5) {
            const userInfo = json[i];
                posts.innerHTML = `<div class="card d-flex flex-column p-3 mt-3">
                <div class="d-flex align-items-center">
                    <div class="profile-img-wrapper">
                        <img src="/assets/components/icons/account-icon.png">
                    </div>
                    <h2 class="ms-2 user-name">${userInfo.author.name}</h2>
                </div>
                <div class="ms-5">
                    <p class="posts">${userInfo.title}</p>
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
}

const posts = document.querySelector('.post-content');
fetchUserInfo(API_URL + '/api/v1/social/posts/?_author=true&_comments=true&_reactions=true')

