import { React, useEffect, useState } from "react";

import { useTable } from "react-table";
import { fetchTransactions } from "../../modules/AdminService";

export default function TransactionTable(familyID) {
  const columns = [
    {
      Header: "No",
      Cell: ({ row }) => <p>{row.index + 1}</p>,
    },
    {
      Header: "ชื่อ",
      accessor: "name",
    },
    {
      Header: "ราคาจ่าย",
      accessor: "price",
    },
    {
      Header: "จำนวนเดือนที่ได้",
      accessor: "month",
    },
    {
      Header: "จ่ายเมื่อ",
      accessor: "CreatedAt",
    },
    {
      Header: "จำนวนวันที่จ่ายเกินกำหนด",
      accessor: "date_overdue",
    },
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
      status: "",
    },
  ]);
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
    <div className="container">
      <p className="text-black text-5xl py-10">ประวัติการทำรายการ</p>
      <table className="w-full table-auto border-collapse border border-slate-400">
        <thead className=" shadow-md">
          <tr>
            <th className="border border-slate-300 bg-gray-200 py-5">no.</th>
            <th className="border border-slate-300 bg-gray-200">ชื่อ</th>
            <th className="border border-slate-300 bg-gray-200">ราคาจ่าย</th>
            <th className="border border-slate-300 bg-gray-200">จำนวนเดือนที่ได้</th>
            <th className="border border-slate-300 bg-gray-200">จ่ายเมื่อ</th>
            <th className="border border-slate-300 bg-gray-200">
              จำนวนวันที่จ่ายเกินกำหนด
            </th>
            <th className="border border-slate-300 bg-gray-200">สถานะ</th>
            <th className="border border-slate-300 bg-gray-200">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-slate-300">1</td>
            <td className="border border-slate-300">Malcolm Lockyer</td>
            <td className="border border-slate-300">35</td>
            <td className="border border-slate-300">1</td>
            <td className="border border-slate-300">2022-06-26</td>
            <td className="border border-slate-300">10</td>
            <td className="border border-slate-300 text-green-500">ปกติ</td>
            <td className="border border-slate-300">
              <div className="flex justify-evenly my-2">
                <button className="bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-4 rounded">
                  ยกเลิก
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td className="border border-slate-300 bg-gray-50">2</td>
            <td className="border border-slate-300 bg-gray-50">Malcolm Lockyer</td>
            <td className="border border-slate-300 bg-gray-50">35</td>
            <td className="border border-slate-300 bg-gray-50">1</td>
            <td className="border border-slate-300 bg-gray-50">2022-06-26</td>
            <td className="border border-slate-300 bg-gray-50">10</td>
            <td className="border border-slate-300 bg-gray-50 text-green-500">ปกติ</td>
            <td className="border border-slate-300 bg-gray-50">
              <div className="flex justify-evenly my-2">
                <button className="bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-4 rounded">
                  ยกเลิก
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td className="border border-slate-300">3</td>
            <td className="border border-slate-300">Malcolm Lockyer</td>
            <td className="border border-slate-300">35</td>
            <td className="border border-slate-300">1</td>
            <td className="border border-slate-300">2022-06-26</td>
            <td className="border border-slate-300">-</td>
            <td className="border border-slate-300 text-green-500">ปกติ</td>
            <td className="border border-slate-300">
              <div className="flex justify-evenly my-2">
                <button className="bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-4 rounded">
                  ยกเลิก
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td className="border border-slate-300 bg-gray-50">4</td>
            <td className="border border-slate-300 bg-gray-50">Malcolm Lockyer</td>
            <td className="border border-slate-300 bg-gray-50">35</td>
            <td className="border border-slate-300 bg-gray-50">1</td>
            <td className="border border-slate-300 bg-gray-50">2022-06-26</td>
            <td className="border border-slate-300 bg-gray-50">10</td>
            <td className="border border-slate-300 bg-gray-50 text-red-700">
              ยกเลิกการทำรายการ
            </td>
            <td className="border border-slate-300 bg-gray-50">
              <div className="flex justify-evenly my-2">
                <button className="bg-gray-500 text-white py-1 px-4 rounded" disabled>
                  ยกเลิก
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td className="border border-slate-300">5</td>
            <td className="border border-slate-300">Malcolm Lockyer</td>
            <td className="border border-slate-300">35</td>
            <td className="border border-slate-300">1</td>
            <td className="border border-slate-300">2022-06-26</td>
            <td className="border border-slate-300">-</td>
            <td className="border border-slate-300 text-green-500">ปกติ</td>
            <td className="border border-slate-300">
              <div className="flex justify-evenly my-2">
                <button className="bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-4 rounded">
                  ยกเลิก
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
  // return <div>{isLoading ? <div>กำลังโหลด</div> : dataTable()}</div>;
  // return <div>{isLoading ? <div>กำลังโหลด</div> : <h1>{data.family_name}</h1>}</div>;
}
