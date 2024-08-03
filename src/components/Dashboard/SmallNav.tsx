import { useState } from "react";
import { tabs } from "./Sidebar";
import { Link } from "react-router-dom";

interface Props {
  active: string;
}

const SmallNavbar = ({ active }: Props) => {
  const [menu, setMenu] = useState(false);

  return (
    <>
      <div className="lg:hidden md:hidden hero-bg z-10 flex justify-between sticky top-0 shadow-lg p-4 hero-bg">
        <p
          onClick={() => setMenu(!menu)}
          className={`${menu ? "bi-x" : "bi-list"} text-white text-3xl`}
        ></p>
        <Link to="/">
          <p className="text-white text-2xl logo-font">vibecard</p>
        </Link>
      </div>

      {menu && (
        <div className="fixed bg-main w-full z-50 h-[100dvh]">
          <div className="mt-10 md:text-center lg:text-start lg:ms-3 text-white px-5">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                to={tab.path}
                className={`${
                  active === tab.title
                    ? "bg-teal-300 rounded text-black"
                    : "text-white"
                } block mb-5 text-xl p-3`}
              >
                <span className={`${tab.icon} me-5`}></span>
                {tab.title}
              </Link>
            ))}
            {/* Logout */}
            {/* <button className={`text-white p-2 text-xl`}>
              <span
                className={`text-2xl  bi-arrow-bar-right lg:me-5 text-center me-5`}
              ></span>
              Logout
            </button> */}
          </div>
        </div>
      )}
    </>
  );
};

export default SmallNavbar;
