import React, {useState, useEffect} from "react";
import {fetchFamily} from "../../modules/AdminService";

import "./PaymentYoutube.css";

export default function PaymentYoutube({prices, ppNumber}) {
  const [monthSelect, setMonthSelect] = useState("");
  const [ppNumberMsg, setPPNumber] = useState("");
  const [price, setPrices] = useState([]);
  const [indexSelected, setIndexSelected] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setPrices(prices);
  }, []);
  useEffect(() => {
    if (price.length !== 0) {
      setMonthSelect(price[0].price);
      setPPNumber("หมายเลขพร้อมเพย์ : " + ppNumber);
      setLoading(false);
    }
  }, [price]);
  if (loading) {
    return <h1>Loading</h1>;
  }
  return (
    <div>
      <div className="payment_area">
        <div className="payment_box">
          <div className="payment_group">
            <img
              className="pp_qr"
              src={price[indexSelected].img_src}
              alt="pp_qr_35"
            />
          </div>
          <div className="payment_group">
            <div className="wrap">
              <div className="payment_header">
                {/* <p className="header">
                  ราคา {price[indexSelected].price}฿ /เดือน
                </p> */}
                <p className="detail">เลือกจำนวนเดือนที่ต้องการจ่าย</p>
              </div>
              <div className="payment_btn">
                {price.map((value, index) => (
                  <button
                    className="month_btn"
                    id={indexSelected === index ? "active" : ""}
                    onClick={() => setIndexSelected(index)}
                  >
                    {value.month} เดือน
                  </button>
                ))}
                <p className="price">{price[indexSelected].price}฿</p>
              </div>
              <div className="pp_number">
                <p>{ppNumberMsg}</p>
                <button
                  className="month_btn"
                  id="copy"
                  onClick={() => {
                    navigator.clipboard.writeText(ppNumber);
                    setPPNumber("คัดลอกหมายเลขเรียบร้อย");
                  }}
                >
                  คัดลอก
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
