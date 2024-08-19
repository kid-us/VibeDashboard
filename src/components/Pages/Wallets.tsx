import { baseUrl } from "@/services/request";
import axios from "axios";
import { useEffect, useState } from "react";
import SmallNavbar from "../Dashboard/SmallNav";
import Sidebar from "../Dashboard/Sidebar";
import Nav from "../Dashboard/Nav";
import useDocumentTitle from "@/hook/useDocumentTitle";
import Loading from "../Loading/Loading";
import useWallets from "@/hook/useWallets";

interface Delivery {
  address: string;
  email: string;
  fname: string;
  lname: string;
  location: string;
  phone: string;
  plz: string;
  street: string;
  street_no: string;
}

interface Wallet {
  wallet_id: string;
  quantity: number | string;
}

interface GetWallets {
  created_at: string;
  order_id: string;
  order_metadata: Delivery;
  payment_status: string;
  wallets: Wallet[];
}

interface All {
  wallet_orders: GetWallets[];
}

const Wallets = () => {
  const [title] = useState("Wallets");
  useDocumentTitle(title);

  const { allWallets } = useWallets();

  const [wallets, setWallets] = useState<GetWallets[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get<All>(`${baseUrl}/api/v1/products/wallet-orders`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setWallets(response.data.wallet_orders);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  const getWalletImg = (id: string) => {
    const wallet = allWallets.find((wal) => wal.wallet_id === id);
    return wallet ? wallet.image : "default-image.png";
  };

  function getDate(timestamp: string) {
    const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  return (
    <>
      {loading && <Loading />}
      <div className="relative lg:grid md:grid grid-cols-11">
        {/* Small device Navbar */}
        <SmallNavbar active="Wallets" />
        {/* Sidebar */}
        <div className="lg:col-span-2 w-full">
          {/* <div className=""> */}
          <Sidebar active="Wallets" />
          {/* </div> */}
        </div>
        <div className="lg:col-span-9 lg:px-2 md:px-2 px-1 py-2 md:col-span-10">
          {/* Nav */}
          <Nav />

          {/* Contents */}
          <h1 className="text-white text-xl my-3 ms-1">Wallets</h1>

          <div className="lg:grid grid-cols-2 gap-x-5 mt-5">
            {wallets.length > 0 ? (
              wallets.map((order) => (
                <div
                  key={order.order_id}
                  className="grid lg:grid-cols-5 md:grid-cols-5 grid-cols-1 bg-gray-800 mb-5 rounded lg:p-6 gap-x-10"
                >
                  {/* Delivery Data */}
                  <div className="lg:col-span-2 md:col-span-2 col-span-5 lg:p-2 p-5">
                    {/* Wallet */}
                    <div>
                      <p className="font-poppins lg:text-xs text-sm text-white mb-4">
                        Ordered Date: {getDate(order.created_at)}
                      </p>
                      {order.wallets.map((wal) => (
                        <>
                          <img
                            key={wal.wallet_id}
                            src={getWalletImg(wal.wallet_id)}
                            alt="wallet"
                            className="rounded mb-1 w-full"
                          />
                          <div className="text-white mb-3">
                            <p
                              className="font-poppins text-sm"
                              key={wal.wallet_id}
                            >
                              Quantity : {wal.quantity}
                            </p>
                          </div>
                        </>
                      ))}
                    </div>
                    <button className="lg:hidden md:block hidden bg-green-500 w-full rounded font-poppins h-11 text-white shadow shadow-zinc-900">
                      Delivered
                    </button>
                  </div>

                  {/* Delivery */}
                  <div className="lg:col-span-3 md:col-span-3 col-span-5 lg:p-0 px-5">
                    <div className="text-white">
                      <p className="font-poppins lg:text-lg text-white mb-2 md:mt-5 lg:mt-0">
                        Delivery Information
                      </p>
                      <div className="grid grid-cols-5 mt-4">
                        <p className="mb-2 col-span-2 font-poppins text-gray-400 text-sm">
                          First Name
                        </p>
                        <p className="col-span-3 font-bold font-poppins text-sm">
                          {order.order_metadata.fname}
                        </p>

                        <p className="mb-2 col-span-2 font-poppins text-gray-400 text-sm">
                          Last Name
                        </p>
                        <p className="col-span-3 font-bold font-poppins text-sm">
                          {order.order_metadata.lname}
                        </p>

                        <p className="mb-2 col-span-2 font-poppins text-gray-400 text-sm">
                          Email
                        </p>
                        <p className="col-span-3 font-bold font-poppins text-sm">
                          {order.order_metadata.email}
                        </p>

                        <p className="mb-2 col-span-2 font-poppins text-gray-400 text-sm">
                          Location
                        </p>
                        <p className="col-span-3 font-bold font-poppins text-sm">
                          {order.order_metadata.location}
                        </p>

                        <p className="mb-2 col-span-2 font-poppins text-gray-400 text-sm">
                          Phone
                        </p>
                        <p className="col-span-3 font-bold font-poppins text-sm">
                          {order.order_metadata.phone}
                        </p>

                        <p className="mb-2 col-span-2 font-poppins text-gray-400 text-sm">
                          Street
                        </p>
                        <p className="col-span-3 font-bold font-poppins text-sm">
                          {order.order_metadata.street}
                        </p>

                        <p className="mb-2 col-span-2 font-poppins text-gray-400 text-sm">
                          Street No
                        </p>
                        <p className="col-span-3 font-bold font-poppins text-sm">
                          {order.order_metadata.street_no}
                        </p>

                        <p className="mb-2 col-span-2 font-poppins text-gray-400 text-sm">
                          Address
                        </p>
                        <p className="col-span-3 font-bold font-poppins text-sm">
                          {order.order_metadata.address}
                        </p>

                        <p className="mb-2 col-span-2 font-poppins text-gray-400 text-sm">
                          PLZ
                        </p>
                        <p className="col-span-3 font-bold font-poppins text-sm">
                          {order.order_metadata.plz}
                        </p>
                      </div>
                      <button className="md:hidden lg:hidden bg-green-500 w-full rounded font-poppins h-11 text-white shadow shadow-zinc-900 mb-3 mt-2">
                        Delivered
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="w-full bg-white text-center py-3 text-sm">
                List of wallet orders will be here!
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Wallets;
