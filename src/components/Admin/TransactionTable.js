import { React, useEffect, useState } from "react";

import { useTable } from "react-table";
import { fetchTransactions } from "../../modules/AdminService";

export default function TransactionTable({ transactions }) {
  const columns = [
    "no.",
    "ชื่อ",
    "ราคาจ่าย",
    "จำนวนเดือนที่ได้",
    "จ่ายเมื่อ",
    "จำนวนวันที่จ่ายเกินกำหนด",
    "สถานะ",
    "Action",
  ];

  const [data, setData] = useState([
    {
      CreatedAt: "2022-06-26T16:45:02.293152101Z",
      DeletedAt: null,
      ID: 11,
      UpdatedAt: "2022-06-26T16:45:02.293152101Z",
      date_overdue: 0,
      family_id: "FFmZb",
      family_name: "Nams Test",
      member_id: "aws",
      month: 1,
      name: "11SF_Test",
      price: 35,
      status: "active", //non-active
    },
    {
      CreatedAt: "2022-06-26T16:45:02.293152101Z",
      DeletedAt: null,
      ID: 11,
      UpdatedAt: "2022-06-26T16:45:02.293152101Z",
      date_overdue: 0,
      family_id: "FFmZb",
      family_name: "Nams Test",
      member_id: "aws",
      month: 1,
      name: "11SF_Test",
      price: 35,
      status: "active", //non-active
    },
    {
      CreatedAt: "2022-06-26T16:45:02.293152101Z",
      DeletedAt: null,
      ID: 11,
      UpdatedAt: "2022-06-26T16:45:02.293152101Z",
      date_overdue: 0,
      family_id: "FFmZb",
      family_name: "Nams Test",
      member_id: "aws",
      month: 1,
      name: "11SF_Test",
      price: 35,
      status: "active", //non-active
    },
    {
      CreatedAt: "2022-06-26T16:45:02.293152101Z",
      DeletedAt: null,
      ID: 11,
      UpdatedAt: "2022-06-26T16:45:02.293152101Z",
      date_overdue: 20,
      family_id: "FFmZb",
      family_name: "Nams Test",
      member_id: "aws",
      month: 3,
      name: "11SF_Test2",
      price: 105,
      status: "non-active", //non-active
    },
  ]);

  const dateFormat = (d) => {
    const date = new Date(d);
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear() + 543}`;
  };

  const getStatus = (status) => {
    if (status === "active") {
      return {
        class: "text-green-500",
        message: "ปกติ",
        actionBtnClass: "bg-yellow-500 hover:bg-yellow-700",
      };
    } else {
      return {
        class: "text-red-700",
        message: "ยกเลิกการทำรายการ",
        actionBtnClass: "bg-gray-500",
      };
    }
  };

  const getTableRowClass = (row) => {
    if (row % 2 === 0) {
      return "border border-slate-300";
    } else {
      return "border border-slate-300 bg-gray-50";
    }
  };

  // const [isLoading, setLoading] = useState(false);

  // const fetchData = async () => {
  //   setLoading(true);
  //   const res = await fetchTransactions(familyID);
  //   if (res.status === 200) {
  //     setData(res.data);
  //   }
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   console.log(data);
  //   setLoading(false);
  // }, [data]);

  // const tableInstance = useTable({ columns, data });
  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  //   tableInstance;

  // const dataTable = () => {
  //   return (
  //     <div>
  //       <table {...getTableProps()}>
  //         <thead>
  //           {
  //             // Loop over the header rows
  //             headerGroups.map((headerGroup) => (
  //               // Apply the header row props
  //               <tr {...headerGroup.getHeaderGroupProps()}>
  //                 {
  //                   // Loop over the headers in each row
  //                   headerGroup.headers.map((column) => (
  //                     // Apply the header cell props
  //                     <th {...column.getHeaderProps()}>
  //                       {
  //                         // Render the header
  //                         column.render("Header")
  //                       }
  //                     </th>
  //                   ))
  //                 }
  //               </tr>
  //             ))
  //           }
  //         </thead>
  //         <tbody {...getTableBodyProps()}>
  //           {
  //             // Loop over the table rows
  //             rows.map((row) => {
  //               // Prepare the row for display
  //               prepareRow(row);
  //               return (
  //                 // Apply the row props
  //                 <tr {...row.getRowProps()}>
  //                   {
  //                     // Loop over the rows cells
  //                     row.cells.map((cell) => {
  //                       // Apply the cell props
  //                       return (
  //                         <td {...cell.getCellProps()}>
  //                           {
  //                             // Render the cell contents
  //                             cell.render("Cell")
  //                           }
  //                         </td>
  //                       );
  //                     })
  //                   }
  //                 </tr>
  //               );
  //             })
  //           }
  //         </tbody>
  //       </table>
  //     </div>
  //   );
  // };
  return (
    <div className="container mt-12">
      <p className="text-black text-5xl py-10">ประวัติการทำรายการ</p>
      <table className="w-full table-auto border-collapse border border-slate-400 ">
        <thead className=" shadow-md">
          <tr>
            {columns.map((e, index) => (
              <th
                className="border border-slate-300 bg-gray-200 py-5"
                key={index}
              >
                {e}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {transactions.map((e, index) => (
            <tr key={index}>
              <td className={`${getTableRowClass(index)}`}>{index + 1}</td>
              <td className={`${getTableRowClass(index)}`}>{e.name}</td>
              <td className={`${getTableRowClass(index)}`}>{e.price}</td>
              <td className={`${getTableRowClass(index)}`}>{e.month}</td>
              <td className={`${getTableRowClass(index)}`}>
                {dateFormat(e.CreatedAt)}
              </td>
              <td className={`${getTableRowClass(index)}`}>{e.date_overdue}</td>
              <td
                className={`${getTableRowClass(index)} ${
                  getStatus(e.status).class
                }`}
              >
                {getStatus(e.status).message}
              </td>
              <td className={`${getTableRowClass(index)}`}>
                <div className="flex justify-evenly my-2">
                  <button
                    className={`${
                      getStatus(e.status).actionBtnClass
                    } text-white py-1 px-4 rounded`}
                  >
                    ยกเลิก
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full h-14 bg-gray-200">
      </div>
    </div>
  );
  // return <div>{isLoading ? <div>กำลังโหลด</div> : dataTable()}</div>;
  // return <div>{isLoading ? <div>กำลังโหลด</div> : <h1>{data.family_name}</h1>}</div>;
}
