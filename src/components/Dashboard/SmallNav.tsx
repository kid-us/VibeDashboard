import { useState } from "react";
import { tabs } from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
import Setting from "../Modal/Setting";
import useAuth from "@/store/useAuth";
import axios from "axios";
import { baseUrl } from "@/services/request";
import useMessage from "@/hook/useMessages";
import Message from "./Message";

interface Props {
  active: string;
}

const SmallNavbar = ({ active }: Props) => {
  const navigate = useNavigate();
  const { messages } = useMessage();
  const { type } = useAuth();
  const [menu, setMenu] = useState(false);
  const [setting, setSetting] = useState<boolean>(false);
  const [message, setMessage] = useState<boolean>(false);

  const handleLogout = () => {
    axios
      .post(
        `${baseUrl}/api/v1/dashboard/logout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
              <span className="absolute top-[2px] left-[7px] font-poppins text-xs">
                {messages.length}
              </span>
            </p>
          </div>
          <p
            onClick={() => setSetting(true)}
            className="cursor-pointer bi-person-circle text-xl"
          ></p>
          <p
            onClick={() => handleLogout()}
            className="bi-box-arrow-right text-xl"
          ></p>
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
      {message && <Message />}
      {/* Setting */}
      {setting && <Setting onClose={() => setSetting(false)} />}
    </>
  );
};

export default SmallNavbar;
