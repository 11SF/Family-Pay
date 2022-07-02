import React, {useState} from "react";

function FamilyDetail({familyName, token}) {
  const [familyNameInput, setFamilyNameInput] = useState(familyName);
  return (
    <div className="container mx-auto mt-12">
      <div className="w-full mt-20 p-10 bg-gray-100 rounded-lg">
        <p className="text-black">ข้อมูลครอบครัว</p>
        <div className="w-1/2 mx-auto">
          <div className="mt-5 text-left">
            <p className="text-sm text-black mb-3">ชื่อครอบครัว</p>
            <input
              className="text-center w-full h-10 rounded-xl disable"
              onChange={e => {
                setFamilyNameInput(e.target.value);
              }}
              value={familyName}
              disabled
            ></input>
          </div>
          <div className="bg-blue-300 my-10 p-5 rounded-lg">
            <p className="text-black mb-3">Token</p>
            <p className="text-black text-6xl">{token}</p>
            <button className="text-black mt-3 text-sm cursor-pointer" onClick={() => {navigator.clipboard.writeText(token)}}>คัดลอก</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FamilyDetail;
