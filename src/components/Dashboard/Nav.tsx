import { useState } from "react";
import Setting from "../Modal/Setting";
import axios from "axios";
import { baseUrl } from "@/services/request";
import { useNavigate } from "react-router-dom";
import Message from "./Message";
import useMessage from "@/hook/useMessages";

const Nav = () => {
  const [setting, setSetting] = useState<boolean>(false);
  const navigate = useNavigate();

  const [message, setMessage] = useState<boolean>(false);
  const { messages } = useMessage();

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
      <div className="lg:flex md:flex hidden justify-between border-b border-gray-700 py-3">
        <div className="relative">
          <div className="text-white">
            <p className="font-poppins text-xl">Welcome back Admin </p>
            <p className="text-gray-400 mt-1 text-xs font-poppins">
              Manage your customers, ambassadors and website
            </p>
          </div>
        </div>
        <div className="text-white flex gap-x-10 me-5">
          <div className="relative">
            <button
              onClick={() => setMessage(!message)}
              className="cursor-pointer bi-bell-fill text-2xl"
            ></button>
            <p className="absolute -top-2 left-3 bg-red-500 rounded-full w-5 h-5 text-center">
              <span className="absolute -top-[2px] left-[7px] font-poppins">
                {messages.length}
              </span>
            </p>
          </div>
          <p
            onClick={() => setSetting(true)}
            className="cursor-pointer bi-person-circle text-2xl"
          ></p>
          <p
            onClick={() => handleLogout()}
            className="bi-box-arrow-right text-2xl cursor-pointer"
          ></p>
        </div>
      </div>
      {/* Message */}
      {message && <Message />}
      {/* Setting */}
      {setting && <Setting onClose={() => setSetting(false)} />}
    </>
  );
};

export default Nav;
