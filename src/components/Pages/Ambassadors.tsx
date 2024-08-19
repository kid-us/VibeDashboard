import SmallNavbar from "../Dashboard/SmallNav";
import Nav from "../Dashboard/Nav";
import Sidebar from "../Dashboard/Sidebar";
import PendingAmbassadors from "../Ambassadors/PendingAmbassadors";
import ApprovedAmbassadors from "../Ambassadors/ApprovedAmbassadors";
import { useState } from "react";
import useDocumentTitle from "@/hook/useDocumentTitle";

const Ambassadors = () => {
  const [title] = useState("Ambassadors");
  useDocumentTitle(title);

  return (
    <>
      <div className="relative lg:grid md:grid grid-cols-11">
        {/* Small device Navbar */}
        <SmallNavbar active="Ambassadors" />
        {/* Sidebar */}
        <div className="lg:col-span-2 w-full">
          {/* <div className=""> */}
          <Sidebar active="Ambassadors" />
          {/* </div> */}
        </div>
        <div className="lg:col-span-9 lg:px-4 md:px-2 px-2 py-2 md:col-span-10">
          {/* Nav */}
          <Nav />

          {/* Contents */}
          <h1 className="text-white text-xl my-3 lg:hidden md:hidden ms-1">
            Ambassadors
          </h1>

          {/* Approved */}
          <ApprovedAmbassadors />
          {/* Pending */}
          <PendingAmbassadors />
        </div>
      </div>
    </>
  );
};

export default Ambassadors;
