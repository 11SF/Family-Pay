import axios from "axios";
import ForbiddenPage from "../pages/ForbiddenPage";
import { getHeaderAuth, getUserData } from "./AuthService";

//Production
const BASE_URL = "https://cloud.11sf.site/api/v2";
const BASE_URL_LOG_SERVER = "https://cloud.11sf.site/fp";

//Backup Production
// const BASE_URL = "https://mysitebackend.herokuapp.com/api/v2";

//dev
// const BASE_URL = "http://localhost:4000/api/v2";
// const BASE_URL_LOG_SERVER = "http://localhost:8080/fp";

const fetchFamily = async (token) => {
  // let payload = {
  //   token,
  //   hostEmail,
  // };
  let result = await axios.get(BASE_URL + "/member/get/family?token=" + token);
  if (result.status) {
    //console.log(result);
    // if (result.data.msg) {
    //   return (window.location.pathname = "/forbidden");
    // }
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

const createFamily = async (familyName, platform, dueDate, ppNumber) => {
  let result = await axios.post(
    BASE_URL + "/admin/family/create",
    {
      hostEmail: getUserData().sub,
      familyName,
      platform,
      dueDate,
      ppNumber,
    },
    {
      headers: getHeaderAuth(),
    }
  );
  //console.log(result);
  return result.data;
};

const getTokenByEmail = async (token) => {
  let result = await fetchFamily(token);

  if (result.hostEmail !== getUserData().sub) {
    return {
      status: false,
      msg: "ไม่สามารถเข้าถึงได้",
    };
  }
  return {
    status: true,
    data: result,
  };
};

const setMonthAPI = async (payload) => {
  let { id, lastDate, expireDate, familyID } = payload;
  let result = await axios.put(
    BASE_URL + `/admin/members/edit/date/${id}`,
    {
      lastDate,
      expireDate,
      familyID,
    },
    {
      headers: getHeaderAuth(),
    }
  );
  return result.data;
};

const editMember = async (payload) => {
  let { id, name, lastDate, expireDate, img_src, familyID } = payload;
  let result = await axios.put(
    BASE_URL + `/admin/members/edit/${id}`,
    {
      name,
      lastDate,
      expireDate,
      img_src,
      familyID,
    },
    {
      headers: getHeaderAuth(),
    }
  );
  return result.data;
};

const addPriceAPI = async (payload) => {
  const { price, month, img_src, familyID } = payload;

  let result = await axios.post(
    BASE_URL + "/admin/family/price/add",
    {
      price,
      month,
      img_src,
      familyID,
    },
    {
      headers: getHeaderAuth(),
    }
  );

  return result.data;
};

const editPriceAPI = async (payload) => {
  const { price, month, img_src, familyID, id } = payload;

  let result = await axios.put(
    BASE_URL + "/admin/family/price/edit/" + id,
    {
      price,
      month,
      img_src,
      familyID,
    },
    {
      headers: getHeaderAuth(),
    }
  );

  return result.data;
};

const deletePriceAPI = async (payload) => {
  const { familyID, id } = payload;
  // //console.log(payload);

  let result = await axios.put(
    BASE_URL + "/admin/family/price/delete/" + id,
    {
      familyID,
    },
    {
      headers: getHeaderAuth(),
    }
  );

  return result.data;
};

const addMemberAPI = async (payload) => {
  const { name, lastDate, expireDate, img_src, familyID } = payload;
  let result = await axios.post(
    BASE_URL + "/admin/members/add",
    {
      name,
      lastDate,
      expireDate,
      img_src,
      familyID,
    },
    {
      headers: getHeaderAuth(),
    }
  );
  return result.data;
};

const sendNotification = async (payload) => {
  const { familyID } = payload;
  // //console.log(familyID);

  let result = await axios.post(
    BASE_URL + `/admin/pushNotification?token=${familyID}`,
    {},
    {
      headers: getHeaderAuth(),
    }
  );
  //console.log(result);
  if (result.status === 200) {
    sessionStorage.setItem("lastSendMessage", new Date());
  }
  return result.data;
};

const pushConfirmPayment = async (payload) => {
  // let { familyName, memberName, price, month, nextDate, alertId } = payload;
  // let result = await axios.post(
  //   BASE_URL +
  //     `/line/pushConfirmPayment?familyName=${familyName}&memberName=${memberName}&price=${price}&month=${month}&nextDate=${nextDate}&alertId=${alertId}`,
  //   {},
  //   {
  //     headers: getHeaderAuth(),
  //   }
  // );
  // return result.data;
};

const fetchTransactions = async (payload) => {
  let { token } = payload;
  let result = await axios.get(BASE_URL_LOG_SERVER + `/transaction/${token}`);
  return result;
};

const addTransaction = async (payload) => {
  let { member_id, name, family_id, family_name, price, month, date_overdue, old_expire_date, new_expire_date } =
    payload;

  let result = await axios.post(BASE_URL_LOG_SERVER + `/transaction`, {
    member_id,
    name,
    family_id,
    family_name,
    price: parseFloat(price),
    month: parseInt(month),
    date_overdue,
    status: "active",
    old_expire_date,
    new_expire_date
  });

  return result.status;
};

export {
  fetchFamily,
  fetchFamilyByEmail,
  createFamily,
  getTokenByEmail,
  setMonthAPI,
  editMember,
  addPriceAPI,
  editPriceAPI,
  deletePriceAPI,
  addMemberAPI,
  sendNotification,
  pushConfirmPayment,
  fetchTransactions,
  addTransaction,
};
