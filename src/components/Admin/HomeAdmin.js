import React, {useState} from "react";
import Card from "./Card";
// import withReactContent from "sweetalert2-react-content";

function HomeAdmin({familyData}) {
  //   const MySwal = withReactContent(Swal);
  console.log(familyData);
  const [membersData, setMemberData] = useState(familyData.members)
  return (
    <div className="container py-20 flex flex-row gap-10">
      {membersData.map(member => (
        <Card user={member} key={member._id} />
      ))}
    </div>
  );
}

export default HomeAdmin;
