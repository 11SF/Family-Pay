import axios from "axios";
import jwt_decode from "jwt-decode";
const BASE_URL = "https://cloud.11sf.site/api/auth";
// const BASE_URL = "https://mysitebackend.herokuapp.com/api/auth";
// const BASE_URL = "https://5f19-171-6-156-226.ap.ngrok.io/api/v2";


async function goLogin(username, password) {
  try {
    let res = await axios.post(BASE_URL + "/login", {
      username,
      password,
    });
    if (res.data.status) {
      sessionStorage.setItem("userToken", res.data.token);
      return true;
    }
  } catch (err) {
    return false;
  }
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
  return res.data;
}

export {goLogin, logout, getUserData, isLogin, getHeaderAuth, register};
