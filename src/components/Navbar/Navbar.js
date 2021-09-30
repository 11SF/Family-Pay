import React, {useState} from 'react'
import { Link } from 'react-router-dom';

import './Navbar.css'

// import hamberger from '../../asset/hamburger_icon.svg'
// import top_wave from '../../asset/wave.svg';

export default function Navbar({familyName}) {
    const [toggle, setToggle] = useState(false);
    function dropMenu() {
        setToggle(!toggle);
    }
    return (
        <div className="header" data-aos="slide-down">
            <div className="item">
                <div className="header_wrap">
                    <p className="logo" id="nav_logo" >ถึงเวลาจ่ายค่า Spotify รึยังน้าาา</p>  
                    <p>{familyName}</p>
                    <svg onClick={()=> dropMenu()} xmlns="http://www.w3.org/2000/svg" className="hamberger h-10 w-10" fill="#f4f4f4" viewBox="0 0 24 24" stroke={toggle ? "#000000" : "#f4f4f4"}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    {/* <img className="hamberger" src={hamberger} alt="hamberger" onClick={()=> dropMenu()}></img> */}
                </div>
            </div> 
            <div className={toggle ? "dropMenu" : "dropMenu hidden"}>
                <ul>
                    <li className="menu_item"><Link to="/login">เข้าสู่ระบบ</Link></li>
                </ul>
            </div>
            <div className="top_wave"></div>
           {/* <img className="top_wave" src={top_wave} alt='top_wave' />   */}
        </div>
    )
}
