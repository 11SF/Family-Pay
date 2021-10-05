import axios from "axios";
import { getHeaderAuth, getUserData } from "./AuthService";

const BASE_URL = "http://localhost:5000/api/v2";
const fetchFamily = async (token) => {
  // let payload = {
  //   token,
  //   hostEmail,
  // };
  let result = await axios.get(BASE_URL + "/member/get/family?token=" + token);
  if (result.status) {
    return result.data;
  }
};
const fetchFamilyByEmail = async (hostEmail) => {
  let result = await axios.get(
    BASE_URL + "/member/get/family?hostEmail=" + hostEmail
  );
  if (result.status) {
    return result.data;
  }
};

const createFamily = async (familyName, platform) => {
  let result = await axios.post(
    BASE_URL + "/admin/family/create",
    {
      hostEmail: getUserData().sub,
      familyName,
      platform,
    },
    {
      headers: getHeaderAuth(),
    },
  );
  console.log(result);
  return result.data;
};

const getTokenByEmail = async (token) => {
  let result = await fetchFamily(token)

  if(result.hostEmail !== getUserData().sub) {
    return {
      status : false,
      msg: "ไม่สามารถเข้าถึงได้"
    }
  }
  return {
    status : true,
    data: result
  }
}

export { fetchFamily, fetchFamilyByEmail, createFamily, getTokenByEmail };
