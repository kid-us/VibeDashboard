import SmallNavbar from "../Dashboard/SmallNav";
import Nav from "../Dashboard/Nav";
import Sidebar from "../Dashboard/Sidebar";
import PendingAmbassadors from "../Ambassadors/PendingAmbassadors";
import ApprovedAmbassadors from "../Ambassadors/ApprovedAmbassadors";

const Ambassadors = () => {
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
        <div className="lg:col-span-9 lg:p-5 md:p-5 px-1 py-2 md:px-6 md:col-span-10">
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
