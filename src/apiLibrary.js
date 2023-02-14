const API_BASE_URL = "http://localhost:3001";
const login = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    });
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    throw error;
  }
};
const register = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};
const verify = async (token) => {
  try {
    const data = await fetch(`${API_BASE_URL}/api/dashboard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = await data.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};

export default {
  login,
  register,
  verify,
};
