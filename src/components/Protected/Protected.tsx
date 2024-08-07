// ProtectedComponent.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../services/request";
import Loading from "../Loading/Loading";
import useAuth from "@/store/useAuth";

interface ProtectedProps {
  children: React.ReactNode;
}

const Protected = ({ children }: ProtectedProps) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/v1/dashboard/me`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);

        login(response.data.email, response.data.type);
        setLoading(false);
      })
      .catch(() => {
        navigate("/login");
      });
  }, []);

  return <>{loading ? <Loading /> : children}</>;
};

export default Protected;
