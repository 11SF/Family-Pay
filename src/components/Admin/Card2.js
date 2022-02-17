import React, {useState} from "react";
import Swal from "sweetalert2";
import {editMember, setMonthAPI} from "../../modules/AdminService";

function Card2({user, familyID, familyData}) {
  const [month, setMonth] = useState(0);
  const [name, setName] = useState(user.name);
  const [img_src, setImg_src] = useState(user.img_src);
  const [expireDate, setExpireDate] = useState(user.expireDate);
  const [tempExpireDate] = useState(user.expireDate);
  const [edit, setEdit] = useState(false);
  const [prices] = useState(familyData.prices);
  const [priceIndexSelect, setPriceIndexSelect] = useState(99);
  const [isCustomEdit, setCustomEdit] = useState(false);
  const setData = async () => {
    return await setMonthAPI({
      id: user._id,
      lastDate: getNowDate(),
      expireDate,
      familyID,
    });
  };
  const getNowDate = () => {
    let date = new Date();
    return (
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      parseInt(date.getFullYear() + 543)
    );
  };

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
  const pushCountPrice = month => {
    setMonth(month)
    let a = tempExpireDate.split("/");
    let int = parseInt(a[1]);
    let year = parseInt(a[2])
    let answerTemp = ""
    for (let i = 0; i < month; i++) {
      int = int + 1;
      if (int > 12) {
        int = 1;
        year = parseInt(a[2]) + 1;
        answerTemp = `${familyData.dueDate}/${int}/${year}`
      }
      answerTemp = `${familyData.dueDate}/${int}/${year}`
    }
    setExpireDate(answerTemp)
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
        Swal.fire("ดำเนินการเรียบร้อย").then(res => window.location.reload());
      } else {
        Swal.fire("เกิดข้อผิดพลาด").then(res => window.location.reload());
      }
    });
  };
  const confirm = isCustom => {
    if (isCustom) {
      Swal.fire({
        title: `เพิ่มเดือน ${month} เดือน ให้กับ ${user.name} ใช่หรือไม่`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Save",
      }).then(result => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          setData().then(res => {
            Swal.fire("ดำเนินการเรียบร้อย").then(() => {
              window.location.reload();
              setMonth(0);
            });
          });
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
        // setMonth(0);
      });
    } else {
      Swal.fire({
        title: `เพิ่มเดือน ${month} เดือน จำนวนเงิน ${prices[priceIndexSelect].price} บาท ให้กับ ${user.name} ใช่หรือไม่`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Save",
      }).then(result => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          setData().then(res => {
            Swal.fire("ดำเนินการเรียบร้อย").then(() => {
              window.location.reload();
              setMonth(0);
              setPriceIndexSelect(99);
            });
          });
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
        // setMonth(0);
      });
    }
  };

  const normalCard = () => (
    <>
      <p className="text-black text-3xl">{user.name}</p>
      <button
        className="text-xs m-auto flex text-gray-600"
        onClick={() => setEdit(true)}
      >
        แก้ไขข้อมูลส่วนตัว
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 pl-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
          <path
            fillRule="evenodd"
            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
            clipRule="evenodd"
          />
        </svg>
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
      <p className="text-black text-sm text-left">ราคาจ่าย(บาท)</p>
      <div className="mt-3 mb-8">
        <div className="grid grid-cols-3 gap-4">
          {prices.map((price, index) => (
            <button
              className={
                "text-sm border-2 border-opacity-75 rounded-md py-2 px-6 hover:bg-gray-200 " +
                (priceIndexSelect === index
                  ? "border-green-500"
                  : "border-light-blue-500")
              }
              onClick={() => {
                setPriceIndexSelect(index);
                // setMonth(price.month);
                // setExpireDate(tempExpireDate);
                pushCountPrice(price.month);
              }}
              key={price._id}
            >
              {price.price}
            </button>
          ))}
          <button
            className="text-sm rounded-md text-white py-2 bg-green-500  hover:bg-green-600"
            onClick={() => confirm(false)}
          >
            ยืนยัน
          </button>
        </div>
        <button
          className="text-sm rounded-md text-white w-full my-3 py-2 px-4 bg-blue-500 hover:bg-blue-600"
          onClick={() => setCustomEdit(true)}
        >
          กำหนดเอง
        </button>
      </div>
    </>
  );

  const customCard = () => (
    <>
      <p className="text-black text-3xl">{user.name}</p>
      <button
        className="text-xs m-auto flex text-gray-600"
        onClick={() => setEdit(true)}
      >
        แก้ไขข้อมูลส่วนตัว
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 pl-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
          <path
            fillRule="evenodd"
            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
            clipRule="evenodd"
          />
        </svg>
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
          onClick={() => confirm(true)}
        >
          ยืนยัน
        </button>
      </div>
      <button
        className="text-sm rounded-md text-white w-full my-3 py-2 px-4 bg-blue-500 mt-16 hover:bg-blue-600"
        onClick={() => setCustomEdit(false)}
      >
        ปิด
      </button>
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
      <div className="p-3">
        {!edit ? (isCustomEdit ? customCard() : normalCard()) : editCard()}
      </div>
    </div>
  );
}

export default Card2;
