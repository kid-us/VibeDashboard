import { baseUrl } from "@/services/request";
import axios from "axios";
import { useEffect, useState } from "react";
import SmallNavbar from "../Dashboard/SmallNav";
import Sidebar from "../Dashboard/Sidebar";
import Nav from "../Dashboard/Nav";
import useDocumentTitle from "@/hook/useDocumentTitle";
import Loading from "../Loading/Loading";
import Email from "../Modal/Email";

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
  created_at: string;
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
    created_at: string;
  }[];
  limit: number;
  total: number;
  total_pages: number;
  page: number;
}

interface Pagination {
  limit: number;
  total: number;
  total_pages: number;
  page: number;
}

const Orders = () => {
  const [title] = useState("Cards");
  useDocumentTitle(title);

  const [orders, setOrders] = useState<allOrders[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pagination, setPagination] = useState<Pagination>();
  const [page, setPage] = useState<number>(1);
  const [orderId, setOrderId] = useState<string>("");

  useEffect(() => {
    axios
      .get<TotalOrders>(`${baseUrl}/api/v1/products/orders?page=1`, {
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

        const pagination = {
          limit: response.data.limit,
          total_pages: response.data.total_pages,
          page: response.data.page,
          total: response.data.total,
        };

        setPagination(pagination);
        setOrders(parsedOrders);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  function getDate(timestamp: string) {
    const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

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

      {orderId !== "" && (
        <Email id={orderId} onApprove={() => setOrderId("")} type="product" />
      )}
      <div className="relative lg:grid md:grid grid-cols-11">
        {/* Small device Navbar */}
        <SmallNavbar active="Cards" />
        {/* Sidebar */}
        <div className="lg:col-span-2 w-full">
          {/* <div className=""> */}
          <Sidebar active="Cards" />
          {/* </div> */}
        </div>
        <div className="lg:col-span-9 lg:px-4 md:px-2 py-2 md:col-span-10">
          {/* Nav */}
          <Nav />

          {/* Contents */}
          <h1 className="text-white text-xl my-3 ms-1">Orders</h1>

          <div className="px-2 mt-5">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div key={order.order_id}>
                  <div className="lg:grid grid-cols-5 secondary-bg mb-5 rounded py-6">
                    <div className="col-span-2">
                      <img
                        src={order.card_img}
                        alt="design"
                        className="rounded"
                      />
                    </div>
                    {/* Delivery Data */}
                    <div className="col-span-3 grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-x-10 lg:px-0 px-5 lg:mt-0 mt-5">
                      {/* Card */}
                      <div>
                        <p className="lg:font-bold lg:text-xl text-white mb-5 font-poppins">
                          Card Information
                        </p>
                        <div className="grid grid-cols-2 lg:gap-x-0 gap-x-2">
                          <div className="col-span-2 mb-5">
                            <p className="text-white font-poppins">
                              <span className="font-poppins text-gray-400">
                                Order Date :
                              </span>{" "}
                              {getDate(order.created_at)}
                            </p>
                            <p className="font-poppins text-gray-400">
                              Quantity :{" "}
                              <span className="text-xl text-white font-poppins">
                                {order.quantity}
                              </span>
                            </p>
                            <p className="font-poppins text-gray-400">
                              Vibecard Logo :{" "}
                              <span className="text-xl text-white font-poppins">
                                {order.vibecardLogo ? "True" : "False"}
                              </span>
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs mb-2 font-poppins">
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
                              className="bi-download lg:text-3xl text-2xl lg:pt-10 pt-8 text-white border-none"
                              onClick={() => handleDownload(order.front_image)}
                            ></button>
                          </div>

                          {/* Back Image */}
                          {order.back_image && (
                            <>
                              <div className="mt-5">
                                <p className="text-gray-400 text-xs mb-2 font-poppins">
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
                                  className="bi-download lg:text-3xl text-2xl lg:pt-10 pt-8 text-white mt-5 border-none"
                                  onClick={() =>
                                    handleDownload(order.front_image)
                                  }
                                ></button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      <div>
                        {/* Delivery */}
                        <div className="text-white">
                          <p className="lg:font-bold lg:text-xl mt-5 lg:mt-0 md:mt-5 text-white mb-5 font-poppins">
                            Delivery Information
                          </p>
                          <div className="grid grid-cols-5">
                            <p className="mb-2 col-span-2 font-poppins text-gray-400">
                              First Name
                            </p>
                            <p className="col-span-3 font-bold font-poppins text-sm">
                              {order.order_metadata.fname}
                            </p>

                            <p className="mb-2 col-span-2 font-poppins text-gray-400">
                              Last Name
                            </p>
                            <p className="col-span-3 font-bold font-poppins text-sm">
                              {order.order_metadata.lname}
                            </p>

                            <p className="mb-2 col-span-2 font-poppins text-gray-400">
                              Email
                            </p>
                            <p className="col-span-3 font-bold font-poppins text-sm">
                              {order.order_metadata.email}
                            </p>

                            <p className="mb-2 col-span-2 font-poppins text-gray-400">
                              Location
                            </p>
                            <p className="col-span-3 font-bold font-poppins text-sm">
                              {order.order_metadata.location}
                            </p>

                            <p className="mb-2 col-span-2 font-poppins text-gray-400">
                              Phone
                            </p>
                            <p className="col-span-3 font-bold font-poppins text-sm">
                              {order.order_metadata.phone}
                            </p>

                            <p className="mb-2 col-span-2 font-poppins text-gray-400">
                              Street
                            </p>
                            <p className="col-span-3 font-bold font-poppins text-sm">
                              {order.order_metadata.street}
                            </p>

                            <p className="mb-2 col-span-2 font-poppins text-gray-400">
                              Street No
                            </p>
                            <p className="col-span-3 font-bold font-poppins text-sm">
                              {order.order_metadata.street_no}
                            </p>

                            <p className="mb-2 col-span-2 font-poppins text-gray-400">
                              Address
                            </p>
                            <p className="col-span-3 font-bold font-poppins text-sm">
                              {order.order_metadata.address}
                            </p>

                            <p className="mb-2 col-span-2 font-poppins text-gray-400">
                              PLZ
                            </p>
                            <p className="col-span-3 font-bold font-poppins text-sm">
                              {order.order_metadata.plz}
                            </p>
                          </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-4">
                          <button
                            onClick={() => setOrderId(order.order_id)}
                            className="bg-blue-500 font-poppins lg:w-[90%] w-full rounded h-12 text-white shadow shadow-zinc-950"
                          >
                            Send Email
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Pagination */}
                  {pagination && (
                    <div className="flex justify-end mt-2">
                      <div className="flex gap-x-2">
                        {/* prev */}
                        <button
                          onClick={() => setPage(page - 1)}
                          disabled={
                            pagination.total <= pagination.limit ? true : false
                          }
                          className={`${
                            pagination.total < 10
                              ? "bg-gray-400 cursor-not-allowed"
                              : "btn-bg shadow p-1"
                          } w-20 font-poppins rounded text-sm h-7`}
                        >
                          Prev
                        </button>
                        {/* Current */}
                        <p className="bg-white w-10 font-poppins rounded text-sm h-7 text-center pt-[6px]">
                          {pagination.page}
                        </p>
                        {/*next  */}
                        <button
                          onClick={() =>
                            pagination.page < pagination.total_pages &&
                            setPage(page + 1)
                          }
                          disabled={
                            pagination.page >= pagination.total_pages
                              ? true
                              : false
                          }
                          className={`${
                            pagination.page >= pagination.total_pages
                              ? "bg-gray-400 cursor-not-allowed"
                              : "btn-bg shadow p-1"
                          } w-20 font-poppins rounded text-sm h-7`}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="w-full bg-white text-center py-3 text-sm font-poppins">
                List of NFC card orders will be here!
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
