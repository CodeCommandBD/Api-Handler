import axios from "./axiosConfig";

// ============================================
// AUTH API CALLS
// ============================================

export const loginUser = async (credentials) => {
  const response = await axios.post("/users/login", credentials);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axios.post("/users/register", userData);
  return response.data;
};

// ============================================
// USER PROFILE API CALLS
// ============================================

export const getProfile = async () => {
  const response = await axios.get("/users/profile");
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await axios.put("/users/profile", profileData);
  return response.data;
};

export const changePassword = async (passwordData) => {
  const response = await axios.patch("/users/password", passwordData);
  return response.data;
};

export const deleteAccount = async (passwordData) => {
  const response = await axios.delete("/users/account", {
    data: passwordData,
  });
  return response.data;
};

// ============================================
// USERS API CALLS
// ============================================

export const getAllUsers = async () => {
  const response = await axios.get("/users/all");
  return response.data;
};

export const getUserById = async (id) => {
  const response = await axios.get(`/users/${id}`);
  return response.data;
};
