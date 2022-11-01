import React, { useState, useEffect } from "react";
import Card2 from "./Card2";
import { sendNotification } from "../../modules/AdminService";

function check2hour(time) {
  const date = new Date(time.date);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diff / 1000 / 60);
  if (diffMinutes > 120) {
    return true;
  }
  return false;
}

function HomeAdmin({ familyData }) {
  const [membersData] = useState(familyData.members);
  const [openSendMsg, setOpenSendMsg] = useState(
    // check2hour(sessionStorage.getItem("lastSendMessage"))
    true
  );
  const handleSendMsg = () => {
    sendNotification({ familyID: familyData.token });
    setOpenSendMsg(false);
  };

  useEffect(() => {}, []);

  return (
    <div className="container mt-12 mx-auto">
      <div className="w-full">
        <p className="text-black text-5xl py-10">เหล่าสมาชิกทั้งหลาย</p>
      </div>
      <div className="w-full">
        {openSendMsg ? (
          <button
            className="text-sm rounded-md text-white py-2 px-5 bg-green-500  hover:bg-green-600"
            onClick={() => handleSendMsg()}
            // onClick={() => checkExpireDate("2022-07-05T17:06:43.550Z")}
          >
            ส่งข้อความเรียกเก็บเงิน
          </button>
        ) : (
          <p className="text-sm rounded-md text-white py-2 px-5 bg-green-500">
            ส่งข้อความเรียบร้อย, สามารถส่งข้อความซ้ำอีกครั้งในภายหลัง
          </p>
        )}
      </div>

      {/* <div className="py-20 flex flex-wrap justify-around flex-row gap-x-10 gap-y-32"> */}
      <div className="w-full py-20 grid grid-cols-1 gap-20 md:grid-cols-2 xl:grid-cols-3 place-items-center">
        {membersData.map((member) => (
          <Card2
            user={member}
            familyID={familyData._id}
            familyData={familyData}
            key={member._id}
          ></Card2>
        ))}
      </div>
    </div>
  );
}

export default HomeAdmin;
