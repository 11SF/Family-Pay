import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import FamilyInfoC from "../../components/Admin/FamilyInfo";

import Navbar from "../../components/Admin/Navbar";
// import { fetchFamily } from "../../modules/AdminService";

export default function FamilyInfo() {
  const { token } = useParams();
  // const [familyData, setFamilyData] = useState(null);
  // const [isLoading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // async function fetchData() {
  //   let result = await fetchFamily(token);
  //   setFamilyData(result);
  // }

  // useEffect(() => {
  //   if (familyData) {
  //     setLoading(false);
  //   }
  //   // //console.log(familyData);
  // }, [familyData]);

  return (
    <div className="flex justify-center">
      <Navbar token={token} />
      <FamilyInfoC className="h-screen" />
    </div>
  );
}
