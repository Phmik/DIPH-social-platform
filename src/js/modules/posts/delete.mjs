import { API_SOCIAL_URL } from "../constants.mjs";

import { fetchWithToken } from "../fetchWithToken.mjs";

const action = "/posts";
const methodGET = "GET";
const author = "?_author=true&_comments=true&_reactions=true";

export async function removePost() {
  const viewPostURL = `${API_SOCIAL_URL}${action}${author}`;
  const response = await fetchWithToken(viewPostURL, {
    methodGET,
  });
  const postIdResult = await response.json();
  
  for (let i = 0; i < postIdResult.length; i++) {
    const postId = postIdResult[i];
    if (localStorage.getItem("name") === postId.author.name) {
      const response = await fetchWithToken(
        `${API_SOCIAL_URL}${action}/${postId.id}`,
        {
          method: "delete",
        }
      );
      
      window.location.reload();
      return response.json();
      }
    }
  }