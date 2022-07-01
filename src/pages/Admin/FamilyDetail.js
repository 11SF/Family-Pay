import React from "react";
import { useParams } from "react-router";

import Navbar from "../../components/Admin/Navbar";

export default function FamilyDetail() {
  const { token } = useParams();

  return (
    <div>
      <Navbar token={token} />
    </div>
  );
}
