import React, {useState, useEffect} from "react";
import {addMemberAPI} from "../../modules/AdminService";
import Swal from "sweetalert2";
function ManageMembers({familyID}) {
  const [name, setName] = useState("");
  const [img_src, setImg_src] = useState("");
  const date = new Date();
  const draftDate = `${date.getDate()}/${date.getMonth()}/${
    date.getFullYear() + 543
  }`;

//   //console.log(draftDate);

  const handleLogIn = () => {
    addMemberAPI({
      name,
      lastDate: date,
      expireDate: date,
      img_src,
      familyID
    }).then(res => {
      if (res.status) {
        Swal.fire(res.msg).then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire(res.msg);
      }
    });
  };
  return (
    <div className="container mx-auto mt-12">
      <div className="w-full">
        <p className="text-black text-5xl py-10">เพิ่มสมาชิก</p>
      </div>
      <div className="w-1/2 bg-gray-200 mx-auto rounded-lg">
        <div className="bg-gray-200 w-2/3 h-auto mx-auto mt-3 rounded-md p-4">
          <p className="text-black text-xs text-left mb-1">ชื่อผู้ใช้</p>
          <input
            className="w-full h-10 rounded-md p-2"
            onChange={e => setName(e.target.value)}
          />
          <p className="text-black text-xs text-left mb-1 mt-5">Image URL</p>
          <input
            className="w-full h-10 rounded-md p-2"
            onChange={e => setImg_src(e.target.value)}
          />
          <div className="flex justify-center mt-3">
            {name && img_src ? (
              <button
                className="px-5 py-3 ml-3 rounded-md bg-green-600 text-white"
                onClick={() => handleLogIn()}
              >
                ยืนยัน
              </button>
            ) : <h1>กรุณากรอกข้อมูลให้ครบถ้วน</h1>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageMembers;
