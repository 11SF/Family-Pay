import React, {useState} from "react";
import Swal from "sweetalert2";
import {editMember, setMonthAPI} from "../../modules/AdminService";

function Card2({user, familyID, familyData}) {
  const [month, setMonth] = useState(0);
  const [name, setName] = useState(user.name);
  const [img_src, setImg_src] = useState(user.img_src);
  const [expireDate, setExpireDate] = useState(user.expireDate);
  const [edit, setEdit] = useState(false);
  const setData = async () => {
    return await setMonthAPI({
      id: user._id,
      lastDate: getNowDate(),
      expireDate,
      familyID,
    });
  };
  const getNowDate = () => {
    let date = new Date()
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + parseInt(date.getFullYear() + 543)
  }

  const pushCount = () => {
    setMonth(month + 1);
    let a = expireDate.split("/");
    let int = parseInt(a[1]) + 1;
    if (int > 12) {
      int = 1;
      let year = parseInt(a[2]) + 1;
      setExpireDate(`${familyData.dueDate}/${int}/${year}`);
      return;
    }
    setExpireDate(`${familyData.dueDate}/${int}/${a[2]}`);
  };
  const deCount = () => {
    setMonth(month - 1);
    let a = expireDate.split("/");
    let int = parseInt(a[1]) - 1;
    if (int === 0) {
      int = 12;
      let year = parseInt(a[2]) - 1;
      setExpireDate(`${familyData.dueDate}/${int}/${year}`);
      return;
    }
    setExpireDate(`${familyData.dueDate}/${int}/${a[2]}`);
  };
  const save = () => {
    editMember({
      id: user._id,
      name,
      lastDate: user.lastDate,
      expireDate,
      familyID,
      img_src,
    }).then(res => {
      if (res.status) {
        Swal.fire(res.message).then(res => window.location.reload());
      } else {
        Swal.fire("เกิดข้อผิดพลาด").then(res => window.location.reload());
      }
    });
  };
  const confirm = () => {
    Swal.fire({
      title: `เพิ่ม ${month} เดือนให้กับ ${user.name}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Save",
    }).then(result => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        setData().then(res => {
          Swal.fire(res.message).then(()=> {
            window.location.reload()
            setMonth(0);
          })
        });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
      // setMonth(0);
    });
  };

  const normalCard = () => (
    <>
      <p className="text-black text-3xl">{user.name}</p>
      <button className="text-xs" onClick={() => setEdit(true)}>
        แก้ไขข้อมูลส่วนตัว
      </button>
      <div className="w-2/3 mx-auto my-5">
        <div className="flex justify-between">
          <p
            className="text-black font-light text-left"
            style={{fontSize: "18px"}}
          >
            จ่ายล่าสุด :
          </p>
          <p
            className="text-black font-light text-left"
            style={{fontSize: "18px"}}
          >
            {user.lastDate}
          </p>
        </div>
        <div className="flex justify-between">
          <p
            className="text-black font-light text-left"
            style={{fontSize: "18px"}}
          >
            หมดอายุ :
          </p>
          <p
            className="text-black font-light text-left"
            style={{fontSize: "18px"}}
          >
            {expireDate}
          </p>
        </div>
      </div>
      <p className="text-black text-sm text-left">เพิ่มเดือน</p>
      <div className="flex justify-around items-center mt-3">
        <div className="flex w-4/6">
          <button
            className="p-2 rounded-full w-10 h-10 text-black hover:bg-red-50"
            onClick={() => (month > 0 ? deCount() : null)}
          >
            -
          </button>
          <p className="text-black text-sm bg-white py-2 px-4 rounded-md mx-5 w-12">
            {month}
          </p>
          <button
            className="bg-blue-600 p-2 rounded-full w-10 h-10 text-white hover:bg-blue-800"
            onClick={() => pushCount()}
          >
            +
          </button>
        </div>
        <button
          className="text-sm w-2/6 rounded-md text-white py-2 bg-green-500 hover:bg-green-600"
          onClick={() => confirm()}
        >
          ยืนยัน
        </button>
      </div>
    </>
  );

  const editCard = () => (
    <>
      <div>
        <div className="mb-4">
          <p className="text-black text-xs text-left mb-1">ชื่อ</p>
          <input
            className="w-full h-10 rounded-md p-2"
            defaultValue={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <p className="text-black text-xs text-left mb-1">imqge url</p>
          <input
            className="w-full h-10 rounded-md p-2"
            defaultValue={img_src}
            onChange={e => setImg_src(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full h-auto">
        <button
          className="w-3/12 h-10 bg-red-500 text-white rounded-lg bottom-0"
          onClick={() => setEdit(false)}
        >
          ยกเลิก
        </button>
        <div className="w-1/12 inline-block" />
        <button
          className="w-8/12 h-10 bg-green-500 text-white rounded-lg bottom-0"
          onClick={() => save()}
        >
          บันทึก
        </button>
      </div>
    </>
  );

  return (
    <div className="h-auto w-80 bg-gray-50 rounded-lg shadow-xl ">
      <div className="w-full h-1/4 flex justify-center bg-red-500 rounded-t-lg">
        <div
          className="rounded-full w-32 h-32 -mt-12 shadow-sm"
          style={{
            backgroundImage: `url('${user.img_src}')`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
      </div>
      <div className="p-3">{!edit ? normalCard() : editCard()}</div>
    </div>
  );
}

export default Card2;
