import { useState } from "react";
import { tabs } from "./Sidebar";
import { Link } from "react-router-dom";
import Setting from "../Modal/Setting";
import useAmbassadors from "@/hook/useAmbassadors";
import useAuth from "@/store/useAuth";

interface Props {
  active: string;
}

const SmallNavbar = ({ active }: Props) => {
  const { type } = useAuth();
  const [menu, setMenu] = useState(false);
  const [setting, setSetting] = useState<boolean>(false);
  const { pendingAmbassadors } = useAmbassadors();
  const [message, setMessage] = useState<boolean>(false);

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
            <p
              onClick={() => setMessage(!message)}
              className="cursor-pointer bi-bell-fill text-xl"
            ></p>
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
                    ? "bg-teal-500 rounded text-black"
                    : "text-white"
                } block mb-5 text-xl p-3 font-poppins`}
              >
                <span className={`${tab.icon} me-5`}></span>
                {tab.title}
              </Link>
            ))}
            {type === "super_admin" && (
              <Link
                to={"/forms"}
                className={`${
                  active === "Forms"
                    ? "bg-teal-500 rounded text-black"
                    : "text-white"
                } block mb-5 text-xl p-3 font-poppins`}
              >
                <span className={`bi-input-cursor-text me-5`}></span>
                Forms
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Message */}
      {message && (
        <>
          <div className="fixed lg:w-[20%] w-[80%] z-50 top-14 right-0 bg-white rounded p-2">
            {pendingAmbassadors.length > 0 ? (
              <>
                {pendingAmbassadors.map((pending) => (
                  <div className="flex justify-between bg-teal-500 rounded px-2 py-1 mb-2">
                    <div className="flex gap-x-4">
                      <p className="font-bold">{pending.first_name}</p>
                      <p className="font-bold">{pending.last_name}</p>
                    </div>
                    <Link
                      to="/ambassadors"
                      className="bi-box-arrow-in-right text-xl text-white"
                    ></Link>
                  </div>
                ))}
                <p className="text-xs mt-3 ms-1 font-bold">
                  Requested to become an Ambassador
                </p>
              </>
            ) : (
              <p className="text-sm mt-3 font-bold text-red-600">
                There is no message to view!
              </p>
            )}
          </div>
        </>
      )}
      {/* Setting */}
      {setting && <Setting onClose={() => setSetting(false)} />}
    </>
  );
};

export default SmallNavbar;
