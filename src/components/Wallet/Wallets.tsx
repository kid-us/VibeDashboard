import { baseUrl } from "@/services/request";
import axios from "axios";
import { useEffect, useState } from "react";
import { Plan } from "../Materials/Materials";
import useWallets from "@/hook/useWallets";

const Wallets = () => {
  const [wallet, setWallet] = useState<string | number>();
  const [cards, setCards] = useState<Plan>();
  // const [price, setPrice] = useState("");
  const { allWallets } = useWallets();

  useEffect(() => {
    axios
      .get<Plan>(`${baseUrl}/api/v1/dashboard/card-material-pricing`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setCards(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setWallet(cards ? cards.wallet.price : 0);
  }, [cards]);

  const handleChange = (edit: string) => {
    const data = {
      material: edit,
      new_price: wallet,
    };

    axios
      .put(`${baseUrl}/api/v1/dashboard/update-cmp`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        // window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleWalletStatus = (id: string) => {
    axios
      .put(
        `${baseUrl}/api/v1/products/change-wallet-status/${id}`,
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
      {/* Wallet */}
      <p className="mb-1 font-poppins text-gray-400 text-sm">Price</p>
      <div className="col-span-4 lg:col-span-3 grid lg:grid-cols-3 grid-cols-4 secondary-bg mb-2 py-3 px-3 rounded-lg">
        <p className="mb-1 font-poppins text-white">Wallets</p>
        <p className="mb-1 font-poppins text-white">€{cards?.wallet.price}</p>
        <div className="lg:col-span-1 col-span-2 flex gap-x-3">
          <input
            type="number"
            className="ps-3 text-black font-poppins font-bold focus:outline-none rounded w-28 lg:h-8 h-9"
            onChange={(e) => setWallet(e.currentTarget.value)}
            value={wallet}
          />
          <button
            onClick={() => handleChange("wallet")}
            className="bi-check bg-green-500 h-8 rounded px-2 text-xl"
          ></button>
        </div>
      </div>
      {/* Store */}
      <p className="font-poppins my-4 text-gray-400 text-sm">
        Change Wallet's Status
      </p>
      <div className="col-span-4 lg:col-span-3 grid lg:grid-cols-3 grid-cols-4 secondary-bg mb-2 py-3 px-3 rounded-lg">
        {allWallets.map((wal) => (
          <>
            <div className="mb-3">
              <img src={wal.image} alt="wallet" className="w-20 rounded" />
            </div>
            <p className="text-white mt-8 font-poppins">{wal.status}</p>
            <div className="mt-5">
              <button
                onClick={() => handleWalletStatus(wal.wallet_id)}
                className="text-white font-poppins bg-green-500 rounded text-sm p-3 w-full"
              >
                Change Status
              </button>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default Wallets;
