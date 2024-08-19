import { useEffect, useState } from "react";
import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { baseUrl } from "../../services/request";
import Button from "../Button/Button";
import SmallNavbar from "../Dashboard/SmallNav";
import Sidebar from "../Dashboard/Sidebar";
import Nav from "../Dashboard/Nav";
import Delete from "../Modal/Delete";
import useDocumentTitle from "@/hook/useDocumentTitle";
import Loading from "../Loading/Loading";

interface Admins {
  email: string;
  status: string;
  type: string;
}

const schema = z.object({
  password: z.string().min(4, {
    message: "Password required.",
  }),
  email: z.string().email({ message: "Email is required." }),
});

type FormData = z.infer<typeof schema>;

const Forms = () => {
  const [title] = useState("Forms");
  useDocumentTitle(title);

  const [admins, setAdmins] = useState<Admins[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  // States
  const [updateError, setUpdateError] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const [passwordType, setPasswordType] = useState(true);

  const [onDelete, setOnDelete] = useState<boolean>(false);
  const [onDeleteEmail, setOnDeleteEmail] = useState<string>("");

  // Form Data and Validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    axios
      .get<Admins[]>(`${baseUrl}/api/v1/dashboard/get-admins`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setAdmins(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // On Form Submit
  const onSubmit = (data: FieldValues) => {
    setLoader(true);
    axios
      .post(`${baseUrl}//api/v1/dashboard/create-admin`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })

      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        setLoader(false);
        setUpdateError(true);
        console.log(error);
      });
  };

  // onDelete
  const handelAdmin = (email: string, url: string) => {
    axios
      .put(`${baseUrl}/api/v1/dashboard/${url}/${email}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })

      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        setLoader(false);
        setUpdateError(true);
        console.log(error);
      });
  };

  return (
    <>
      {loading && <Loading />}
      {onDelete && (
        <Delete
          name="Admin"
          url={`/api/v1/dashboard/delete-admin/${onDeleteEmail}`}
          onDelete={() => {
            setOnDelete(false);
            setOnDeleteEmail("");
          }}
        />
      )}

      <div className="relative lg:grid md:grid grid-cols-11">
        {/* Small device Navbar */}
        <SmallNavbar active="Forms" />
        {/* Sidebar */}
        <div className="lg:col-span-2 w-full">
          {/* <div className=""> */}
          <Sidebar active="Forms" />
          {/* </div> */}
        </div>
        <div className="lg:col-span-9 lg:px-2 md:px-2 px-2 py-3 md:col-span-10">
          {/* Nav */}
          <Nav />

          {/* Admins */}
          <div className="mt-4 text-white lg:px-2">
            <p className="text-white font-poppins">Admins</p>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-x-4 mt-4">
              {admins.map((admin, index) => (
                <div key={index} className="bg2 rounded p-5 py-6 lg:mb-0 mb-4">
                  <p className="font-bold uppercase font-poppins">
                    Admin {index + 1}
                  </p>
                  <p className="text-sm mt-4 font-poppins">
                    Email : {admin.email}
                  </p>
                  <p className="text-sm mb-4 font-poppins">
                    Status :{" "}
                    <span
                      className={`first-letter:uppercase ${
                        admin.status === "active"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {admin.status}
                    </span>{" "}
                  </p>

                  <div className="flex justify-between gap-x-4 mt-3">
                    <p
                      onClick={() => {
                        setOnDelete(true);
                        setOnDeleteEmail(admin.email);
                      }}
                      className="cursor-pointer shadow shadow-zinc-900 text-center bg-red-500 text-xs rounded w-full py-2 font-poppins"
                    >
                      Delete
                    </p>
                    {admin.status === "active" ? (
                      <p
                        onClick={() =>
                          handelAdmin(admin.email, "deactivate-admin")
                        }
                        className="cursor-pointer shadow shadow-zinc-900 text-center bg-blue-500 text-xs rounded w-full py-2 font-poppins"
                      >
                        Deactivate
                      </p>
                    ) : (
                      <p
                        onClick={() =>
                          handelAdmin(admin.email, "activate-admin")
                        }
                        className="cursor-pointer shadow shadow-zinc-900 text-center bg-green-500 text-xs rounded w-full py-2"
                      >
                        Active
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:mx-2">
            <p className="text-white mt-5 mb-7 font-poppins">
              Create a new Admin Account
            </p>
            <div className="p-8 bg2 rounded lg:w-[50%] w-full lg:px-20">
              <>
                <form onSubmit={handleSubmit(onSubmit)} className="relative">
                  {/* Login error */}
                  {updateError && (
                    <div className="relative">
                      <p className="absolute -top-9 text-white bg-red-500 w-full rounded p-1 text-sm">
                        <span className="bi-exclamation-triangle-fill me-4 font-poppins"></span>
                        Something went wrong try again
                      </p>
                    </div>
                  )}
                  {/* Email */}
                  <div className="my-5">
                    <label
                      className="text-sm text-gray-400 font-poppins block"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      name="email"
                      className="text-black font-poppins text-sm w-full py-3 mt-2 bg-gray-100 rounded focus:outline-none px-5 shadow shadow-gray-300"
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
                      className="text-sm text-gray-400 font-poppins block"
                      htmlFor="password"
                    >
                      Password
                    </label>

                    <input
                      {...register("password")}
                      type={passwordType ? "password" : "text"}
                      name="password"
                      className="text-black font-poppins text-sm w-full py-3 mt-2 bg-gray-100 rounded focus:outline-none px-5 shadow shadow-gray-300"
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
                  <Button loader={loader} label="Create" />
                </form>
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forms;
