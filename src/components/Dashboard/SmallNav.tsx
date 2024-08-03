import { useState } from "react";
import { tabs } from "./Sidebar";
import { Link } from "react-router-dom";
import Setting from "../Modal/Setting";

interface Props {
  active: string;
}

const SmallNavbar = ({ active }: Props) => {
  const [menu, setMenu] = useState(false);
  const [setting, setSetting] = useState<boolean>(false);

  return (
    <>
      <div className="lg:hidden md:hidden hero-bg z-10 flex justify-between sticky top-0 shadow-lg p-4 secondary-bg">
        <p
          onClick={() => setMenu(!menu)}
          className={`${menu ? "bi-x" : "bi-list"} text-white text-3xl`}
        ></p>
        <Link to="/">
          <p className="text-white text-2xl logo-font">vibecard</p>
        </Link>

        <div className="text-white flex gap-x-10 ">
          <div className="relative">
            <p className="cursor-pointer bi-bell-fill text-xl"></p>
            <p className="absolute -top-2 left-3 bg-red-500 rounded-full w-5 h-5 text-center">
              <span className="absolute -top-[3px] left-[5px]">0</span>
            </p>
          </div>
          <p
            onClick={() => setSetting(true)}
            className="cursor-pointer bi-person-circle text-xl"
          ></p>
          <p className="bi-box-arrow-right text-xl"></p>
        </div>
      </div>

      {menu && (
        <div className="fixed bg-main w-full z-50 h-[100dvh] secondary-bg">
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
          </div>
        </div>
      )}

      {setting && <Setting onClose={() => setSetting(false)} />}
    </>
  );
};

export default SmallNavbar;
