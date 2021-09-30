import React, {useState} from 'react'

import './Payment.css'
// import pp_35 from '../../asset/pp_35.jpeg';
// import pp_70 from '../../asset/pp_70.jpeg';
// import pp_105 from '../../asset/pp_105.jpeg';
// import pp_210 from '../../asset/pp_210.jpeg';
// import pp_420 from '../../asset/pp_420.jpeg';

export default function Payment() {
    const [monthSelect, setMonthSelect] = useState('35');
    const [ppNumber, setPPNumber] = useState('พร้อมเพย์ : 0940932105')

    function selectFunc(qr_name) {
        setMonthSelect(qr_name);
        getQR()
      }
    
      function getQR() {
        switch(monthSelect) {
          // case "35" : return  <img className="pp_qr" src={pp_35}  alt="pp_qr_35"/>
          // case "70" : return  <img className="pp_qr" src={pp_70}  alt="pp_qr_70"/>
          // case "105" : return  <img className="pp_qr" src={pp_105}  alt="pp_qr_105"/>
          // case "210" : return  <img className="pp_qr" src={pp_210}  alt="pp_qr_210"/>
          // case "420" : return  <img className="pp_qr" src={pp_420}  alt="pp_qr_420"/>
          default:
            return 'err';
        }
      }

    return (
        <div>
            <div className="payment_area">
          <div className="payment_box">
            <div className="payment_group">
             {getQR()}
            </div>
            <div className="payment_group">
              <div className="wrap">
                <div className="payment_header">
                  <p className="header">ราคา 35฿ /เดือน</p>
                  <p className="detail">เลือกจำนวนเดือนที่ต้องการจ่าย</p>
                </div>
                <div className="payment_btn">
                  {/* <button className="month_btn" id={monthSelect === '35' ? 'active' : ''} onClick={()=> (selectFunc('35'))}>1 เดือน</button>
                  <button className="month_btn" id={monthSelect === '70' ? 'active' : ''} onClick={()=>(selectFunc('70'))}>2 เดือน</button>
                  <button className="month_btn" id={monthSelect === '105' ? 'active' : ''} onClick={()=>(selectFunc('105'))}>3 เดือน</button>
                  <button className="month_btn" id={monthSelect === '210' ? 'active' : ''} onClick={()=>(selectFunc('210'))}>6 เดือน</button>
                  <button className="month_btn" id={monthSelect === '420' ? 'active' : ''} onClick={()=>(selectFunc('420'))}>12 เดือน</button> */}
                  <p className="price">{monthSelect}฿</p>
                </div>
                <div className="pp_number">
                  <p>{ppNumber}</p>  
                  <button className="month_btn" id="copy" onClick={()=>{navigator.clipboard.writeText('0940932105'); setPPNumber("คัดลอกหมายเลขเรียบร้อย")}}>คัดลอก</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
    )
}
