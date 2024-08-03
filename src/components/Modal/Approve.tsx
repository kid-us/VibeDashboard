import axios from "axios";
import { useState } from "react";
import { baseUrl } from "../../services/request";

interface Props {
  onApprove: (value: boolean) => void;
  url: string;
  name?: string;
}

const Approve = ({ onApprove, url, name }: Props) => {
  const [approved, setApproved] = useState(false);

  //   Approve
  const handleApprove = () => {
    axios
      .post(`${baseUrl}${url}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        setApproved(true);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="overlay w-full z-50"></div>
      <div className="fixed w-full z-50 top-0 left-0">
        <div className="flex justify-center items-center h-[100vh]">
          <div className="p-8 secondary-bg rounded lg:w-[30%] lg:mx-0 mx-3">
            {!approved ? (
              <>
                <h1 className="text-white text-xl ">Approve {name}</h1>
                <p className="text-sm  text-gray-400 my-5">
                  Are you sure you want to approve {name}
                </p>
                <div className="flex justify-between gap-x-10">
                  <button
                    onClick={() => onApprove(false)}
                    className="w-full bg-sky-600 rounded text-white shadow-none h-12"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleApprove()}
                    className="w-full bg-green-600 rounded text-white shadow-none h-12"
                  >
                    <p>
                      Approve
                      <span className="bi-check-circle-fill ms-3"></span>
                    </p>
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center mt-4">
                <p className="bi-check-circle-fill text-green-500 text-4xl"></p>
                <p className="text-white mt-5 text-xl chakra first-letter:uppercase">
                  {name} Approved Successfully!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Approve;
