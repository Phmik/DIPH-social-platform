import { API_SOCIAL_URL } from "../constants.mjs"
import { fetchWithToken } from "../fetchWithToken.mjs";


const action = "/posts"

export async function getPosts() {
    const updatePostURL = `${API_SOCIAL_URL}${action}`;
    const response = await fetchWithToken(updatePostURL)

    return await response.json();
}


export async function getPost(id) {
    if (!id) {
        throw new Error("Get posts requires an valid ID");
    }
    const getPostURL = `${API_SOCIAL_URL}${action}/${id}`;

    const response = await fetchWithToken(getPostURL)

    return await response.json();
}