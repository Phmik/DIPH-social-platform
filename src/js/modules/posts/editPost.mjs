import { setUpdateFormListener } from "./updatePost.mjs";

const userName = localStorage.getItem('name');
const self = document.querySelector('.self-user');
self.innerHTML = `${userName}`;

setUpdateFormListener()