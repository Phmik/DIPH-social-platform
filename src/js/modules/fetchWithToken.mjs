const userLogin = {
    email: 'PhiMik59854@stud.noroff.no',
    password: 'phillip123',
};

async function loginUser(url, data) {
    try {
      const postData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(url, postData);
      console.log(response);
      const json = await response.json();
      const accessToken = json.accessToken;
      const user = json.name;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('name', user)
      console.log(json); 
      return json;
    }
    catch (error) {
        console.log(error)
    }
    }

    loginUser(`${API_URL}/api/v1/social/auth/login`, userLogin);