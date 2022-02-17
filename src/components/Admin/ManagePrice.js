import React, {useState} from "react";
import {
  addPriceAPI,
  editPriceAPI,
  deletePriceAPI,
} from "../../modules/AdminService";
import Swal from "sweetalert2";

function ManagePrice({familyData}) {
  const [prices, setPrices] = useState(familyData.prices);
  const [addPrice, setAddPrice] = useState(false);
  const [price, setPrice] = useState("");
  const [month, setMonth] = useState("");
  const [img_src, setImg_src] = useState("");
  const [editPrice, setEditPrice] = useState(null);

  const save = () => {
    addPriceAPI({
      price,
      month,
      img_src,
      familyID: familyData._id,
    }).then(res => {
      setPrices([...prices, {price, month, img_src}]);
      setAddPrice(false);
      Swal.fire(res.msg);
      //   .then(() => window.location.reload());
    });
  };

  const saveEdit = () => {
    editPriceAPI({
      price,
      month,
      img_src,
      familyID: familyData._id,
      id: prices[editPrice]._id,
    }).then(res => {
      setEditPrice(null);
      Swal.fire("ดำเนินการเรียบร้อย").then(() => window.location.reload());
    });
  };

  const deletePrice = () => {
    Swal.fire({
      title: `ต้องการลบราคา ${prices[editPrice].price} บาท ${prices[editPrice].month} เดือน ใช่หรือไม่`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Save",
    }).then(result => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        deletePriceAPI({
          familyID: familyData._id,
          id: prices[editPrice]._id,
        }).then(res => {
          setEditPrice(null);
          Swal.fire("ดำเนินการเรียบร้อย").then(() => window.location.reload());
        });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
      // setMonth(0);
    });
  };

  const listPanel = (data, index) => (
    <div
      className="w-full p-2 border-b-2 border-black flex flex-wrap justify-between items-center"
      key={index}
    >
      <p className="text-black text-4xl font-normal">{data.month} เดือน</p>
      <h1>ราคา : {data.price} บาท</h1>
      <a className="text-blue-500" href={data.img_src}>
        ดูรูปภาพ Promp Pay
      </a>
      <button
        onClick={() => {
          setEditPrice(index);
          setPrice(prices[index].price);
          setMonth(prices[index].month);
          setImg_src(prices[index].img_src);
          console.log(index);
        }}
      >
        แก้ไข
      </button>
    </div>
  );
  const editPriceView = () => (
    <div className="bg-gray-200 w-1/2 h-auto mx-auto mt-3 rounded-md p-4">
      <p className="text-black text-xs text-left mb-1">จำนวนเดือน</p>
      <input
        type="number"
        className="w-full h-10 rounded-md p-2"
        value={month}
        onChange={e => setMonth(e.target.value)}
      />
      <p className="text-black text-xs text-left mb-1 mt-5">จำนวนเงิน</p>
      <input
        type="number"
        className="w-full h-10 rounded-md p-2"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />
      <p className="text-black text-xs text-left mb-1 mt-5">image url</p>
      <input
        className="w-full h-10 rounded-md p-2"
        value={img_src}
        onChange={e => setImg_src(e.target.value)}
      />
      <div className="flex justify-between mt-3">
        <button
          className="px-5 py-3 rounded-md bg-red-600 text-white"
          onClick={() => deletePrice()}
        >
          ลบ
        </button>
        <div>
          <button
            className="px-5 py-3 rounded-md bg-gray-600 text-white"
            onClick={() => setEditPrice(null)}
          >
            ยกเลิก
          </button>
          <button
            className="px-5 py-3 ml-3 rounded-md bg-green-600 text-white"
            onClick={() => saveEdit()}
          >
            ยืนยัน
          </button>
        </div>
      </div>
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

  const priceArea = () => {
    if (addPrice) {
      return addPriceView();
    } else if (editPrice !== null) {
      return editPriceView();
    } else {
      return (
        <>
          <div className="w-1/2 flex justify-end mx-auto">
            <button onClick={() => setAddPrice(true)}>เพิ่ม</button>
          </div>
          <div className="bg-gray-200 w-1/2 h-auto mx-auto mt-3 rounded-md p-4">
            {prices.length !== 0 ? (
              prices.map((data, index) => listPanel(data, index))
            ) : (
              <h1>ไม่มีข้อมูล</h1>
            )}
          </div>
        </>
      );
    }
  };
  return (
    <div className="container flex flex-col">
      <div className="w-full">
        <p className="text-black text-5xl py-10">ข้อมูลราคา</p>
      </div>
      {priceArea()}
      {/* {!addPrice ? (
        <div className="w-1/2 flex justify-end mx-auto">
          <button onClick={() => setAddPrice(true)}>เพิ่ม</button>
        </div>
      ) : null}
      {!addPrice ? (
        <div className="bg-gray-200 w-1/2 h-auto mx-auto mt-3 rounded-md p-4">
          {prices.length !== 0 ? (
            prices.map((data, index) => listPanel(data, index))
          ) : (
            <h1>ไม่มีข้อมูล</h1>
          )}
        </div>
      ) : (
        addPriceView()
      )} */}
    </div>
  );
}

export default ManagePrice;
