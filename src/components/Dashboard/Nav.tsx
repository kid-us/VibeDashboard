import { useState } from "react";
import Setting from "../Modal/Setting";
import axios from "axios";
import { baseUrl } from "@/services/request";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const [setting, setSetting] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .post(`${baseUrl}/api/v1/dashboard/logout`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="lg:flex md:flex hidden justify-between border-b border-gray-700 pb-2">
        <div className="relative">
          <div className="text-white">
            <p className="font-bold">Welcome back Admin </p>
            <p className="text-gray-400 mt-1 text-xs">
              Manage your customers, ambassadors and website
            </p>
          </div>
        </div>
        <div className="text-white flex gap-x-10 me-5">
          <div className="relative">
            <p className="cursor-pointer bi-bell-fill text-2xl"></p>
            <p className="absolute -top-2 left-3 bg-red-500 rounded-full w-5 h-5 text-center">
              <span className="absolute -top-[3px] left-[5px]">0</span>
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

      {setting && <Setting onClose={() => setSetting(false)} />}
    </>
  );
};

export default Nav;
