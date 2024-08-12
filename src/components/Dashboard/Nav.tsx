import { useState } from "react";
import Setting from "../Modal/Setting";
import axios from "axios";
import { baseUrl } from "@/services/request";
import { Link, useNavigate } from "react-router-dom";
import useAmbassadors from "@/hook/useAmbassadors";

const Nav = () => {
  const [setting, setSetting] = useState<boolean>(false);
  const navigate = useNavigate();

  const [message, setMessage] = useState<boolean>(false);

  const { pendingAmbassadors } = useAmbassadors();

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
            <button
              onClick={() => setMessage(!message)}
              className="cursor-pointer bi-bell-fill text-2xl"
            ></button>
            <p className="absolute -top-2 left-3 bg-red-500 rounded-full w-5 h-5 text-center">
              <span className="absolute -top-[3px] left-[5px]">
                {pendingAmbassadors.length}
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

export default Nav;
