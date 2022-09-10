import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  editMember,
  setMonthAPI,
  pushConfirmPayment,
  addTransaction,
} from "../../modules/AdminService";
import {
  CONVERT_STR_TO_DATE_TYPE,
  GET_DATE_FORMAT,
} from "../../modules/ConvertFunc";

function Card2({ user, familyID, familyData }) {
  const [month, setMonth] = useState(0);
  const [name, setName] = useState(user.name);
  const [img_src, setImg_src] = useState(user.img_src);
  const [expireDate, setExpireDate] = useState(user.expireDate);
  const [tempExpireDate] = useState(user.expireDate);
  const [edit, setEdit] = useState(false);
  const [prices] = useState(familyData.prices);
  const [priceIndexSelect, setPriceIndexSelect] = useState(99);
  const [status, setStatus] = useState(1);

  useEffect(() => {
    let currentDate = new Date();
    let expireD = new Date(expireDate);
    // let month = date.getMonth() + 1;
    // let year = date.getFullYear() + 543;
    // let temp = GET_DATE_FORMAT(expireDate, "noTime").split("/");
    // if (temp[1] > month || year < temp[2]) {
    //   setStatus("1");
    // } else if (month.toString() === temp[1]) {
    //   setStatus("2");
    // } else {
    //   setStatus("3");
    // }
    if (
      (expireD.getMonth() > currentDate.getMonth() &&
        expireD.getFullYear() === currentDate.getFullYear()) ||
      expireD.getFullYear() > currentDate.getFullYear()
    ) {
      setStatus("1");
    } else if (
      expireD.getMonth() === currentDate.getMonth() &&
      expireD.getFullYear() === currentDate.getFullYear()
    ) {
      setStatus("2");
    } else {
      setStatus("3");
    }
  }, [expireDate]);

  const setData = async () => {
    return await setMonthAPI({
      id: user._id,
      lastDate: new Date(),
      expireDate,
      familyID,
    });
  };

  const getNewDate = (strDate, numberOfMonth) => {
    strDate = CONVERT_STR_TO_DATE_TYPE(strDate);
    setMonth(numberOfMonth);
    let newDate = new Date(
      strDate.setMonth(strDate.getMonth() + parseInt(numberOfMonth))
    );
    newDate = new Date(strDate.setDate(familyData.dueDate));
    setExpireDate(newDate);
  };

  const getDateOverdue = (oldDate) => {
    oldDate = CONVERT_STR_TO_DATE_TYPE(oldDate);
    let currentDate = new Date();

    let diffTime = currentDate - oldDate;
    let diffDays = Math.ceil(diffTime / (1000 * 3600 * 24)) - 1;

    if (diffDays > 0) {
      return diffDays;
    } else {
      return 0;
    }
  };

  const status_func = (status) => {
    switch (status) {
      case "1":
        return {
          class: "w-full h-1/4 flex justify-center bg-green-500 rounded-t-lg",
          status: "ฟังเพลงยาว ๆ ไปครับ",
        };
      case "2":
        return {
          class: "w-full h-1/4 flex justify-center bg-yellow-500 rounded-t-lg",
          status: "ถึงเวลาจ่ายแล้วครับผมม",
        };
      case "3":
        return {
          class: "w-full h-1/4 flex justify-center bg-red-500 rounded-t-lg",
          status: "ระวังจะได้ฟัง JOOX",
        };
      default:
        return "err";
    }
  };

  const pushNotification = (userId) => {
    console.log("userId");
    console.log(userId);
    console.log(status);
  };

  const save = () => {
    editMember({
      id: user._id,
      name,
      lastDate: user.lastDate,
      expireDate,
      familyID,
      img_src,
    }).then(async (res) => {
      if (res.status) {
        // familyName, memberName, price, month, nextDate, alertId
        Swal.fire("ดำเนินการเรียบร้อย").then((res) => {
          window.location.reload();
        });
      } else {
        Swal.fire("เกิดข้อผิดพลาด").then((res) => window.location.reload());
      }
    });
  };

  const confirm = (isCustom) => {
    if (isCustom) {
      Swal.fire({
        title: `เพิ่มเดือน ${month} เดือน ให้กับ ${user.name} ใช่หรือไม่`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Save",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          setData().then((res) => {
            Swal.fire("ดำเนินการเรียบร้อย").then(() => {
              // //console.log({
              //   familyName: familyData.familyName,
              //   memberName: user.name,
              //   price: prices[priceIndexSelect].price,
              //   month: prices[priceIndexSelect].month,
              //   nextDate: expireDate,
              //   alertId: user._id,
              // });
              pushConfirmPayment({
                familyName: familyData.familyName,
                memberName: user.name,
                price: prices[priceIndexSelect].price,
                month: prices[priceIndexSelect].month,
                nextDate: expireDate,
                alertId: user._id,
              }).then(() => {
                addTransaction({
                  member_id: user._id,
                  name: user.name,
                  family_id: familyData.token,
                  family_name: familyData.familyName,
                  price: prices[priceIndexSelect].price,
                  month: prices[priceIndexSelect].month,
                  date_overdue: getDateOverdue(tempExpireDate),
                  old_ecpire_date: CONVERT_STR_TO_DATE_TYPE(tempExpireDate),
                  new_expire_date: expireDate,
                }).then(() => {
                  window.location.reload();
                  setMonth(0);
                });
              });
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
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          setData().then((res) => {
            Swal.fire("ดำเนินการเรียบร้อย").then(() => {
              pushConfirmPayment({
                familyName: familyData.familyName,
                memberName: user.name,
                price: prices[priceIndexSelect].price,
                month: prices[priceIndexSelect].month,
                nextDate: expireDate,
                alertId: user._id,
              }).then(() => {
                addTransaction({
                  member_id: user._id,
                  name: user.name,
                  family_id: familyData.token,
                  family_name: familyData.familyName,
                  price: prices[priceIndexSelect].price,
                  month: prices[priceIndexSelect].month,
                  date_overdue: getDateOverdue(tempExpireDate),
                  old_expire_date: CONVERT_STR_TO_DATE_TYPE(tempExpireDate),
                  new_expire_date: expireDate,
                }).then(() => {
                  window.location.reload();
                  setMonth(0);
                  setPriceIndexSelect(99);
                });
              });
            });
          });
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
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
            style={{ fontSize: "18px" }}
          >
            จ่ายล่าสุด :
          </p>
          <p
            className="text-black font-light text-left"
            style={{ fontSize: "18px" }}
          >
            {GET_DATE_FORMAT(user.lastDate, "noTime")}
          </p>
        </div>
        <div className="flex justify-between">
          <p
            className="text-black font-light text-left"
            style={{ fontSize: "18px" }}
          >
            หมดอายุ :
          </p>
          <p
            className="text-black font-light text-left"
            style={{ fontSize: "18px" }}
          >
            {GET_DATE_FORMAT(expireDate, "noTime")}
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
                getNewDate(tempExpireDate, price.month, false);
              }}
              key={price._id}
            >
              {price.price}
            </button>
          ))}
          <button
            className="text-sm rounded-md text-white py-2 bg-green-500  hover:bg-green-600"
            onClick={() => (priceIndexSelect !== 99 ? confirm(false) : null)}
          >
            ยืนยัน
          </button>
        </div>
        <button
          className={
            status !== "1"
              ? "text-sm rounded-md text-white w-full my-3 py-2 px-4 bg-blue-500 hover:bg-blue-600"
              : "text-sm rounded-md text-white w-full my-3 py-2 px-4 bg-gray-500 pointer-events-none"
          }
          onClick={() => pushNotification(user._id)}
          disabled={status === "1" ? "true" : ""}
        >
          ส่งข้อความเรียกเก็บเงิน
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
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <p className="text-black text-xs text-left mb-1">imqge url</p>
          <input
            className="w-full h-10 rounded-md p-2"
            defaultValue={img_src}
            onChange={(e) => setImg_src(e.target.value)}
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
      <div className={status_func(status).class}>
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
        {!edit ? normalCard() : editCard()}
        {/* {!edit ? (isCustomEdit ? customCard() : normalCard()) : editCard()} */}
      </div>
    </div>
  );
}

export default Card2;
