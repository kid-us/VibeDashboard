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

          <div className="lg:grid grid-cols-2 gap-x-5 px-2 mt-5">
            {wallets.length > 0 ? (
              wallets.map((order) => (
                <div
                  key={order.order_id}
                  className="lg:grid grid-cols-5 bg-gray-800 mb-5 rounded py-6 gap-x-10"
                >
                  {/* Delivery Data */}
                  <div className="col-span-2 lg:p-2 p-5">
                    {/* Wallet */}
                    <div className="">
                      {order.wallets.map((wal) => (
                        <img
                          key={wal.wallet_id}
                          src={getWalletImg(wal.wallet_id)}
                          alt="wallet"
                          className="rounded"
                        />
                      ))}
                      <div className="text-white mt-5">
                        <p>Ordered Date: {getDate(order.created_at)}</p>
                        {order.wallets.map((w) => (
                          <p key={w.wallet_id}>Quantity : {w.quantity}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Delivery */}
                  <div className="col-span-3 lg:p-0 px-5">
                    <div className="text-white">
                      <p className="lg:font-bold lg:text-xl text-xs text-white mb-2">
                        Delivery Information
                      </p>
                      <div className="grid grid-cols-5">
                        <p className="mb-2 col-span-2 font-poppins text-gray-400 font-bold text-sm">
                          First Name
                        </p>
                        <p className="col-span-3 uppercase text-sm">
                          {order.order_metadata.fname}
                        </p>

                        <p className="mb-2 col-span-2 font-poppins text-gray-400 font-bold text-sm">
                          Last Name
                        </p>
                        <p className="col-span-3 uppercase font-poppins text-sm">
                          {order.order_metadata.lname}
                        </p>

                        <p className="mb-2 col-span-2 font-poppins text-gray-400 font-bold text-sm">
                          Email
                        </p>
                        <p className="col-span-3 uppercase font-poppins text-sm">
                          {order.order_metadata.email}
                        </p>

                        <p className="mb-2 col-span-2 font-poppins text-gray-400 font-bold text-sm">
                          Location
                        </p>
                        <p className="col-span-3 uppercase font-poppins text-sm">
                          {order.order_metadata.location}
                        </p>

                        <p className="mb-2 col-span-2 font-poppins text-gray-400 font-bold text-sm">
                          Phone
                        </p>
                        <p className="col-span-3 uppercase font-poppins text-sm">
                          {order.order_metadata.phone}
                        </p>

                        <p className="mb-2 col-span-2 font-poppins text-gray-400 font-bold text-sm">
                          Street
                        </p>
                        <p className="col-span-3 uppercase font-poppins text-sm">
                          {order.order_metadata.street}
                        </p>

                        <p className="mb-2 col-span-2 font-poppins text-gray-400 font-bold text-sm">
                          Street No
                        </p>
                        <p className="col-span-3 uppercase font-poppins text-sm">
                          {order.order_metadata.street_no}
                        </p>

                        <p className="mb-2 col-span-2 font-poppins text-gray-400 font-bold text-sm">
                          Address
                        </p>
                        <p className="col-span-3 uppercase font-poppins text-sm">
                          {order.order_metadata.address}
                        </p>

                        <p className="mb-2 col-span-2 font-poppins text-gray-400">
                          PLZ
                        </p>
                        <p className="col-span-3 uppercase font-poppins text-sm">
                          {order.order_metadata.plz}
                        </p>
                      </div>
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
