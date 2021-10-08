import React, {useState} from "react";
import Card from "./Card";
import Card2 from "./Card2";
// import withReactContent from "sweetalert2-react-content";

function HomeAdmin({familyData}) {
  //   const MySwal = withReactContent(Swal);
  console.log(familyData);
  const [membersData, setMemberData] = useState(familyData.members);
  return (
    <div className="container">
      <div className="w-full">
        <p className="text-black text-5xl py-10">เหล่าสมาชิกทั้งหลาย</p>
      </div>

      <div className="py-20 flex flex-wrap justify-around flex-row gap-x-10 gap-y-32">
        {membersData.map(member => (
          <Card2 user={member} familyID={familyData._id} key={member._id}></Card2>
        ))}
      </div>
    </div>
  );
}

export default HomeAdmin;
