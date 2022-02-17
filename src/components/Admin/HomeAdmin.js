import React, {useState} from "react";
import Card2 from "./Card2";

function HomeAdmin({familyData}) {
  const [membersData] = useState(familyData.members);
  return (
    <div className="container">
      <div className="w-full">
        <p className="text-black text-5xl py-10">เหล่าสมาชิกทั้งหลาย</p>
      </div>

      {/* <div className="py-20 flex flex-wrap justify-around flex-row gap-x-10 gap-y-32"> */}
      <div className="py-20 grid grid-cols-1 gap-x-20 gap-y-32 md:grid-cols-2 xl:grid-cols-3">
        {membersData.map(member => (
          <Card2 user={member} familyID={familyData._id} familyData={familyData} key={member._id}></Card2>
        ))}
      </div>
    </div>
  );
}

export default HomeAdmin;
