import { baseUrl } from "@/services/request";
import axios from "axios";
import { useEffect, useState } from "react";

interface Wallets {
  color: string;
  description: string;
  image: string;
  price: number;
  size: string;
  wallet_id: string;
  name: string;
}

interface All {
  wallets: Wallets[];
}

const useWallets = () => {
  const [allWallets, setAllWallets] = useState<Wallets[]>([]);

  useEffect(() => {
    axios
      .get<All>(`${baseUrl}/api/v1/products/get-wallets`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setAllWallets(response.data.wallets);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return {
    allWallets,
  };
};

export default useWallets;
