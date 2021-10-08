import React, {useState} from "react";
import {register} from "../modules/AuthService";
import Swal from "sweetalert2";

function Register() {
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [isBlack, setIsBlank] = useState(false);
  const [valid, setValid] = useState(true);

  const handleEmail = e => {
    setEmail(e.target.value);
  };
  const handlePassword = e => {
    setPassword(e.target.value);
  };
  const handleUsername = e => {
    setUsername(e.target.value);
  };
  async function handleSubmit(e) {
    if (!email || !password || !username) {
      setIsBlank(true);
    } else {
      e.preventDefault();
      register({
        email,
        username,
        password,
      }).then(res => {
        if (res.status) {
            Swal.fire("สมัครสมาชิกสำเร็จ")
        //   window.location.reload();
        } else {
            Swal.fire(res.message)
        }
      });
    }
  }
  return (
    <div className="container text-left" id="login">
      <div className="login_wrapper">
        <div className="loginBox" data-aos="zoom-in">
          <div className="logo" id="login_logo">
            Admin Area!!!
          </div>
          <p className="detail">สมัครสมาชิก 🌟</p>
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
                placeholder="Username"
                type="text"
                onChange={handleUsername}
              ></input>
              <input
                className="login_input"
                placeholder="Password"
                type="password"
                onChange={handlePassword}
              ></input>
            </div>
            {isBlack ? <div>กรุณากรอกข้อมูลให้ครบถ้วน</div> : ""}
            {/* <Router> */}
            <button className="login_btn" onClick={handleSubmit}>
              สมัครสมาชิก
            </button>
            {/* </Router> */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
