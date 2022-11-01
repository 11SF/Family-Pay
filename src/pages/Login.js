import React, { useState } from "react";
import { Link } from "react-router-dom";
import { goLogin } from "../modules/AuthService";
import loading_admin from "../assets/loading_admin.svg";
import "./Login.css";
import { VERSION } from "../WebVersion";

function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  // const [data, setData] = useState(null);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setMsg("กรุณากรอกข้อมูลให้ครบถ้วน");
    } else {
      setLoading(true);

      goLogin(email, password).then((res) => {
        setLoading(false);
        // //console.log(res);
        if (res) {
          window.location.reload();
        } else {
          setMsg("อีเมลหรือรหัสผ่านไม่ถูกต้อง!");
        }
      });
    }
  }

  return (
    <div className="container text-left" id="login">
      <Link className="back_btn" to="/" data-aos="fade-right">
        ย้อนกลับ
      </Link>
      <div className="login_wrapper">
        <div className="loginBox" data-aos="zoom-in">
          {isLoading ? (
            <img
              className="mx-auto my-10"
              src={loading_admin}
              alt="loading_svg"
            ></img>
          ) : (
            <>
              <div className="logo" id="login_logo">
                Admin Area!!!
              </div>
              <p className="detail">สำหรับหัวหน้าครอบครัว 🌟</p>
              <form onSubmit={handleSubmit}>
                <div className="input_area">
                  <input
                    className="login_input"
                    placeholder="E-mail"
                    type="email"
                    onChange={handleEmail}
                  ></input>
                  <input
                    className="login_input"
                    placeholder="Password"
                    type="password"
                    onChange={handlePassword}
                  ></input>
                </div>
                {msg ? (
                  <div className="mx-auto text-center text-red-500">{msg}</div>
                ) : (
                  ""
                )}
                {/* <Router> */}
                <button className="login_btn" onClick={handleSubmit}>
                  เข้าสู่ระบบ
                </button>
                {/* </Router> */}
              </form>
            </>
          )}
        </div>
        <div className="absolute right-0 bottom-0 p-5 text-right">
          <p className="text-xs font-light">WEB Version: {VERSION["Web-Version"]} | API Version: 2.0.0 | LOG Version: 1.0.0</p>
          {/* <p className="text-xs font-light">API Version: 2.0.0</p>
          <p className="text-xs font-light">LOG Version: 1.0.0</p> */}
        </div>
      </div>
    </div>
  );
}

export default Login;
