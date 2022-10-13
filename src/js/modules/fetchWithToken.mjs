export function headers() {
  const token = localStorage.getItem("accessToken");

  return {
    "Content-Type": "application/json; charset=UTF-8",
    Authorization: `Bearer ${token}`,
  };
}

export async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: headers(),
  });
}
