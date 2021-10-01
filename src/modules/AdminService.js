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
  console.log(getHeaderAuth());
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

export { fetchFamily, fetchFamilyByEmail, createFamily };
