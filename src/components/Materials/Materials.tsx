import { baseUrl } from "@/services/request";
import axios from "axios";
import { useEffect, useState } from "react";

interface Plan {
  metal: {
    price: number;
    material: string;
  };
  bamboo: {
    price: number;
    material: string;
  };
  recycled_paper: {
    price: number;
    material: string;
  };
  wallet: {
    price: number;
    material: string;
  };
}

const Materials = () => {
  const [cards, setCards] = useState<Plan>();

  const [metal, setMetal] = useState<string | number>();
  const [bamboo, setBamboo] = useState<string | number>();
  const [paper, setPaper] = useState<string | number>();
  const [wallet, setWallet] = useState<string | number>();

  useEffect(() => {
    axios
      .get<Plan>(`${baseUrl}/api/v1/dashboard/card-material-pricing`, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
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
    setMetal(cards ? cards.metal.price : 0);
    setBamboo(cards ? cards.bamboo.price : 0);
    setPaper(cards ? cards.recycled_paper.price : 0);
    setWallet(cards ? cards.wallet.price : 0);
  }, [cards]);

  const handleChange = (edit: string) => {
    const data = {
      material: edit,
      new_price:
        edit === "metal"
          ? metal
          : edit === "bamboo"
          ? bamboo
          : edit === "recycled_paper"
          ? paper
          : wallet,
    };

    axios
      .put(`${baseUrl}/api/v1/dashboard/update-cmp`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="bg2 rounded-lg lg:p-4 p-2">
      <div className="grid lg:grid-cols-3 grid-cols-4 text-white">
        <p className="text-gray-400 text-sm mb-5 font-poppins">Type</p>
        <p className="text-gray-400 text-sm mb-5 font-poppins">Price</p>
        <p className="text-gray-400 text-sm mb-5 font-poppins">Edit</p>

        {/* Metal */}
        <div className="col-span-4 lg:col-span-3 grid lg:grid-cols-3 grid-cols-4 secondary-bg mb-2 py-3 px-2 rounded-lg">
          <p className="font-poppins">Metal</p>
          <p className="font-poppins">€{cards?.metal.price}</p>
          <div className="lg:col-span-1 col-span-2 flex gap-x-2">
            <>
              <input
                type="number"
                className="ps-3 text-black font-bold font-poppins focus:outline-none rounded w-28 lg:h-8 h-9"
                onChange={(e) => setMetal(e.currentTarget.value)}
                value={metal}
              />
              <button
                onClick={() => handleChange("metal")}
                className="bi-check bg-green-500 lg:h-8 h-9 rounded px-2 text-xl"
              ></button>
            </>
          </div>
        </div>

        {/* Bamboo */}
        <div className="col-span-4 lg:col-span-3 grid lg:grid-cols-3 grid-cols-4 secondary-bg mb-2 py-3 px-2 rounded-lg">
          <p className="font-poppins">Bamboo</p>
          <p className="font-poppins">€{cards?.bamboo.price}</p>
          <div className="lg:col-span-1 col-span-2 flex gap-x-2">
            <input
              type="number"
              className="ps-3 text-black font-poppins font-bold focus:outline-none rounded w-28 lg:h-8 h-9"
              onChange={(e) => setBamboo(e.currentTarget.value)}
              value={bamboo}
            />
            <button
              onClick={() => handleChange("bamboo")}
              className="bi-check bg-green-500 lg:h-8 h-9 rounded px-2 text-xl"
            ></button>
          </div>
        </div>

        {/* Recycled */}
        <div className="col-span-4 lg:col-span-3 grid lg:grid-cols-3 grid-cols-4 secondary-bg mb-2 py-3 px-2 rounded-lg">
          <p className="mb-1 font-poppins">PVC</p>
          <p className="mb-1 font-poppins">€{cards?.recycled_paper.price}</p>
          <div className="lg:col-span-1 col-span-2 flex gap-x-2">
            <input
              type="number"
              className="ps-3 text-black font-poppins font-bold focus:outline-none rounded w-28 lg:h-8 h-9"
              onChange={(e) => setPaper(e.currentTarget.value)}
              value={paper}
            />
            <button
              onClick={() => handleChange("recycled_paper")}
              className="bi-check bg-green-500 lg:h-8 h-9 rounded px-2 text-xl"
            ></button>
          </div>
        </div>

        {/* Wallet */}
        <div className="col-span-4 lg:col-span-3 grid lg:grid-cols-3 grid-cols-4 secondary-bg mb-2 py-3 px-3 rounded-lg">
          <p className="mb-1 font-poppins">Wallets</p>
          <p className="mb-1 font-poppins font-bold">€{cards?.wallet.price}</p>
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
      </div>
    </div>
  );
};

export default Materials;
