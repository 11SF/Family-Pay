import axios from "axios";
import jwt_decode from "jwt-decode";
const BASE_URL = "http://localhost:5000/api/auth";

async function goLogin(username, password) {
  let res = await axios.post(BASE_URL + "/login", {
    username,
    password,
  });
  console.log(res);
  if (res.data.status) {
    sessionStorage.setItem("userToken", res.data.token);
    return true;
  }
  return false;
}
function logout() {
  sessionStorage.removeItem("userToken");
}
function getUserData() {
  let userToken = sessionStorage.getItem("userToken");
  let result = jwt_decode(userToken);
  return result;
}
function isLogin() {
  let userToken = sessionStorage.getItem("userToken");
  if (userToken) {
    return true;
  } else {
    return false;
  }
}

function getHeaderAuth() {
  return {
    Authorization: "Bearer " + sessionStorage.getItem("userToken"),
  };
}

async function register(payload) {
  const {email, username, password} = payload;
  let res = await axios.post(BASE_URL + "/register", {
    email,
    username,
    password,
    userLevel: "admin",
  });
  return res.data
}

export {goLogin, logout, getUserData, isLogin, getHeaderAuth, register};
