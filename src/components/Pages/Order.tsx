import { baseUrl } from "@/services/request";
import axios from "axios";
import { useEffect, useState } from "react";
import SmallNavbar from "../Dashboard/SmallNav";
import Sidebar from "../Dashboard/Sidebar";
import Nav from "../Dashboard/Nav";
import useDocumentTitle from "@/hook/useDocumentTitle";
import Loading from "../Loading/Loading";

interface Delivery {
  address: string;
  email: string;
  fname: string;
  lname: string;
  location: string;
  phone: string;
  plz: string;
  street: string;
  street_no: string;
}

interface Position {
  x: string | number;
  y: string | number;
}

interface Card {
  text: string;
  bgColor: string;
  image: File | null;
  textSize: string;
  fontStyle: string;
  imageSize: string;
  imagePosition: Position;
  textPosition: Position;
  extraTextPosition: Position;
  pickedBg: string;
  color: string;
  extraText: string;
  extraTextColor: string;
  extraTextFontSize: string;
  extraTextFontStyle: string;
}

interface allOrders {
  back_image: string;
  front_image: string;
  front_style: Card; // This will be an object after parsing
  back_style: Card; // This will be an object after parsing
  order_id: string;
  order_metadata: Delivery; // This will be an object after parsing
  quantity: number;
  vibecardLogo: boolean;
  orientation: string;
  card_img: string;
}

interface TotalOrders {
  orders: {
    back_image: string;
    front_image: string;
    front_style: string; // String to parse
    back_style: string; // String to parse
    order_id: string;
    order_metadata: string; // String to parse
    quantity: number;
    vibecardLogo: boolean;
    orientation: string;
    card_img: string;
  }[];
}

const Orders = () => {
  const [title] = useState("Orders");
  useDocumentTitle(title);

  const [orders, setOrders] = useState<allOrders[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get<TotalOrders>(`${baseUrl}/api/v1/products/orders`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const parsedOrders = response.data.orders.map((order) => {
          try {
            return {
              ...order,
              front_style: JSON.parse(order.front_style) as Card,
              back_style: JSON.parse(order.back_style) as Card,
              order_metadata: JSON.parse(order.order_metadata) as Delivery,
            };
          } catch (e) {
            console.error("Error parsing order data", e);
            return {
              ...order,
              front_style: {} as Card, // or some default value
              back_style: {} as Card, // or some default value
              order_metadata: {} as Delivery, // or some default value
            };
          }
        });

        setOrders(parsedOrders);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDownload = async (imageUrl: string) => {
    try {
      // Replace with your image URL

      // Fetch the image
      const response = await axios.get(imageUrl, { responseType: "blob" });

      // Create a blob from the image data
      const blob = new Blob([response.data], { type: "image/jpeg" });

      // Create a link element
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "downloaded-image.jpg"; // Name of the downloaded file

      // Append the link to the document and trigger the download
      document.body.appendChild(link);
      link.click();

      // Clean up and remove the link
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to download image", error);
    }
  };

  return (
    <>
      {loading && <Loading />}
      <div className="relative lg:grid md:grid grid-cols-11">
        {/* Small device Navbar */}
        <SmallNavbar active="Orders" />
        {/* Sidebar */}
        <div className="lg:col-span-2 w-full">
          {/* <div className=""> */}
          <Sidebar active="Orders" />
          {/* </div> */}
        </div>
        <div className="lg:col-span-9 lg:px-2 md:px-2 px-1 py-2 md:col-span-10">
          {/* Nav */}
          <Nav />

          {/* Contents */}
          <h1 className="text-white text-xl my-3 ms-1">Orders</h1>

          <div className="px-2 mt-5 pb-96">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div
                  key={order.order_id}
                  className="lg:grid grid-cols-5 bg-gray-800 mb-5 rounded py-6"
                >
                  <div className="col-span-2">
                    <img
                      src={order.card_img}
                      alt="design"
                      className="rounded"
                    />
                  </div>
                  {/* Delivery Data */}
                  <div className="col-span-3 grid grid-cols-2 lg:gap-x-10 lg:px-0 px-5 lg:mt-0 mt-5">
                    {/* Card */}
                    <div>
                      <p className="lg:font-bold lg:text-xl text-xs text-white mb-5">
                        Card Information
                      </p>
                      <div className="grid grid-cols-2 lg:gap-x-0 gap-x-2">
                        <div>
                          <p className="text-gray-300 text-xs mb-2">
                            Front Image
                          </p>
                          <img
                            src={order.front_image}
                            alt=""
                            className="w-28 rounded"
                          />
                        </div>
                        <div>
                          <button
                            className="bi-download lg:text-3xl text-2xl lg:pt-10 pt-8 text-white"
                            onClick={() => handleDownload(order.front_image)}
                          ></button>
                        </div>
                        {/* Back Image */}
                        {order.back_image && (
                          <>
                            <div className="mt-5">
                              <p className="text-gray-300 text-xs mb-2">
                                Back Image
                              </p>
                              <img
                                src={order.back_image}
                                alt=""
                                className="w-28 h-20 rounded object-cover"
                              />
                            </div>
                            <div>
                              <button
                                className="bi-download lg:text-3xl text-2xl lg:pt-10 pt-8 text-white mt-5"
                                onClick={() =>
                                  handleDownload(order.front_image)
                                }
                              ></button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    {/* Delivery */}
                    <div className="text-white">
                      <p className="lg:font-bold lg:text-xl text-xs text-white mb-5">
                        Delivery Information
                      </p>
                      <p className="lg:text-lg text-sm">
                        <span className="text-xs text-gray-400 font-bold">
                          First Name
                        </span>{" "}
                        {order.order_metadata.fname}
                      </p>
                      <p className="lg:text-lg font-poppins text-sm">
                        <span className="text-xs text-gray-400 font-bold">
                          Last Name
                        </span>{" "}
                        {order.order_metadata.lname}
                      </p>
                      <p className="lg:text-lg font-poppins text-sm">
                        <span className="text-xs text-gray-400 font-bold">
                          Email
                        </span>{" "}
                        {order.order_metadata.email}
                      </p>
                      <p className="lg:text-lg font-poppins text-sm">
                        <span className="text-xs text-gray-400 font-bold">
                          Location
                        </span>{" "}
                        {order.order_metadata.location}
                      </p>
                      <p className="lg:text-lg font-poppins text-sm">
                        <span className="text-xs text-gray-400 font-bold">
                          Phone
                        </span>{" "}
                        {order.order_metadata.phone}
                      </p>
                      <p className="lg:text-lg font-poppins text-sm">
                        <span className="text-xs text-gray-400 font-bold">
                          Street
                        </span>{" "}
                        {order.order_metadata.street}
                      </p>
                      <p className="lg:text-lg font-poppins text-sm">
                        <span className="text-xs text-gray-400 font-bold">
                          {" "}
                          Street No
                        </span>{" "}
                        {order.order_metadata.street_no}
                      </p>
                      <p className="lg:text-lg font-poppins text-sm">
                        <span className="text-xs text-gray-400 font-bold">
                          Address
                        </span>{" "}
                        {order.order_metadata.address}
                      </p>
                      <p className="lg:text-lg font-poppins text-sm">
                        <span className="text-xs text-gray-400">PLZ</span>{" "}
                        {order.order_metadata.plz}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="w-full bg-white text-center py-3 text-sm">
                List of orders will be here!
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
