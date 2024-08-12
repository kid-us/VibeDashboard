import { useState } from "react";
import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { baseUrl } from "../../services/request";
import Button from "../Button/Button";
import useAuth from "@/store/useAuth";

interface Props {
  onClose: () => void;
}

const schema = z.object({
  password: z.string().min(4, {
    message: "Password required.",
  }),
  email: z.string().email({ message: "Email is required." }),
});

type FormData = z.infer<typeof schema>;

const Setting = ({ onClose }: Props) => {
  const { type } = useAuth();

  const [approved, setApproved] = useState(false);
  const [updateError, setUpdateError] = useState<boolean>(false);
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

    const updateData = {
      email: data.email,
      password: data.password,
    };

    if (type === "super_admin") {
      axios
        .put(
          `${baseUrl}/api/v1/dashboard/update-super-admin-password`,
          updateData,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        )

        .then(() => {
          setApproved(true);
        })
        .catch((error) => {
          setLoader(false);
          setUpdateError(true);
          console.log(error);
        });
    } else {
      axios
        .put(`${baseUrl}/api/v1/dashboard/update-admin-password`, updateData, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })

        .then(() => {
          setApproved(true);
        })
        .catch((error) => {
          setLoader(false);
          setUpdateError(true);
          console.log(error);
        });
    }
  };

  return (
    <>
      <div className="overlay w-full z-50"></div>
      <div className="fixed w-full z-50 top-0 left-0">
        <div className="flex justify-center items-center h-[100vh]">
          <div className="p-8 secondary-bg rounded lg:w-[33%] w-full lg:mx-0 mx-3 lg:px-20">
            {!approved ? (
              <>
                <form onSubmit={handleSubmit(onSubmit)} className="relative">
                  <p
                    onClick={() => onClose()}
                    className="bi-x absolute -top-10 text-xl lg:-right-16 right-0 text-white cursor-pointer"
                  ></p>

                  {/* Login error */}
                  {updateError && (
                    <div className="relative">
                      <p className="absolute -top-9 text-white bg-red-500 w-full rounded p-1 text-sm">
                        <span className="bi-exclamation-triangle-fill me-4"></span>
                        Something went wrong try again
                      </p>
                    </div>
                  )}
                  {/* Email */}
                  <div className="my-5">
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
              </>
            ) : (
              <div className="text-center mt-4">
                <p className="bi-check-circle-fill text-green-500 text-4xl"></p>
                <p className="text-white mt-5 text-xl chakra first-letter:uppercase">
                  Account Changed Successfully!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
