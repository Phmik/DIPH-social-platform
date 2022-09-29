
const API_URL = "https://nf-api.onrender.com";

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
  }

  async function createPost(postData, url, method) {
    const options = {
      
      method,
      body: JSON.stringify(postData)
    }
   const response = await fetchWithToken(url, options)
   const post = await response.json();
   console.log(post);
  }

