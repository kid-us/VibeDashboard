import { baseUrl } from "@/services/request";
import axios from "axios";
import { useState } from "react";

interface Props {
  onApprove: (value: boolean) => void;
  id: string;
  type: string;
}

const Email = ({ id, onApprove, type }: Props) => {
  const [approved, setApproved] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleSendEmail = () => {
    if (message.length < 10) {
      setError(true);
      return;
    }
    setError(false);

    const data = {
      message: message,
      order_id: id,
      order_type: type,
    };

    console.log(data);

    let url;
    if (type === "wallet") {
      url = `/api/v1/products/complete-wallet-order/${id}`;
    } else {
      url = `/api/v1/products/complete-product-order/${id}`;
    }

    return;
    axios
      .post(`${baseUrl}/api/v1/products/send-order-update`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        axios
          .put(
            `${baseUrl}${url}`,
            {},
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then(() => {
            setApproved(true);
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          })
          .catch((error) => {
            console.log(error);
          });
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
          <div className="relative p-8 secondary-bg rounded lg:w-[35%] w-full lg:mx-0 mx-3">
            {!approved ? (
              <>
                <button
                  onClick={() => onApprove(false)}
                  className="bi-x-lg text-white shadow-none absolute top-2 right-3"
                ></button>
                <p className="text-sm text-gray-400 my-2 font-poppins">
                  Write an email for the client
                </p>
                <div className="mt-2">
                  <textarea
                    name="message"
                    className="w-full rounded resize-none h-40 p-2 font-poppins focus:outline-none"
                    placeholder="Write message"
                    onChange={(e) => setMessage(e.currentTarget.value)}
                  ></textarea>
                  {error && (
                    <p className="text-sm font-poppins bg-red-500 rounded text-white p-1 mt-2">
                      Message mut be 10 chars long.
                    </p>
                  )}
                  <button
                    onClick={() => handleSendEmail()}
                    className="w-full mt-4 bg-green-600 rounded text-white shadow-none h-12 font-poppins"
                  >
                    Send Email
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center mt-4">
                <p className="bi-check-circle-fill text-green-500 text-4xl"></p>
                <p className="text-white mt-5 text-xl font-poppins first-letter:uppercase">
                  Email sended successfully!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Email;
