import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../../components/Admin/Navbar";
import { fetchFamily } from "../../modules/AdminService";
import HomeAdminc from "../../components/Admin/HomeAdmin";

export default function HomeAdmin() {
  const { token } = useParams();
  const [familyData, setFamilyData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    let result = await fetchFamily(token);
    setFamilyData(result);
  }

  useEffect(() => {
    if (familyData) {
      setLoading(false);
    }
    // //console.log(familyData);
  }, [familyData]);

  return (
    <div className="flex justify-center">
      <Navbar token={token}/>
      {
        isLoading ? null : <HomeAdminc familyData={familyData} />
      }
    </div>
  );
}
