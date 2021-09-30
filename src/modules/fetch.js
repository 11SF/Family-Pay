import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v2";
const fetchFamily = async (token, hostEmail) => {
  // let payload = {
  //   token,
  //   hostEmail,
  // };
  let result = await axios.get(BASE_URL + "/member/get/family?token=" + token);
  if (result.status) {
    return result.data;
  }
};

export {fetchFamily};

