import axios from "axios";
import jwt_decode from "jwt-decode";

//Production
const BASE_URL = "https://cloud.11sf.site/api/auth";

//Backup Production
// const BASE_URL = "https://mysitebackend.herokuapp.com/api/auth";

//dev
// const BASE_URL = "http://localhost:4000/api/auth";

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
  const { email, username, password } = payload;
  let res = await axios.post(BASE_URL + "/register", {
    email,
    username,
    password,
    userLevel: "admin",
  });
  return res.data;
}

async function getAPIVersion() {
  let res = await axios.get("https://cloud.11sf.site/api/version");
  return res.data;
}

async function getLogVerion() {
  let res = await axios.get("https://cloud.11sf.site/fp/version");
  return res.data;
}

export {
  goLogin,
  logout,
  getUserData,
  isLogin,
  getHeaderAuth,
  register,
  getAPIVersion,
  getLogVerion
};
