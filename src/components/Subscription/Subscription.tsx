import { baseUrl } from "@/services/request";
import axios from "axios";
import { useEffect, useState } from "react";

interface Plan {
  pro: { price: string; plan: "pro" };
  proPlus: { price: string; plan: "pro+" };
}

const Subscription = () => {
  const [subscription, setSubscription] = useState<Plan>();

  const [pro, setPro] = useState<string | number>();
  const [proPlus, setProPlus] = useState<string | number>();

  const [editBtn, setEditBtn] = useState<string>("");

  useEffect(() => {
    axios
      .get<Plan>(`${baseUrl}/api/v1/dashboard/subscription-plan`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setSubscription(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setPro(subscription ? subscription.pro.price : 0);
    setProPlus(subscription ? subscription.proPlus.price : 0);
  }, [subscription]);

  const handleChange = () => {
    const data = {
      plan: editBtn,
      new_price: editBtn === "pro" ? pro : proPlus,
    };

    axios
      .put(`${baseUrl}/api/v1/dashboard/usp`, data, {
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
    <div className="bg2 rounded p-4">
      <div className="">
        <p className="text-gray-400 font-bold mb-5">Subscription Plans</p>

        <div className="grid grid-cols-3 text-white">
          <p className="text-gray-400 text-sm mb-3 w-full">Plan</p>
          <p className="text-gray-400 text-sm mb-3 w-full">Price</p>
          <p className="text-gray-400 text-sm mb-3 w-full">Edit</p>

          {/* Pro */}
          <div className="col-span-3 grid grid-cols-3 secondary-bg mb-2 py-3 px-3 rounded">
            <p className="">Pro</p>
            <p className="">€{subscription?.pro.price}</p>

            <div className="flex gap-x-3">
              {editBtn === "pro" ? (
                <>
                  <input
                    type="number"
                    className="ps-3 text-black font-bold focus:outline-none rounded w-28 h-8"
                    onChange={(e) => setPro(e.currentTarget.value)}
                    value={pro}
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
                  onClick={() => setEditBtn("pro")}
                  className="bi-pen-fill text-blue-500"
                ></button>
              )}
            </div>
          </div>

          {/* Pro + */}
          <div className="col-span-3 grid grid-cols-3 secondary-bg mb-2 py-3 px-3 rounded">
            <p className="">Pro +</p>
            <p className="">€{subscription?.proPlus.price}</p>
            <div className="flex gap-x-3">
              {editBtn === "pro+" ? (
                <>
                  <input
                    type="number"
                    className="ps-3 text-black font-bold focus:outline-none rounded w-28 h-8"
                    onChange={(e) => setProPlus(e.currentTarget.value)}
                    value={proPlus}
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
                  onClick={() => setEditBtn("pro+")}
                  className="bi-pen-fill text-blue-500"
                ></button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Subscription;
