import React, { useState, useEffect } from "react";

import { Link, useLocation } from "react-router-dom";
import { getUserData, logout } from "../../modules/AuthService";

export default function Navbar(token) {
  const menuList = [
    {
      text: "หน้าแรก",
      path: "home",
    },
    {
      text: "เพิ่มสมาชิก",
      path: "member",
    },
    {
      text: "ข้อมูลครอบครัว",
      path: "detail",
    },
    {
      text: "ข้อมูลราคา",
      path: "prices",
    },
    {
      text: "ประวัติการทำรายการ",
      path: "transaction",
    },
    {
      text: "สรุปข้อมูล",
      path: "info",
    },
  ];
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false);

  const navbarNormal = () => (
    <>
      <div className="flex">
        <p className="mr-10 cursor-default">
          | ADMIN {getUserData().username} สุดเท่ |
        </p>
        <div className="flex items-center justify-between">
          {menuList.map((value, index) => (
            <Link
              className="mx-3"
              to={`/admin/${token.token}/${value.path}`}
              key={index}
            >
              <p className="text-sm font-light cursor-pointer hover:text-gray-400">
                {value.text}
              </p>
              {value.path === location.pathname.split("/")[3] ? (
                <div className="w-full h-1 bg-yellow-500"></div>
              ) : null}
            </Link>
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
    </>
  );

  const smallNavbar = () => (
    <>
      <div className="w-full flex justify-between">
        <p className="cursor-default">
          | ADMIN {getUserData().username} สุดเท่ |
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-9 w-9 text-white hover:text-yellow-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          onClick={() => {
            setOpenMenu(!openMenu);
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </div>
      {openMenu ? (
        <div className="flex-block">
          {menuList.map((item, index) => (
            <div key={index}>{item.text}</div>
          ))}
        </div>
      ) : null}
    </>
  );
  return (
    <header className="h-16 w-full px-10 bg-indigo-900 flex items-center justify-between fixed">
      {navbarNormal()}
    </header>
  );
}
