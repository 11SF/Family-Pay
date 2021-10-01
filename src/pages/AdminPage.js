import React, { useState, useEffect } from "react";
import HomeAdmin from "../components/Admin/HomeAdmin";
import { getUserData } from "../modules/AuthService";
import { fetchFamilyByEmail } from "../modules/AdminService";
import { useHistory } from "react-router-dom";
import {useParams} from "react-router";
// import Swal from "sweetalert2";
const menuList = ["หน้าแรก", "รายชื่อสมาชิก", "ข้อมูลครอบครัว", "ข้อมูลราคา"];

function AdminPage() {
  const [menuIndex, setMenuIndex] = useState(0);
  const history = useHistory();
  const {token} = useParams();
  // const [familySelect, setFamilySelect] = useState("");
  // const [family, setFamily] = useState([]);

  useEffect(() => {
    // fetchData();
    // if (!token) {
    //   history.push("/admin/selectfamily");
    // }
  }, []);

  function getPage() {
    switch (menuIndex) {
      case 1:
        return "1";
      case 2:
        return "2";
      case 3:
        return "3";

      default:
        return <HomeAdmin />;
    }
  }
  // async function fetchData() {
  //   let res = await fetchFamilyByEmail(getUserData().sub);
  //   setFamily(res)
  // }
  //   setFamilySelect

  return (
    <div>
      <header className="h-16 px-10 bg-blue-700 flex items-center justify-between">
        <div className="flex">
          <p className="mr-10 cursor-default">
            | ADMIN {getUserData().username} สุดเท่ |
          </p>
          <div className="flex items-center justify-between">
            {menuList.map((value, index) => (
              <p
                className="mr-5 text-sm font-light cursor-pointer hover:text-gray-400"
                onClick={() => {
                  setMenuIndex(index);
                }}
              >
                {value}
              </p>
            ))}
          </div>
        </div>
        <div className="inline-flex">
          {/* <p className="text-md font-light cursor-pointer hover:text-gray-400 text-sm mr-10" onClick={() => {selectFamily()}}>
            เลือก Family
          </p> */}
          <p className="text-md font-light cursor-pointer hover:text-gray-400 text-sm">
            ออกจากระบบ
          </p>
        </div>
      </header>
      <main>{getPage()}</main>
    </div>
  );
}

export default AdminPage;
