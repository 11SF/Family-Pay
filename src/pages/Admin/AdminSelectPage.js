import React, {useState, useEffect} from "react";
import {getUserData} from "../../modules/AuthService";
import {fetchFamilyByEmail} from "../../modules/AdminService";
import {Link, Redirect} from "react-router-dom";
import FamilyCard from "../../components/selectPage/FamilyCard";

function AdminSelectPage() {
  const [isLoading, setLoading] = useState(false);
  const [isClickAddfamily, setClickAddfamily] = useState(false);
  const [families, setFamilies] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    let result = await fetchFamilyByEmail(getUserData().sub);
    //   result = result.filter(value => value._id);
    setFamilies(result);
    console.log(families);
    setLoading(false);
  };

  const addFamilyBtn = () => (
    <Link to="/admin/createfamily" className="p-4 _hover">
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
        <p className="text-center text-2xl text-white">สร้างครอบครัวใหม่</p>
      </div>
    </Link>
  );

  const selectFamily = () => (
    // <div className="mx-auto py-44">
    <div className="flex flex-wrap justify-center gap-5">
      {isLoading ? (
        <h1 className="text-white">Loading</h1>
      ) : (
        families.map((family, index) => (
          <Link
            to={`/admin/${family.token}/home`}
            className="p-4 rounded-md _hover"
            key={index}
          >
            <FamilyCard
              familyPlatform={family.platform}
              familyName={family.familyName}
            />
          </Link>
        ))
      )}
      {addFamilyBtn()}
    </div>
    // </div>
  );

  return (
    <div className="bg-indigo-900 w-screen h-auto md:h-screen">
      <header className="text-white text-xl py-6 px-10 w-full flex justify-between items-center absolute">
        <Link to="/">
          <h1
            className="text-left cursor-pointer hover:text-gray-300"
            onClick={() => {
              setClickAddfamily(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
              />
            </svg>
          </h1>
        </Link>
        <h1 className="text-right cursor-default">สำหรับ Admin</h1>
      </header>

      <main className="py-44 container h-full mx-auto flex flex-wrap justify-center items-center">
        <div>
          <h1 className="text-white mb-10 text-5xl">
            สวัสดีท่าน <div className="text-yellow-500 inline">{" " + getUserData().username}</div>
          </h1>
          {selectFamily()}
        </div>
      </main>
    </div>
  );
}


export default AdminSelectPage;
