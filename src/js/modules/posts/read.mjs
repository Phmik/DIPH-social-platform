import { API_SOCIAL_URL } from "../constants.mjs";
import { fetchWithToken } from "../fetchWithToken.mjs";

const action = "/posts";
const author = "?_author=true&_comments=true&_reactions=true";

export async function getPosts() {
  const updatePostURL = `${API_SOCIAL_URL}${action}${author}`;
  const response = await fetchWithToken(updatePostURL);
  return await response.json();
}

export async function getPost(id) {
  if (!id) {
    throw new Error("Get post requires an valid ID");
  }
  const getPostURL = `${API_SOCIAL_URL}${action}/${id}${author}`;
  
  const response = await fetchWithToken(getPostURL);
  return await response.json();
}

export async function getUser(id) {
  if (!id) {
    throw new Error("Get posts requires an valid ID");
  }
  const getPostURL = `${API_SOCIAL_URL}${userURL}/${id}`;

  const response = await fetchWithToken(getPostURL);

  return await response.json();
}
