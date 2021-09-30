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

export {goLogin, logout, getUserData, isLogin};
