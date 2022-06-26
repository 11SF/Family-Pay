import React, { useState, useEffect } from "react";
import HomeAdmin from "../components/Admin/HomeAdmin";
import { getUserData, logout } from "../modules/AuthService";
import { fetchFamilyByEmail, getTokenByEmail } from "../modules/AdminService";
import { useParams } from "react-router";
import FamilyDetail from "../components/Admin/FamilyDetail";
import ManageMembers from "../components/Admin/ManageMembers";
import ManagePrice from "../components/Admin/ManagePrice";
import { Link } from "react-router-dom";
import TransactionTable from "../components/Admin/TransactionTable";

const menuList = [
  "หน้าแรก",
  "เพิ่มสมาชิก",
  "ข้อมูลครอบครัว",
  "ข้อมูลราคา",
  "ประวัติการทำรายการ",
  "สรุปข้อมูล",
];

function AdminPage() {
  const [menuIndex, setMenuIndex] = useState(0);
  const [familyData, setFamilyData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const { token } = useParams();

  const fetchData = async () => {
    let result = await getTokenByEmail(token);
    if (result.status) {
      return setFamilyData(result.data);
    }
    setMsg(result.msg);
    setFamilyData(null);
  };
  useEffect(() => {
    // setLoading(true);
    fetchData();
  }, []);

  useEffect(() => {
    if (familyData != null || msg !== "") {
      setLoading(false);
    }
  }, [familyData, msg]);

  function getPage() {
    switch (menuIndex) {
      case 1:
        return <ManageMembers familyID={familyData._id} />;
      case 2:
        return (
          <FamilyDetail
            familyName={familyData.familyName}
            token={familyData.token}
          />
        );
      case 3:
        return <ManagePrice familyData={familyData} />;
      case 4:
        return <TransactionTable familyID={familyData.token} />;
      case 5:
        return "สรุปข้อมูล";

      default:
        return <HomeAdmin familyData={familyData} />;
    }
  }
  // async function fetchData() {
  //   let res = await fetchFamilyByEmail(getUserData().sub);
  //   setFamily(res)
  // }
  //   setFamilySelect

  const logout = () => {
    sessionStorage.removeItem("userToken");
    window.location.reload();
  };
  if (isLoading) {
    return <p className="text-black"> กำลังโหลด..... </p>;
  }
  if (msg !== "") {
    return (
      <p className="text-black bottom-1/2 w-screen text-center absolute">
        {" "}
        อย่าทำแบบนั้น 😕{" "}
      </p>
    );
  }

  return (
    <div>
      <header className="h-16 w-full px-10 bg-indigo-900 flex items-center justify-between fixed">
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
                key={index}
              >
                {value}
              </p>
            ))}
          </div>
        </div>
        <div className="inline-flex">
          <Link to="/admin/selectfamily">
            <p className="text-md font-light cursor-pointer hover:text-gray-400 text-sm mr-10">
              เลือก Family
            </p>{" "}
          </Link>
          <p
            className="text-md font-light cursor-pointer hover:text-gray-400 text-sm"
            onClick={() => logout()}
          >
            ออกจากระบบ
          </p>
        </div>
      </header>
      <main className="pt-20">{isLoading ? <h1>Loading</h1> : getPage()}</main>
      {/* <main>{getPage()}</main> */}
    </div>
  );
}

export default AdminPage;
