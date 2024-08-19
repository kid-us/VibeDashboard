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

  useEffect(() => {
    axios
      .get<Plan>(`${baseUrl}/api/v1/dashboard/subscription-plan`, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
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

  const handleChange = (edit: string) => {
    const data = {
      plan: edit,
      new_price: edit === "pro" ? pro : proPlus,
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
    <div className="bg2 rounded-lg py-4 lg:px-4 px-2">
      <div className="grid lg:grid-cols-3 grid-cols-4 text-white">
        <p className="text-gray-400 text-sm w-full font-poppins mb-5">Plan</p>
        <p className="text-gray-400 text-sm w-full font-poppins mb-5">Price</p>
        <p className="text-gray-400 text-sm w-full font-poppins mb-5">Edit</p>

        {/* Pro */}
        <div className="lg:col-span-3 col-span-4 grid lg:grid-cols-3 grid-cols-4 secondary-bg mb-2 py-3 px-3 rounded-lg">
          <p className="font-poppins">Pro</p>
          <p className="font-poppins">€{subscription?.pro.price}</p>

          <div className="flex gap-x-3">
            <>
              <input
                type="number"
                className="ps-3 text-black font-poppins font-bold focus:outline-none rounded w-28 lg:h-8 h-9"
                onChange={(e) => setPro(e.currentTarget.value)}
                value={pro}
              />
              <button
                onClick={() => handleChange("pro")}
                className="bi-check bg-green-500 lg:h-8 h-9 rounded px-2 text-xl"
              ></button>
            </>
          </div>
        </div>

        {/* Pro + */}
        <div className="lg:col-span-3 col-span-4 grid lg:grid-cols-3 grid-cols-4 secondary-bg mb-2 py-3 px-3 rounded-lg">
          <p className="font-poppins">Pro +</p>
          <p className="font-poppins">€{subscription?.proPlus.price}</p>
          <div className="flex gap-x-3">
            <>
              <input
                type="number"
                className="ps-3 font-poppins text-black font-bold focus:outline-none rounded w-28 lg:h-8 h-9"
                onChange={(e) => setProPlus(e.currentTarget.value)}
                value={proPlus}
              />
              <button
                onClick={() => handleChange("proPlus")}
                className="bi-check bg-green-500 lg:h-8 h-9 rounded px-2 text-xl"
              ></button>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
