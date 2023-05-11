const API_BASE_URL = "https://custom-cms.onrender.com";
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
    const response = await fetch(`${API_BASE_URL}/api/dashboard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};
const getProjects = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/dashboard/my-projects`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};
const getProjectById = async (id, token) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/my-projects/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};
const createProject = async (formData, token) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/my-projects/create`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};
const updateProjectById = async (id, formData, token) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/my-projects/${id}`,
      {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};
const deleteProjectById = async (id, token) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/my-projects/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};
const createBlog = async (formData, token) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/my-blog/create`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};
const getBlogById = async (id, token) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/my-blog/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};
const getBlogs = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/dashboard/my-blog`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};
const updateBlogById = async (id, formData, token) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/my-blog/${id}`,
      {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};
const deleteBlogById = async (id, token) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/my-blog/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};
const getApiKey = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/dashboard/api-key`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};

export default {
  login,
  register,
  verify,
  getProjects,
  getProjectById,
  createProject,
  updateProjectById,
  deleteProjectById,
  createBlog,
  getBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
  getApiKey,
};
