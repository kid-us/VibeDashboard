import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { baseUrl } from "../../services/request";
import useDocumentTitle from "@/hook/useDocumentTitle";
import Button from "../Button/Button";
import useAuth from "@/store/useAuth";

const schema = z.object({
  password: z.string().min(4, {
    message: "Password required.",
  }),
  email: z.string().email({ message: "Email is required." }),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const [title] = useState("Login");
  useDocumentTitle(title);

  const { login } = useAuth();

  const navigate = useNavigate();
  // States
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const [passwordType, setPasswordType] = useState(true);

  // Form Data and Validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  // On Form Submit
  const onSubmit = (data: FieldValues) => {
    setLoader(true);
    axios
      .post(`${baseUrl}/api/v1/auth/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then(() => {
        axios
          .get(`${baseUrl}/api/v1/auth/me`, {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          })
          .then((response) => {
            login(response.data.username);
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
        if (error.response.status === 401) {
          setLoginError("Invalid Email and Password");
        }
      });
  };

  return (
    <>
      <div className="lg:px-40 md:px-36 px-2 h-[100vh]">
        <div className="flex justify-center w-full h-full items-center">
          <div className="lg:w-[40%] w-full">
            <div className="lg:p-10 md:p-9 p-8 shadow-lg secondary-bg rounded-lg text-white border border-violet-800 mb-3">
              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Login error */}
                {loginError !== "" && (
                  <div className="relative">
                    <p className="absolute -top-10 text-red-600 text-sm">
                      <span className="bi-exclamation-triangle-fill me-4"></span>
                      {loginError}
                    </p>
                  </div>
                )}
                {/* Email */}
                <div className="mb-5">
                  <label
                    className="text-sm text-gray-500 block"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    name="email"
                    className="text-black font-poppins text-sm w-full py-3 mt-2 bg-gray-100 rounded-lg focus:outline-none px-5 shadow shadow-gray-300"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-xs pt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="mb-10 relative">
                  <label
                    className="text-sm text-gray-500 block"
                    htmlFor="password"
                  >
                    Password
                  </label>

                  <input
                    {...register("password")}
                    type={passwordType ? "password" : "text"}
                    name="password"
                    className="text-black font-poppins text-sm w-full py-3 mt-2 bg-gray-100 rounded-lg focus:outline-none px-5 shadow shadow-gray-300"
                  />
                  <span
                    onClick={() => {
                      setShowPassword(!showPassword);
                      setPasswordType(!passwordType);
                    }}
                    className={`absolute ${
                      showPassword ? "bi-eye" : "bi-eye-slash"
                    } right-2 top-9 cursor-pointer text-black px-2 text-lg border-l border-gray-500`}
                  ></span>
                  {errors.password && (
                    <p className="text-red-600 text-xs pt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Button */}
                <Button loader={loader} label="Login" />
              </form>
              <div className="relative lg:block hidden lg:-top-64 left-[30em] -top-40">
                <div className="absolute lg:right-[15em] w-full right-36 top-40 bulb"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
