import { API_SOCIAL_URL } from "../constants.mjs"

import { fetchWithToken } from "../fetchWithToken.mjs";

const action = "/posts"

export async function updatePost(postData) {
    if (!postData.id) {
        throw new Error("Update requires a postID")
    }
    
    const updatePostURL = `${API_SOCIAL_URL}${action}/${postData.id}`;

    const response = await fetchWithToken(updatePostURL, {
        method: "put",
        body: JSON.stringify(postData)
    })
    window.location.href = "./index.html"
    return await response.json()
    
    
}


