const API_URL = "https://nf-api.onrender.com";

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRpbmFPIiwiaWF0IjoxNjY0MjAxNzc3fQ.VT9sYZ1ZSMaKJnOxfnITzLcsAkzTJGf0sWFSp6QvCSw

const options = {
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRpbmFPIiwiaWF0IjoxNjY0MjAxNzc3fQ.VT9sYZ1ZSMaKJnOxfnITzLcsAkzTJGf0sWFSp6QvCSw'
    },
}

const response = await fetch(`${API_URL}/api/v1/social/profiles/name?_posts=true&_following=true&_followers=true`, options)
const result = await response.json();


const userName = document.querySelector(".user-name");
const posts = document.querySelector(".posts");



function getUser() {
    for(let i = 0; i < result.length; i++) {
        userName.innerHTML = result[i].name;
    }
    
}

getUser();




        
        
    

