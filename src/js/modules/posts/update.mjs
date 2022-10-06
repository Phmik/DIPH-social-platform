import { API_SOCIAL_URL } from "../constants.mjs"

import { fetchWithToken } from "../fetchWithToken.mjs";

const action = "/posts"
const owner = "?_author=true&_comments=true&_reactions=true"
const method = "put";

export async function updatePost(postData) {
    if (!postData.id) {
        throw new Error("Update requires a postID")
    }
    
    const updatePostURL = `${API_SOCIAL_URL}${action}/${postData.id}`;

    const response = await fetchWithToken(updatePostURL, {
        method,
        body: JSON.stringify(postData)
    })

    return await response.json()
}



export async function optionsWheel(postData) {
    const userURL = `${API_SOCIAL_URL}${action}${owner}`
    const response = await fetchWithToken(userURL, {
        method: "GET",
        body: JSON.stringify(postData)
    })

    const userGet = await response.json()
    const userName = localStorage.getItem("name")
    for(let i = 0; i < userGet.length; i++) {
        if (userGet[i].author.name === userName){
            const editWheel = document.querySelector(".post-options");
            editWheel.innerHTML += `<img src="./assets/components/icons/options-icon.png" alt="edit wheel for posts">`
        }
    }
}

