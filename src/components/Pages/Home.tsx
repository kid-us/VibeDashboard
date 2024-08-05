import { useEffect, useState } from "react";
import Nav from "../Dashboard/Nav";
import Sidebar from "../Dashboard/Sidebar";
import SmallNavbar from "../Dashboard/SmallNav";
import useAmbassadors from "@/hook/useAmbassadors";
import axios from "axios";
import { baseUrl } from "@/services/request";
import PieCharts from "../Charts/PieChart";
import Subscription from "../Subscription/Subscription";

interface Subscription {
  free: number;
  pro: number;
  proPlus: number;
}

interface General {
  number_of_admins: number;
  number_of_approved_ambassadors: number;
  number_of_cards: number;
  subscription_info: Subscription;
  number_of_pending_ambassadors: number;
  number_of_total_users: number;
}

const Home = () => {
  const [general, setGeneral] = useState<General>();

  useEffect(() => {
    axios
      .get<General>(`${baseUrl}/api/v1/dashboard/general`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setGeneral(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const { activeAmbassadors, pendingAmbassadors } = useAmbassadors();
  return (
    <>
      <div className="relative lg:grid md:grid grid-cols-11">
        {/* Small device Navbar */}
        <SmallNavbar active="Dashboard" />
        {/* Sidebar */}
        <div className="lg:col-span-2 w-full">
          {/* <div className=""> */}
          <Sidebar active="Dashboard" />
          {/* </div> */}
        </div>
        <div className="lg:col-span-9 lg:px-2 md:px-2 px-1 py-2 md:col-span-10">
          {/* Nav */}
          <Nav />

          <div className="grid lg:grid-cols-4 md:grid-cols-2 mt-5 gap-x-4">
            <div className="flex justify-between bg2 rounded p-4 h-22 text-white shadow shadow-zinc-950 lg:mb-0 mb-3">
              <div className="">
                <p className="text-gray-300 text-xs uppercase">Total User</p>
                <p className="text-3xl mt-1 font-poppins">
                  {general?.number_of_total_users}
                </p>
              </div>
              <p className="bi-person-fill text-5xl mt-1"></p>
            </div>
            <div className="flex justify-between bg2 rounded p-4 h-22 text-white shadow shadow-zinc-950 lg:mb-0 mb-3">
              <div className="">
                <p className="text-gray-300 text-xs uppercase">
                  Total Generated Cards
                </p>
                <p className="text-3xl mt-1 font-poppins">
                  {general?.number_of_cards}
                </p>
              </div>
              <p className="bi-person-fill text-5xl mt-1"></p>
            </div>
            <div className="flex justify-between bg2 rounded p-4 h-22 text-white shadow shadow-zinc-950 lg:mb-0 mb-3">
              <div className="">
                <p className="text-gray-300 text-xs uppercase">
                  Total Approved Ambassadors
                </p>
                <p className="text-3xl mt-1 font-poppins">
                  {activeAmbassadors.length}
                </p>
              </div>
              <p className="bi-person-fill text-5xl mt-1"></p>
            </div>
            <div className="flex justify-between bg2 rounded p-4 h-22 text-white shadow shadow-zinc-950 lg:mb-0 mb-3">
              <div className="">
                <p className="text-gray-300 text-xs uppercase">
                  Total Pending Ambassadors
                </p>
                <p className="text-3xl mt-1 font-poppins">
                  {pendingAmbassadors.length}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 mt-7 gap-x-10">
            <PieCharts
              free={general ? general.subscription_info.free : 0}
              pro={general ? general.subscription_info.pro : 0}
              proPlus={general ? general.subscription_info.proPlus : 0}
            />
            <div className="bg2 rounded p-6">
              <p className="text-white text-xl font-bold">Total Users</p>
              <div className="flex justify-between gap-x-5 mt-14">
                <div className="px-4 py-2 bg-white w-full rounded">
                  <p className="text-2xl font-bold">Free </p>
                  <p className="text-4xl font-extrabold">
                    {general?.subscription_info.free}
                  </p>
                </div>
                <div className="px-4 py-2 bg-white w-full rounded">
                  <p className="text-2xl font-bold">Pro </p>
                  <p className="text-4xl font-extrabold">
                    {general?.subscription_info.pro}
                  </p>
                </div>
                <div className="px-4 py-2 bg-white w-full rounded">
                  <p className="text-2xl font-bold">Pro+ </p>
                  <p className="text-4xl font-extrabold">
                    {general?.subscription_info.proPlus}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Subscription */}
          <div className="grid grid-cols-2">
            <Subscription />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
