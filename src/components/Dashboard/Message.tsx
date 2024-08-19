import useMessage from "@/hook/useMessages";
import { baseUrl } from "@/services/request";
import axios from "axios";

const Message = () => {
  const { messages } = useMessage();

  const handleDelete = (id: string) => {
    axios
      .delete(`${baseUrl}/api/v1/dashboard/users-messages/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="fixed lg:w-[25%] main-bg w-[80%] z-50 top-14 right-0 bg rounded-lg border border-gray-700 p-2">
        {messages.length > 0 ? (
          <>
            {messages.map((m) => (
              <div
                key={m.id}
                className="secondary-bg shadow shadow-zinc-900 mb-4 rounded p-4"
              >
                <div className="flex justify-between rounded ">
                  <div className="flex gap-x-4">
                    <p className="font-bold text-sm font-poppins text-gray-400">
                      {m.username}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="bi-trash-fill text-xl text-red-500"
                  ></button>
                </div>
                <p className="text-xs font-poppins font-poppins font-bold text-white">
                  {m.email}
                </p>
                <p className="text-sm italic my-2 font-poppins text-white">
                  {" "}
                  <span className="bi-quote text-sm"></span> {m.message}
                </p>
              </div>
            ))}
          </>
        ) : (
          <p className="my-1 text-black font-poppins">
            There is no message to view!
          </p>
        )}
      </div>
    </>
  );
};

export default Message;
