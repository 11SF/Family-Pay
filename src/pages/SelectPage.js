import React, {useState, useEffect} from "react";
import "./SelectPage.css";
import {fetchFamily} from "../modules/AdminService";
import FamilyCard from "../components/selectPage/FamilyCard";
import {Link} from "react-router-dom";
import {logout, getUserData, isLogin} from "../modules/AuthService";

function SelectPage() {
  // const [tokens, setTokens] = useState(["FFmZb", "Fglf1"]);
  const [tokens, setTokens] = useState(
    JSON.parse(localStorage.getItem("FamilyToken"))
  );
  const [tokenInput, setTokenInput] = useState();
  const [families, setFamilies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isClickAddfamily, setClickAddfamily] = useState(false);
  const [msgAddPage, setMsgAddPage] = useState("");
  const [nickname, setNickname] = useState(localStorage.getItem("nickname"));
  const [nicktemp, setNicknameTemp] = useState("");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    if (tokens) {
      let result = await Promise.all(
        tokens.map(token => {
          return fetchFamily(token);
        })
      );
      result = result.filter(value => value._id);
      setFamilies(result);
    }
    setLoading(false);
  };

  const addToken = async () => {
    let token = tokens;
    let checkDup = [];
    if (tokens) {
      checkDup = tokens.filter(value => value === tokenInput);
    } else {
      token = [];
    }

    // //console.log(checkDup);
    if (checkDup.length > 0) {
      //console.log("Is Dupplicate!!!");
      setMsgAddPage("มี Token นี้อยู่แล้ว!!");
    } else {
      let res = await fetchFamily(tokenInput);
      if (res._id) {
        token.push(tokenInput);
        setFamilies([res, ...families]);
        // //console.log("log " + token);
        localStorage.setItem("FamilyToken", JSON.stringify(token));
        setTokens(JSON.parse(localStorage.getItem("FamilyToken")));
        setClickAddfamily(false);
        setMsgAddPage("");
      } else {
        setMsgAddPage("ไม่มี Token นี้อยู่ในระบบ");
      }
    }
  };

  const selectFamily = (
    <div className="py-44">
      <h1 className="text-white mb-10 text-5xl">สวัสดี {nickname}</h1>
      <div className="flex flex-wrap justify-center gap-5">
        {isLoading ? (
          <h1 className="text-white">Loading</h1>
        ) : (
          families.map((family, index) => (
            <Link
              to={`/${family.platform.toLowerCase()}/${family.token}`}
              className="mx-4 p-4 rounded-md _hover"
              key={index}
            >
              <FamilyCard
                familyPlatform={family.platform}
                familyName={family.familyName}
              />
            </Link>
          ))
        )}
        <div
          className="mx-4 p-4 _hover"
          onClick={() => setClickAddfamily(true)}
        >
          <div className="h-auto w-44 d-flex flex-shrink-0">
            <div className="h-44 w-44 rounded-md p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-full text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <p className="text-center text-2xl text-white">เพิ่มครอบครัว</p>
          </div>
        </div>
      </div>
    </div>
  );
  const addFamily = (
    <div className="h-screen w-96 flex flex-wrap justify-center items-center flex-col">
      <div className="flex h-12">
        <input
          className="p-2 h-12 w-2/3 text-center rounded-md"
          placeholder="กรุณาใส่ Token"
          onChange={e => {
            setTokenInput(e.target.value);
          }}
        />
        <button
          className="w-1/3 pl-3"
          onClick={() =>
            tokenInput.length === 5
              ? addToken()
              : setMsgAddPage("กรุณากรอก Token ให้ถูกต้อง")
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-white transform motion-safe:hover:scale-110"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
      </div>
      <div className="text-white w-full text-left text-xl p-1 my-2">
        {msgAddPage}
      </div>
    </div>
  );

  const addNickname = (
    <div className="h-screen w-96 flex flex-wrap justify-center items-center flex-col">
      <div className="flex h-12">
        <input
          className="p-2 h-12 w-2/3 text-center rounded-md"
          placeholder="กรุณาใส่ชื่อเล่นของคุณ"
          defaultValue={nickname}
          onChange={e => {
            setNicknameTemp(e.target.value);
          }}
        />
        <button
          className="w-1/3 pl-3"
          onClick={() => {
            localStorage.setItem("nickname", nicktemp);
            window.location.reload();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-white transform motion-safe:hover:scale-110"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-auto w-screen bg-black md:h-screen">
      {/* <div className="text-white text-xl py-6 px-10 w-full flex justify-between items-center absolute"> */}
      <header className="text-white text-xl py-6 px-10 w-full items-center absolute">
        {isClickAddfamily ? (
          <h1
            className="text-left cursor-pointer hover:text-gray-300"
            onClick={() => {
              setClickAddfamily(false);
              setMsgAddPage("");
            }}
          >
            ย้อนกลับ
          </h1>
        ) : isLogin() ? (
          <Link to="/admin/selectfamily">
            <h1 className="text-right cursor-pointer hover:text-gray-300">
              {getUserData().username}
            </h1>
          </Link>
        ) : (
          <Link to="/login">
            <h1 className="text-right cursor-pointer hover:text-gray-300">
              เข้าสู่ระบบ
            </h1>
          </Link>
        )}
      </header>
      <div className="h-full w-full flex flex-wrap justify-center items-center">
        {nickname ? (isClickAddfamily ? addFamily : selectFamily) : addNickname}
      </div>
      <button className="p-5 text-sm text-gray-300 font-normal bottom-0 right-0 absolute" onClick={()=> setNickname("")}>แก้ไขชื่อเล่น</button>
    </div>
  );
}

export default SelectPage;
