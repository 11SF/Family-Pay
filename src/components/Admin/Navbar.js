import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { getUserData, logout } from "../../modules/AuthService";

export default function Navbar(token) {
  const menuList = [
    {
        "text": "หน้าแรก",
        "path": "home"
    },
    {
        "text": "เพิ่มสมาชิก",
        "path": "member"
    },
    {
        "text": "ข้อมูลครอบครัว",
        "path": "detail"
    },
    {
        "text": "ข้อมูลราคา",
        "path": "prices"
    },
    {
        "text": "ประวัติการทำรายการ",
        "path": "transaction"
    },
    {
        "text": "สรุปข้อมูล",
        "path": "info"
    },
  ];
  const [menuIndex, setMenuIndex] = useState(0);
  return (
    <header className="h-16 w-full px-10 bg-indigo-900 flex items-center justify-between fixed">
      <div className="flex">
        <p className="mr-10 cursor-default">
          | ADMIN {getUserData().username} สุดเท่ |
        </p>
        <div className="flex items-center justify-between">
          {menuList.map((value, index) => (
            <Link to={`/admin/${token.token}/${value.path}`}>
              <p
                className="mr-5 text-sm font-light cursor-pointer hover:text-gray-400"
                onClick={() => {
                  setMenuIndex(index);
                }}
                key={index}
              >
                {value.text}
              </p>
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
    </header>
  );
}
