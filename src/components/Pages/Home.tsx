import { useEffect, useState } from "react";
import Nav from "../Dashboard/Nav";
import Sidebar from "../Dashboard/Sidebar";
import SmallNavbar from "../Dashboard/SmallNav";
import useAmbassadors from "@/hook/useAmbassadors";
import axios from "axios";
import { baseUrl } from "@/services/request";
import PieCharts from "../Charts/PieChart";
import Subscription from "../Subscription/Subscription";
import Materials from "../Materials/Materials";
import useDocumentTitle from "@/hook/useDocumentTitle";
import Loading from "../Loading/Loading";

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
  const [title] = useState("Vibecard - Dashboard");
  useDocumentTitle(title);

  const [general, setGeneral] = useState<General>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get<General>(`${baseUrl}/api/v1/dashboard/general`, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      })
      .then((response) => {
        setGeneral(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const { activeAmbassadors, pendingAmbassadors } = useAmbassadors();
  return (
    <>
      {loading && <Loading />}
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
              <p className="bi-person-fill text-5xl mt-1 text-teal-500"></p>
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
              <p className="bi-credit-card-2-front-fill text-5xl mt-1 text-teal-500"></p>
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
              <p className="bi-person-heart text-5xl mt-1 text-teal-500"></p>
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
              <p className="bi-person-heart text-5xl mt-1 text-teal-500"></p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 lg:mt-7 mt-2 gap-x-5">
            <PieCharts
              free={general ? general.subscription_info.free : 0}
              pro={general ? general.subscription_info.pro : 0}
              proPlus={general ? general.subscription_info.proPlus : 0}
            />
            <div className="bg2 rounded lg:p-6 p-4">
              <p className="text-white text-xl font-bold">Total Users</p>
              <div className="flex justify-between gap-x-2 lg:mt-14 mt-4">
                <div className="px-4 py-2 bg-white w-full rounded">
                  <p className="lg:text-2xl">Free </p>
                  <p className="lg:text-4xl text-xl font-extrabold">
                    {general?.subscription_info.free}
                  </p>
                </div>
                <div className="px-4 py-2 bg-white w-full rounded">
                  <p className="lg:text-2xl">Pro </p>
                  <p className="lg:text-4xl text-xl font-extrabold">
                    {general?.subscription_info.pro}
                  </p>
                </div>
                <div className="px-4 py-2 bg-white w-full rounded">
                  <p className="lg:text-2xl">Pro+ </p>
                  <p className="lg:text-4xl text-xl font-extrabold">
                    {general?.subscription_info.proPlus}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 lg:mt-7 mt-4 gap-x-5">
            {/* Subscription */}
            <Subscription />
            {/* Materials */}
            <Materials />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
