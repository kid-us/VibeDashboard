import { baseUrl } from "@/services/request";
import axios from "axios";
import { useEffect } from "react";

const Subscription = () => {
  useEffect(() => {
    axios
      .get(`${baseUrl}/api/v1/dashboard/subscription-plan`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <p>Subscription</p>
    </div>
  );
};

export default Subscription;
