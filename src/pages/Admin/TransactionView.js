import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import { fetchTransactions } from "../../modules/AdminService";
import Navbar from "../../components/Admin/Navbar";
import TransactionTable from "../../components/Admin/TransactionTable";

export default function TransactionView() {
  const { token } = useParams();

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [isEmpty, setEmpty] = useState(true);

  const fetchData = async () => {
    const res = await fetchTransactions({token});
    if (res.status === 200) {
      // console.log(res);
      if (!res.data.message) {
        setData(res.data);
        return setEmpty(false);
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("data :");
    console.log(data);
    setLoading(false);
  }, [data]);

  return (
    <div className="flex justify-center">
      <Navbar token={token} />
      {isLoading ? null : isEmpty ? (
        "ไม่มีข้อมูล"
      ) : (
        <TransactionTable transactions={data} />
      )}
    </div>
  );
}
