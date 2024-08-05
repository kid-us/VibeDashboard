import SmallNavbar from "../Dashboard/SmallNav";
import Sidebar from "../Dashboard/Sidebar";
import Nav from "../Dashboard/Nav";

const Forms = () => {
  return (
    <div className="relative lg:grid md:grid grid-cols-11">
      {/* Small device Navbar */}
      <SmallNavbar active="Forms" />
      {/* Sidebar */}
      <div className="lg:col-span-2 w-full">
        {/* <div className=""> */}
        <Sidebar active="Forms" />
        {/* </div> */}
      </div>
      <div className="lg:col-span-9 lg:px-2 md:px-2 px-2 py-3 md:col-span-10">
        {/* Nav */}
        <Nav />
      </div>
    </div>
  );
};

export default Forms;
