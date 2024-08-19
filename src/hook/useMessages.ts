import { baseUrl } from "@/services/request";
import axios from "axios";
import { useEffect, useState } from "react";

interface Messages {
  email: string;
  id: string;
  message: string;
  username: number;
}

const useMessage = () => {
  const [messages, setMessages] = useState<Messages[]>([]);

  useEffect(() => {
    axios
      .get<Messages[]>(`${baseUrl}/api/v1/dashboard/users-messages`, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      })
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return {
    messages,
  };
};

export default useMessage;
