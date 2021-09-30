import React, { useState, useEffect} from 'react';

import './Card.css';

export default function Card({ name,pic,lastDate,expireDate }) {

    const [status, setStatus] = useState('1');

    useEffect(()=>{
        let date  = new Date();
        let month = date.getMonth() + 1;
        let year = date.getFullYear() + 543;
        let temp  = expireDate.split("/");
        if (temp[1] > month || year < temp[2]) {
            setStatus('1');
        } else if (month.valueOf(temp[1])) {
            setStatus('2');
        } else {
            setStatus('3');
        }
    },[expireDate])

    const status_func = (status)=> {
        switch(status) {
            case "1" : return {"class" : "card_body_green", "status" : "ฟังเพลงยาว ๆ ไปครับ"};
            case "2" : return {"class" : "card_body_yellow", "status" : "ถึงเวลาจ่ายแล้วครับผมม"};
            case "3" : return {"class" : "card_body_red", "status" : "ระวังจะได้ฟัง JOOX"};
            default :
                return "err";
        }
    }
    return (
        <div className="card text-left" data-aos="zoom-in">
            <div className={status_func(status).class}>
                <div className="card_item">
                    <img className="avatar" src={pic} alt="pic" />
                    <div className="text_area">
                        <div className="group_1">
                            <p className="name">{name}</p>
                            <p className="info">สถานะ : {status_func(status).status}</p>
                        </div>
                        <div className="group_2">
                            <p className="info">จ่ายล่าสุด&nbsp;: {lastDate}</p>
                            <p className="info">หมดอายุ&nbsp;&nbsp;&nbsp;: {expireDate}</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
