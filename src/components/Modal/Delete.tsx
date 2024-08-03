import axios from "axios";
import { useState } from "react";
import { baseUrl } from "../../services/request";

interface Props {
  onDelete: (value: boolean) => void;
  name?: string;
  url: string;
}

const Delete = ({ onDelete, name, url }: Props) => {
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);

  //   Deleting
  const handleDelete = () => {
    axios
      .post(`${baseUrl}${url}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        setDeleteConfirmed(true);
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
      <div className="fixed top-0 left-0 w-full z-50">
        <div className="flex justify-center items-center h-[100vh]">
          <div className="py-6 px-8 secondary-bg rounded lg:w-[30%] lg:mx-0 mx-3">
            {!deleteConfirmed ? (
              <>
                <h1 className="text-white text-xl ">Decline {name}</h1>
                <p className="text-sm  text-gray-400 my-5">
                  Are you sure you want to decline the request of the
                  ambassador? This action cannot be undone. Do you want to
                  proceed?
                </p>
                <div className="flex justify-between gap-x-10">
                  <button
                    onClick={() => onDelete(false)}
                    className="w-full bg-sky-600 rounded text-white shadow-none h-12"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete()}
                    className="w-full bg-red-500 rounded text-white shadow-none h-12"
                  >
                    <p>
                      Delete
                      <span className="bi-trash-fill ms-3"></span>
                    </p>
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center mt-4">
                <p className="bi-check-circle-fill text-green-500 text-4xl"></p>
                <p className="text-white mt-5 text-xl chakra first-letter:uppercase">
                  {name} Declined Successfully!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Delete;
