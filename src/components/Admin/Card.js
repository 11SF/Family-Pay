import React, {useState} from 'react'
import Swal from "sweetalert2";
function Card({user}) {
    const [month, setMonth] = useState(0);
    const confirm = user => {
        Swal.fire({
          title: `เพิ่ม ${month} เดือนให้กับ ${user}`,
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Save",
        }).then(result => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            Swal.fire("Saved!", "", "success");
            setMonth(0);
          } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
          }
        });
      };
    return (
        <div className="w-2/3">
        <div className="h-48 flex bg-gray-100 justify-between items-center text-3xl rounded-xl shadow-xl">
          <img
            className="h-full rounded-l-xl"
            src="https://cdn.discordapp.com/attachments/557626019247423508/870389553003896902/107698195_2967815813287518_541907919760258090_n.png"
            alt="pic"
          />
          <div className="w-4/6 p-10 text-left">
            <h1 className="text-left text-md mb-10">11SF</h1>
            <h4 className="text-left text-xl">จ่ายล่าสุด : 1/8/2564</h4>
            <h4 className="text-left text-xl">หมดอายุ : 3/10/2564</h4>
          </div>
          <div className="w-1/6 p-5">
            <p className="text-black mb-2">{month} เดือน</p>
            <div className="flex justify-between mb-5">
              <button
                className="h-10 w-10 rounded-full bg-gray-300 hover:bg-gray-400"
                onClick={() => {
                  if (month > 0) {
                    setMonth(month - 1);
                  }
                }}
              >
                -
              </button>
              <button
                className="h-10 w-10 rounded-full bg-gray-300 hover:bg-gray-400"
                onClick={() => {
                  setMonth(month + 1);
                }}
              >
                +
              </button>
            </div>
            <button
              className={
                month > 0
                  ? "bg-blue-500 p-2 text-sm text-white w-full rounded-xl hover:bg-blue-800"
                  : "bg-blue-500 p-2 text-sm text-white w-full rounded-xl cursor-default"
              }
              onClick={() => {
                confirm("11SF");
              }}
            >
              ยืนยัน
            </button>
          </div>
        </div>
      </div>
    )
}

export default Card
