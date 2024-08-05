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
}

const Materials = () => {
  const [cards, setCards] = useState<Plan>();

  const [metal, setMetal] = useState<string | number>();
  const [bamboo, setBamboo] = useState<string | number>();
  const [paper, setPaper] = useState<string | number>();

  const [editBtn, setEditBtn] = useState<string>("");

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
    setMetal(cards ? cards.metal.price : 0);
    setBamboo(cards ? cards.bamboo.price : 0);
    setPaper(cards ? cards.recycled_paper.price : 0);
  }, [cards]);

  const handleChange = () => {
    const data = {
      material: editBtn,
      new_price:
        editBtn === "metal" ? metal : editBtn === "bamboo" ? bamboo : paper,
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
    <div className="bg2 rounded p-4 mt-4">
      <p className="text-gray-400 font-bold mb-5">Cards</p>

      <div className="grid grid-cols-3 text-white">
        <p className="text-gray-400 text-sm mb-3">Type</p>
        <p className="text-gray-400 text-sm mb-3">Price</p>
        <p className="text-gray-400 text-sm mb-3">Edit</p>

        {/* Metal */}
        <div className="col-span-3 grid grid-cols-3 secondary-bg mb-2 py-3 px-3 rounded">
          <p className="">Metal</p>
          <p className="">€{cards?.metal.price}</p>

          <div className="flex gap-x-3">
            {editBtn === "metal" ? (
              <>
                <input
                  type="number"
                  className="ps-3 text-black font-bold focus:outline-none rounded w-28 h-8"
                  onChange={(e) => setMetal(e.currentTarget.value)}
                  value={metal}
                />
                <button
                  onClick={() => handleChange()}
                  className="bi-check bg-green-500 h-8 rounded px-2 text-xl"
                ></button>

                <button
                  onClick={() => setEditBtn("")}
                  className="bi-x-lg text-red-400"
                ></button>
              </>
            ) : (
              <button
                onClick={() => setEditBtn("metal")}
                className="bi-pen-fill text-blue-500"
              ></button>
            )}
          </div>
        </div>

        {/* Bamboo */}
        <div className="col-span-3 grid grid-cols-3 secondary-bg mb-2 py-3 px-3 rounded">
          <p className="">Bamboo</p>
          <p className="">€{cards?.bamboo.price}</p>
          <div className="flex gap-x-3">
            {editBtn === "bamboo" ? (
              <>
                <input
                  type="number"
                  className="ps-3 text-black font-bold focus:outline-none rounded w-28 h-8"
                  onChange={(e) => setBamboo(e.currentTarget.value)}
                  value={bamboo}
                />
                <button
                  onClick={() => handleChange()}
                  className="bi-check bg-green-500 h-8 rounded px-2 text-xl"
                ></button>

                <button
                  onClick={() => setEditBtn("")}
                  className="bi-x-lg text-red-400"
                ></button>
              </>
            ) : (
              <button
                onClick={() => setEditBtn("bamboo")}
                className="bi-pen-fill text-blue-500"
              ></button>
            )}
          </div>
        </div>

        {/* Recycled */}
        <div className="col-span-3 grid grid-cols-3 secondary-bg mb-2 py-3 px-3 rounded">
          <p className="mb-1">Recycled Paper</p>
          <p className="mb-1">€{cards?.recycled_paper.price}</p>
          <div className="flex gap-x-3">
            {editBtn === "recycled_paper" ? (
              <>
                <input
                  type="number"
                  className="ps-3 text-black font-bold focus:outline-none rounded w-28 h-9"
                  onChange={(e) => setPaper(e.currentTarget.value)}
                  value={paper}
                />
                <button
                  onClick={() => handleChange()}
                  className="bi-check bg-green-500 h-8 rounded px-2 text-xl"
                ></button>

                <button
                  onClick={() => setEditBtn("")}
                  className="bi-x-lg text-red-400"
                ></button>
              </>
            ) : (
              <button
                onClick={() => setEditBtn("recycled_paper")}
                className="bi-pen-fill text-blue-500"
              ></button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Materials;
