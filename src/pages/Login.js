import React, {useState} from "react";
import {Link, Redirect, useHistory} from "react-router-dom";
import {goLogin, isLogin} from "../modules/AuthService";

import "./Login.css";
function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isBlack, setIsBlank] = useState(false);
  const [valid, setValid] = useState(true);
  // const [data, setData] = useState(null);

  const handleEmail = e => {
    setEmail(e.target.value);
  };
  const handlePassword = e => {
    setPassword(e.target.value);
  };

  // const handleSubmit = e => {
  //     if(!email||!password) {
  //         setIsBlank(true);
  //     } else {
  //         e.preventDefault();
  //         setAuth(loginWithEmail(email,password))
  //         // loginWithEmail(email,password);
  //     }
  // }
  function handleSubmit(e) {


    if (!email || !password) {
      setIsBlank(true);
    } else {
      e.preventDefault();
      goLogin(email, password);
      // let login = goLogin(email, password);
      // if(login) {
        
      // }
      //    loginWithEmail(email,password)
      // loginWithEmail(email,password);
    }
  }

  // const loginWithEmail = (email,password) => {
  //    auth.signInWithEmailAndPassword(email, password)
  //     .then((userCredential) => {
  //         // Signed in
  //         const user = userCredential.user;
  //         console.log(user);
  //     })
  //     .catch((error) => {
  //         const errorCode = error.code;
  //         const errorMessage = error.message;
  //         setValid(false)
  //     });
  // }

  function login() {
    goLogin(email, password);
    // if(isLogin()) {
    //   return <Redirect to="/admin" />
    // }
  }

  return (
    <div className="container text-left" id="login">
      <Link className="back_btn" to="/" data-aos="fade-right">
        ย้อนกลับ
      </Link>
      <div className="login_wrapper">
        <div className="loginBox" data-aos="zoom-in">
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
            {isBlack ? <div>กรุณากรอกข้อมูลให้ครบถ้วน</div> : ""}
            <button className="login_btn" onClick={handleSubmit}>
              เข้าสู่ระบบ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
