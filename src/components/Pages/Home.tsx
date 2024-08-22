import { useEffect, useState } from "react";
import Nav from "../Dashboard/Nav";
import Sidebar from "../Dashboard/Sidebar";
import SmallNavbar from "../Dashboard/SmallNav";
import useAmbassadors from "@/hook/useAmbassadors";
import axios from "axios";
import { baseUrl } from "@/services/request";
import Subscription from "../Subscription/Subscription";
import Materials from "../Materials/Materials";
import useDocumentTitle from "@/hook/useDocumentTitle";
import Loading from "../Loading/Loading";
import Wallets from "../Wallet/Wallets";

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
  const { activeAmbassadors, pendingAmbassadors } = useAmbassadors();
  const [general, setGeneral] = useState<General>();
  const [loading, setLoading] = useState<boolean>(true);
  const [cards, setCards] = useState<string[]>([]);
  const [material, setMaterial] = useState<string>("");

  useEffect(() => {
    axios
      .get<General>(`${baseUrl}/api/v1/dashboard/general`, {
        headers: {
          "Content-Type": "application/json",
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

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/v1/products/available-materials`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setCards(response.data.materials);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Remove Material
  const handleRemoveMaterial = (material: string) => {
    axios
      .delete(
        `${baseUrl}/api/v1/products/remove-material?material=${material}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Add Material
  const handleAddMaterial = () => {
    axios
      .post(
        `${baseUrl}/api/v1/products/add-material?material=${material}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        <div className="lg:col-span-9 lg:px-4 md:px-2 px-2 py-2 md:col-span-10">
          {/* Nav */}
          <Nav />

          <p className="text-white font-poppins text-lg mt-2">Analytics</p>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 mt-5 gap-x-6">
            {/* Total Users */}
            <div className="bg2 w-full p-4 rounded-lg shadow shadow-zinc-700 lg:mb-0 mb-5 ps-6">
              <p className="font-poppins text-gray-400">Total User</p>
              <div className="flex justify-between mt-4">
                <p className="text-4xl font-bold mt-1 font-poppins text-white">
                  {general?.number_of_total_users}
                </p>
                <p className="font-poppins bi-person-fill text-5xl text-teal-500 me-4"></p>
              </div>
            </div>

            {/* Total Generated Cards */}
            <div className="bg2 w-full p-4 rounded-lg shadow shadow-zinc-700 lg:mb-0 mb-5 ps-6">
              <p className="font-poppins text-gray-400">
                Total Generated Cards
              </p>
              <div className="flex justify-between mt-4">
                <p className="text-4xl font-bold mt-1 font-poppins text-white">
                  {general?.number_of_cards}
                </p>
                <p className="bi-credit-card-2-front-fill text-5xl mt-1 text-teal-500 me-4"></p>
              </div>
            </div>

            {/* Total Approved Ambassadors */}
            <div className="bg2 w-full p-4 rounded-lg shadow shadow-zinc-700 lg:mb-0 mb-5 ps-6">
              <p className="font-poppins text-gray-400">
                Total Approved Ambassadors
              </p>
              <div className="flex justify-between mt-4">
                <p className="text-4xl mt-1 font-bold font-poppins text-white">
                  {activeAmbassadors.length}
                </p>
                <p className="bi-person-heart text-5xl mt-1 text-teal-500 me-4"></p>
              </div>
            </div>

            {/* Total Pending Ambassador */}
            <div className="bg2 w-full p-5 rounded-lg shadow shadow-zinc-700 lg:mb-0 mb-5 lg:mt-5">
              <p className="font-poppins text-gray-400">
                Total Pending Ambassadors
              </p>
              <div className="flex justify-between mt-4">
                <p className="text-4xl mt-1 font-bold text-white">
                  {pendingAmbassadors.length}
                </p>
                <p className="bi-person-heart text-5xl mt-1 text-teal-500 me-4"></p>
              </div>
            </div>

            {/* Free Subscribers */}
            <div className="bg2 w-full p-5 rounded-lg shadow shadow-zinc-700 lg:mb-0 mb-5 lg:mt-5">
              <p className="font-poppins text-gray-400">Free Subscribers</p>
              <div className="flex justify-between mt-4">
                <p className="text-4xl mt-1 font-bold font-poppins text-white">
                  {general?.subscription_info.free}
                </p>
                <p className="bi-person text-5xl mt-1 text-teal-500 me-4"></p>
              </div>
            </div>

            {/* Pro Subscribers */}
            <div className="bg2 w-full p-5 rounded-lg shadow shadow-zinc-700 lg:mb-0 mb-5 lg:mt-5">
              <p className="font-poppins text-gray-400">Pro Subscribers</p>
              <div className="flex justify-between mt-4">
                <p className="text-4xl font-bold mt-1 font-poppins text-white">
                  {general?.subscription_info.pro}
                </p>
                <p className="bi-person text-5xl mt-1 text-teal-500 me-4"></p>
              </div>
            </div>

            {/* Pro Plus Subscribers */}
            <div className="bg2 w-full p-5 rounded-lg shadow shadow-zinc-700 lg:mb-0 mb-5 lg:mt-5">
              <p className="font-poppins text-gray-400">Pro + Subscribers</p>
              <div className="flex justify-between mt-4">
                <p className="text-4xl mt-1 font-bold font-poppins text-white">
                  {general?.subscription_info.proPlus}
                </p>
                <p className="bi-person text-5xl mt-1 text-teal-500 me-4"></p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 lg:mt-7 mt-4 gap-x-5">
            {/* Subscription */}
            <div className="md:mb-4">
              <p className="text-white font-poppins mb-5">Subscription Plans</p>
              <Subscription />

              <p className="text-white font-poppins my-5">Wallets</p>
              <Wallets />
            </div>

            {/* Materials */}
            <div>
              <p className="text-white font-poppins mb-5">Products</p>
              <Materials />
              <div className="grid grid-cols-4 gap-x-5 my-5">
                <div className="lg:col-span-2 col-span-4">
                  <p className="text-white font-poppins mb-3">Available Card</p>
                  <div className="secondary-bg text-white p-4 rounded-xl">
                    {cards.length > 0 ? (
                      cards.map((c) => (
                        <div className="flex justify-between mb-2">
                          <p className="font-poppins first-letter:uppercase">
                            {c}
                          </p>
                          <button
                            onClick={() => handleRemoveMaterial(c)}
                            className="bg-red-500 bi-trash tex-sm rounded w-8 h-8"
                          ></button>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm font-poppins py-4">
                        There no available card material
                      </p>
                    )}
                  </div>
                </div>
                <div className="lg:col-span-2 col-span-4">
                  <p className="text-white font-poppins mb-3 lg:mt-0 mt-4">
                    Add Material
                  </p>
                  <div className="secondary-bg text-white p-4 rounded-xl">
                    <select
                      onChange={(e) => setMaterial(e.currentTarget.value)}
                      name="material"
                      className="w-full focus:outline-none rounded h-10 text-black font-poppins ps-2 text-sm"
                    >
                      <option selected hidden>
                        Choose material
                      </option>
                      <option value="bamboo">Bamboo</option>
                      <option value="metal">Metal</option>
                      <option value="recycled_paper">PVC</option>
                    </select>
                    <button
                      onClick={() => handleAddMaterial()}
                      className="bg-green-500 w-full rounded font-poppins mt-2 h-9"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
