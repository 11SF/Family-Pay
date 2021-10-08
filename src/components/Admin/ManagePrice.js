import React, {useState} from "react";
import {addPriceAPI} from "../../modules/AdminService";
import Swal from "sweetalert2";

function ManagePrice({familyData}) {
  const [prices, setPrices] = useState(familyData.prices);
  const [addPrice, setAddPrice] = useState(false);
  const [price, setPrice] = useState("");
  const [month, setMonth] = useState("");
  const [img_src, setImg_src] = useState("");

  const save = () => {
    addPriceAPI({
      price,
      month,
      img_src,
      familyID: familyData._id,
    }).then(res => {
      setPrices([...prices, {price, month, img_src}]);
      setAddPrice(false)
      Swal.fire(res.msg);
      //   .then(() => window.location.reload());
    });
  };

  const listPanel = data => (
    <div className="w-full p-2 border-b-2 border-black flex flex-wrap justify-between items-center">
      <p className="text-black text-4xl font-normal">{data.month} เดือน</p>
      <h1>ราคา : {data.price} บาท</h1>
      <a className="text-blue-500" href={data.img_src}>
        ดูรูปภาพ Promp Pay
      </a>
      <button>แก้ไข</button>
    </div>
  );
  const addPriceView = () => (
    <div className="bg-gray-200 w-1/2 h-auto mx-auto mt-3 rounded-md p-4">
      <p className="text-black text-xs text-left mb-1">จำนวนเดือน</p>
      <input
        type="number"
        className="w-full h-10 rounded-md p-2"
        onChange={e => setMonth(e.target.value)}
      />
      <p className="text-black text-xs text-left mb-1 mt-5">จำนวนเงิน</p>
      <input
        type="number"
        className="w-full h-10 rounded-md p-2"
        onChange={e => setPrice(e.target.value)}
      />
      <p className="text-black text-xs text-left mb-1 mt-5">imqge url</p>
      <input
        className="w-full h-10 rounded-md p-2"
        onChange={e => setImg_src(e.target.value)}
      />
      <div className="flex justify-end mt-3">
        <button
          className="px-5 py-3 rounded-md bg-red-600 text-white"
          onClick={() => setAddPrice(false)}
        >
          ยกเลิก
        </button>
        <button
          className="px-5 py-3 ml-3 rounded-md bg-green-600 text-white"
          onClick={() => save()}
        >
          ยืนยัน
        </button>
      </div>
    </div>
  );
  return (
    <div className="container flex flex-col">
      <div className="w-full">
        <p className="text-black text-5xl py-10">ข้อมูลราคา</p>
      </div>
      {!addPrice ? (
        <div className="w-1/2 flex justify-end mx-auto">
          <button onClick={() => setAddPrice(true)}>เพิ่ม</button>
        </div>
      ) : null}
      {!addPrice ? (
        <div className="bg-gray-200 w-1/2 h-auto mx-auto mt-3 rounded-md p-4">
          {prices.length !== 0 ? (
            prices.map(data => listPanel(data))
          ) : (
            <h1>ไม่มีข้อมูล</h1>
          )}
        </div>
      ) : (
        addPriceView()
      )}
    </div>
  );
}

export default ManagePrice;
