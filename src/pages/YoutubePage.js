import React, {useState, useEffect} from "react";
import "./YoutubePage.css";
import Header from "../components/Navbar/NavbarYoutube";
import Card from "../components/Card/Card";
import Payment from "../components/Payment/Payment";
// import axios from "axios";

import loading_icon from "../assets/bars.svg";
import {useParams} from "react-router";
import {fetchFamily} from "../modules/AdminService";

export default function YoutubeyPage({user}) {
  // const BASE_URL = "http://localhost:5000/api/v2";
  const [memberData, setMemberData] = useState([]);
  const [familyData, setFamilyData] = useState("");
  const [loading, setLoading] = useState(true);
  const {token} = useParams();

  async function fetchData() {
    let result = await fetchFamily(token);
    setFamilyData(result);
    let arr = result.members;
    setMemberData(arr);
  }

  useEffect(() => {
    fetchData();
    // setTimeout(() => {
    //   console.log(memberData.length);
    // }, 1000);
  }, []);
  useEffect(() => {
    setLoading(false);
    // console.log(memberData.length);
  }, [memberData]);

  return (
    <div>
      <Header familyName={familyData.familyName} />
      <main>
        <div className="container">
          {loading ? (
            <img
              data-aos="fade-down"
              className="loading"
              src={loading_icon}
              alt="loading_bar"
              style={{maxWidth: "200px", margin: "50px 0 300px 0"}}
            />
          ) : memberData.length > 0 ? (
            // <h1>sdfsdfsdf</h1>
            memberData.map(user => (
              <Card
                key={user._id}
                className="card"
                name={user.name}
                pic={user.img_src}
                lastDate={user.lastDate}
                expireDate={user.expireDate}
              />
            ))
          ) : (
            <h1>ไม่มีสมาชิก</h1>
          )}
        </div>
        <div className="bottom_wave" data-aos="slide-up"></div>
        {/* <Payment /> */}
      </main>
      <footer className="footer">11SF</footer>
    </div>
  );
}
