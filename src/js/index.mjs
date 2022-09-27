const API_URL = "https://nf-api.onrender.com";
const POST_URL = "/api/v1/social/posts"
const PROFILE_URL = "/api/v1/social/profiles"
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEwMiwibmFtZSI6IlBITSIsImVtYWlsIjoiUGhpTWlrNTk4NTRAc3R1ZC5ub3JvZmYubm8iLCJhdmF0YXIiOm51bGwsImJhbm5lciI6bnVsbCwiaWF0IjoxNjY0Mjc5NjAyfQ.NWE_UmWk21H9ZoFwR9p-1iiQaSPZc7sEKjP5Kj4t5yc

const options = {
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEwMiwibmFtZSI6IlBITSIsImVtYWlsIjoiUGhpTWlrNTk4NTRAc3R1ZC5ub3JvZmYubm8iLCJhdmF0YXIiOm51bGwsImJhbm5lciI6bnVsbCwiaWF0IjoxNjY0Mjc5NjAyfQ.NWE_UmWk21H9ZoFwR9p-1iiQaSPZc7sEKjP5Kj4t5yc'
    },
}   

        
/*
fetch(`${API_URL}/api/v1/social/auth/login`, {
    method: 'POST',
    body: JSON.stringify({
        email: 'PhiMik59854@stud.noroff.no',
        password: 'phillip123',
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8'
    },
})
    .then((response) => response.json())
    .then((json) => console.log(json))
*/
const userName = document.querySelector('.user-name');

function getUser() {
    fetch(`${API_URL}${PROFILE_URL}`, options)
    .then((response) => response.json())
    .then((result) => console.log(result))
    }

getUser();