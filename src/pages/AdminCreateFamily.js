import React, { useState } from "react";
import { createFamily } from "../modules/AdminService";
import { getUserData } from "../modules/AuthService";

function AdminCreateFamily() {
  const [familyName, setFamilyName] = useState("");
  const [platform, setPlatform] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isCreated, setCreated] = useState(false);
  const [familyDetail, setFamilyDetail] = useState(false);
  const btn_style = {
    selected: "w-1/2 bg-gray-200 h-14 text-xl ",
    notSelect: "w-1/2 bg-gray-50 h-14 hover:bg-gray-200",
  };

  const form = () => (
    <div className="w-1/2 mx-auto">
      <div className="w-1/2 mx-auto">
        <p className="text-left">ชื่อครอบครัว</p>
        <input
          placeholder={`ครอบครัว ${getUserData().username} แสนอบอุ่น`}
          className="w-full p-2 text-center rounded-lg"
          onChange={(e) => {
            setFamilyName(e.target.value);
          }}
        ></input>
      </div>
      <div className="w-1/2 mx-auto mt-10">
        <p className="text-left">เลือก Platform</p>
        <div className="flex mt-2">
          <button
            className={
              (platform === "spotify"
                ? btn_style.selected
                : btn_style.notSelect) + " rounded-l-lg"
            }
            onClick={() => {
              setPlatform("spotify");
            }}
          >
            Spotify
          </button>
          <button
            className={
              (platform === "youtube"
                ? btn_style.selected
                : btn_style.notSelect) + " rounded-r-lg"
            }
            onClick={() => {
              setPlatform("youtube");
            }}
          >
            Youtube Premium
          </button>
        </div>
      </div>
      {familyName && platform ? (
        <button
          className="w-1/2 h-14 mt-16 text-2xl mx-auto rounded-lg bg-gray-50 hover:bg-gray-200"
          onClick={() => {
            handleCreate();
          }}
        >
          สร้างเลยยย
        </button>
      ) : (
        <h1 className="w-1/2 h-14 mt-16 text-2xl mx-auto rounded-lg bg-gray-50 flex items-center justify-center cursor-default">
          กรุณากรอกข้อมูลให้ครบถ้วน
        </h1>
      )}
    </div>
  );

  const handleCreate = async () => {
    setLoading(true);
    let result = await createFamily(familyName, platform);
    console.log(result);
    if (result.status) {
      setFamilyDetail(result);
      setCreated(true);
    }
    setLoading(false);
  };

  const showDetail = () => (
    <div className="w-1/2 text-left mx-auto">
      {/* <h1 className="text-center text-4xl text-white font-medium mb-16">
        {familyDetail.msg}
      </h1> */}
      <div className="w-full mx-auto text-center p-5 mb-10 bg-gray-50 rounded-xl">
        <p className="text-3xl text-black mb-10">
          Token สำหรับสมาชิกท่านอื่น ๆ{" "}
        </p>
        <p className="text-9xl text-black">{familyDetail.data.token}</p>
      </div>

      <div>
        <p>รายละเอียดครอบครัว</p>
        <p>
          Email หัวหน้าครอบครัว :{" "}
          <span className="text-black">{familyDetail.data.hostEmail}</span>
        </p>
        <p>
          Platform :{" "}
          <span className="text-black">
            {familyDetail.data.platform === "spotify"
              ? "Spotify"
              : familyDetail.data.platform === "youtube"
              ? "Youtube Premium"
              : familyDetail.data.platform}
          </span>
        </p>
      </div>
      <buttn className=" w-full bg-gray-50 p-4 rounded-lg">กลับหน้าแรก</buttn>
    </div>
  );
  return (
    <div className="h-auto w-screen bg-blue-600 md:h-screen">
      <div className="container mx-auto py-40">
        <h1 className="text-white text-5xl pb-28">สร้างครอบครัวใหม่</h1>
        {isLoading ? <h1>Loading</h1> : isCreated ? showDetail() : form()}
      </div>
    </div>
  );
}

export default AdminCreateFamily;
