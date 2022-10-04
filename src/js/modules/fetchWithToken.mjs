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
  if(!response.ok) {
  return response
  }
  else {
      throw new Error("Auch")
  }
}

export { fetchWithToken };