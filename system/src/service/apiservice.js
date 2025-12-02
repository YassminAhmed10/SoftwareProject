// src/service/apiservice.js

const API_BASE_URL = "http://127.0.0.1:8000/api";

// --------------------------
// AUTH UTILITIES
// --------------------------
export const isAuthenticated = () => {
  return !!localStorage.getItem("accessToken");
};

export const logoutUser = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
};

// --------------------------
// REGISTER USER
// --------------------------
export const registerUser = async (fullName, email, password) => {
  const username = fullName.split(" ")[0]; // Use first name as username

  const response = await fetch(`${API_BASE_URL}/signup/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password, first_name: fullName }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Signup failed");
  }

  const data = await response.json();
  localStorage.setItem("accessToken", data.tokens.access);
  localStorage.setItem("refreshToken", data.tokens.refresh);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data;
};

// --------------------------
// LOGIN USER
// --------------------------
export const loginUser = async (usernameOrEmail, password) => {
  const response = await fetch(`${API_BASE_URL}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: usernameOrEmail, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Login failed");
  }

  const data = await response.json();
  localStorage.setItem("accessToken", data.tokens.access);
  localStorage.setItem("refreshToken", data.tokens.refresh);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data;
};

// --------------------------
// GET USER PROFILE
// --------------------------
export const getUserProfile = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("User not authenticated");

  const response = await fetch(`${API_BASE_URL}/profile/`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch profile");
  }

  return await response.json();
};
