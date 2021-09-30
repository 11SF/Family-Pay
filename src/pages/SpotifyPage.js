import React, {useState, useEffect} from "react";
import './SpotifyPage.css'
import Header from "../components/Navbar/Navbar";
import Card from "../components/Card/Card";
import Payment from "../components/Payment/Payment";

import loading_icon from "../assets/bars.svg";
import {useParams} from "react-router";
import { fetchFamily } from "../modules/fetch";

export default function SpotifyPage({user}) {
  const [memberData, setMemberData] = useState([]);
  const [familyData, setFamilyData] = useState("")
  const [loading, setLoading] = useState(false);
  const {token} = useParams();

  async function fetchData() {
      setLoading(true);
    let result = await fetchFamily(token)
    setFamilyData(result)
    setMemberData(result.members)
      setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Header familyName={familyData.familyName} />
      <main>
                <div className="container">
                    {loading ? 
                    <img data-aos="fade-down" className="loading" src={loading_icon} alt="loading_bar" style={{maxWidth: "200px", margin: "50px 0 300px 0"}}/> 
                    : memberData.map(user => (<Card key={user._id} className="card" name={user.name} 
                        pic={user.img_src} lastDate={user.lastDate} expireDate={user.expireDate} />)) }
                </div>
                <div className="bottom_wave" data-aos="slide-up"></div>
                <Payment />
            </main>
      <footer className="footer">11SF</footer>
    </div>
  );
}
