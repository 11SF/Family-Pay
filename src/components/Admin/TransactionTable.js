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

  const [data, setData] = useState([]);

  const fetchData = async () => {
    let res = await fetchTransactions(familyID);
    setData(res);
  };
  useEffect(() => {
    fetchData();
  }, [data]);

  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  tableInstance;

  const dataTable = () => {
    return (
      <div>
        <table {...getTableProps()}>
          <thead>
            {
              // Loop over the header rows
              headerGroups.map((headerGroup) => (
                // Apply the header row props
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    // Loop over the headers in each row
                    headerGroup.headers.map((column) => (
                      // Apply the header cell props
                      <th {...column.getHeaderProps()}>
                        {
                          // Render the header
                          column.render("Header")
                        }
                      </th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>
          <tbody {...getTableBodyProps()}>
            {
              // Loop over the table rows
              rows.map((row) => {
                // Prepare the row for display
                prepareRow(row);
                return (
                  // Apply the row props
                  <tr {...row.getRowProps()}>
                    {
                      // Loop over the rows cells
                      row.cells.map((cell) => {
                        // Apply the cell props
                        return (
                          <td {...cell.getCellProps()}>
                            {
                              // Render the cell contents
                              cell.render("Cell")
                            }
                          </td>
                        );
                      })
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  };

  return <div>{data === [] ? dataTable() : <div>กำลังโหลด</div>}</div>;
}
