import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "@/services/request";

export interface Ambassadors {
  first_name: string;
  last_name: string;
  email: string;
  tiktoc: string;
  twich: string;
  instagram: string;
  facebook: string;
  twitter: string;
  youtube: string;
  linkedin: string;
  website: string;
  earnings: number;
  uid: string;
  verified: boolean;
  referral_code: string;
}

const useAmbassadors = () => {
  const [activeAmbassadors, setActiveAmbassadors] = useState<Ambassadors[]>([]);
  const [pendingAmbassadors, setPendingAmbassadors] = useState<Ambassadors[]>(
    []
  );

  useEffect(() => {
    // Fetch Active Ambassadors
    const fetchActiveAmbassadors = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/v1/ambassador/get-active`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setActiveAmbassadors(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch Pending Ambassadors
    const fetchPendingAmbassadors = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/v1/ambassador/get-pendings`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setPendingAmbassadors(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPendingAmbassadors();
    fetchActiveAmbassadors();
  }, []);

  return {
    activeAmbassadors,
    pendingAmbassadors,
  };
};

export default useAmbassadors;
