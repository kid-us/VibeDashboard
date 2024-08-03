import SmallNavbar from "../Dashboard/SmallNav";
import Nav from "../Dashboard/Nav";
import Sidebar from "../Dashboard/Sidebar";
import useAmbassadors from "@/hook/useAmbassadors";
import { useState } from "react";
import Delete from "../Modal/Delete";
import Approve from "../Modal/Approve";

const Ambassadors = () => {
  const { pendingAmbassadors } = useAmbassadors();

  const [option, setOption] = useState<boolean>(false);
  const [decline, setDecline] = useState<boolean>(false);
  const [approve, setApprove] = useState<boolean>(false);
  const [ambassadorId, setAmbassadorId] = useState<string>();
  const [ambassadorName, setAmbassadorName] = useState<string>();

  return (
    <>
      {/* Decline Modal */}
      {decline && (
        <Delete
          onDelete={() => setDecline(false)}
          name={ambassadorName}
          url={`/api/v1/ambassador/decline/${ambassadorId}`}
        />
      )}

      {/* Approve Modal */}
      {approve && (
        <Approve
          onApprove={() => setApprove(false)}
          url={`/api/v1/ambassador/approve/${ambassadorId}`}
          name={ambassadorName}
        />
      )}

      <div className="relative lg:grid md:grid grid-cols-11">
        {/* Small device Navbar */}
        <SmallNavbar active="Ambassadors" />
        {/* Sidebar */}
        <div className="lg:col-span-2 w-full">
          {/* <div className=""> */}
          <Sidebar active="Ambassadors" />
          {/* </div> */}
        </div>
        <div className="lg:col-span-9 lg:p-5 md:p-5 px-1 py-2 md:px-6 md:col-span-10">
          {/* Nav */}
          <Nav />

          {/* Contents */}
          <h1 className="text-white text-xl my-3 lg:hidden md:hidden ms-1">
            Courses
          </h1>

          {/* Header */}
          <div className="text-white lg:mt-5 md:mt-5 border border-gray-700 rounded p-3 lg:mb-0 md:mb-0 mb-4">
            <div className="lg:flex justify-between w-full">
              <div>
                <p className="text-gray-200">Headline</p>
                <p className="text-gray-400 text-xs">
                  List of Requested Ambassador.
                </p>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="lg:grid md:grid hidden lg:grid-cols-12 md:grid-cols-12 grid-cols-1 gap-x-5 bg-gray-950 p-2 text-white mb-2 mt-1">
            <div className="col-span-1">
              <p className="text-[14px] logo">First Name</p>
            </div>
            <div className="col-span-1">
              <p className="text-[14px]">Last Name</p>
            </div>
            <div className="col-span-1">
              <p className="text-[14px]">Email</p>
            </div>
            <div className="col-span-1">
              <p className="text-md bi-linkedin text-blue-500"></p>
            </div>
            <div className="col-span-1">
              <p className="text-md bi-instagram text-red-500"></p>
            </div>
            <div className="col-span-1">
              <p className="text-md bi-youtube text-red-500"></p>
            </div>
            <div className="col-span-1">
              <p className="text-md bi-facebook text-blue-500"></p>
            </div>
            <div className="col-span-1">
              <p className="text-md bi-twitch text-purple-500"></p>
            </div>
            <div className="col-span-1">
              <p className="text-md bi-twitter text-cyan-500"></p>
            </div>
            <div className="col-span-1">
              <p className="text-md bi-tiktok text-white"></p>
            </div>
            <div className="col-span-1">
              <p className="text-md bi-globe text-blue-900"></p>
            </div>
            <div className="col-span-1"></div>
          </div>

          {/* Course */}
          {pendingAmbassadors.length === 0 ? (
            <p className="w-full bg-white text-center py-3 text-sm">
              List of requested ambassadors
            </p>
          ) : (
            pendingAmbassadors.map((pending) => (
              <div
                key={pending.uid}
                className="grid lg:grid-cols-12 md:grid-cols-12 grid-cols-4 gap-x-5 lg:gap-y-0 md:gap-y-0 gap-y-5 hero-bg text-white lg:px-2 md:px-2 p-4 mt-1 rounded hover:border-l-4 border-blue-500 bg-gray-800 mb-2"
              >
                {/* First Name */}
                <div className="col-span-1 lg:col-span-1 md:col-span-1">
                  <p className="lg:hidden md:hidden text-xs mb-3 text-gray-400">
                    First Name
                  </p>
                  <p className="text-sm text-ellipsis overflow-hidden text-nowrap">
                    {pending.first_name}
                  </p>
                </div>
                {/* Last Name */}
                <div className="col-span-1">
                  <p className="lg:hidden md:hidden text-xs mb-3 text-gray-400">
                    Last Name
                  </p>
                  <p className="text-sm text-ellipsis overflow-hidden text-nowrap">
                    {pending.last_name}
                  </p>
                </div>
                {/* Email */}
                <div className="col-span-1">
                  <p className="lg:hidden md:hidden text-xs mb-3 text-gray-400">
                    Email
                  </p>
                  <p className="text-sm text-ellipsis overflow-hidden text-nowrap">
                    {pending.email !== "" ? (
                      <a
                        href={`mailto:${pending.email}`}
                        className="bi-envelope bi-box-arrow-in-up-right text-xl text-blue-300"
                      ></a>
                    ) : (
                      "-"
                    )}
                  </p>
                </div>
                {/* linkedin */}
                <div className="col-span-1">
                  <p className="lg:hidden md:hidden text-xs mb-3 bi-linkedin text-gray-400">
                    <span className="ms-1"></span>
                    LinkedIn
                  </p>
                  {pending.linkedin !== "" ? (
                    <a
                      href={pending.linkedin}
                      target="_blank"
                      className="bi-box-arrow-in-up-right text-xl text-blue-300"
                    ></a>
                  ) : (
                    "-"
                  )}
                </div>
                {/* instagram */}
                <div className="col-span-1">
                  <p className="lg:hidden md:hidden text-xs mb-3 text-gray-400 bi-instagram">
                    <span className="ms-1"></span>
                    Instagram
                  </p>
                  {pending.instagram !== "" ? (
                    <a
                      href={pending.instagram}
                      target="_blank"
                      className="bi-box-arrow-in-up-right text-xl text-red-500"
                    ></a>
                  ) : (
                    "-"
                  )}
                </div>
                {/* youtube */}
                <div className="col-span-1">
                  <p className="lg:hidden md:hidden text-xs mb-3 text-gray-400-400 bi-youtube">
                    <span className="ms-1"></span>
                    YouTube
                  </p>

                  {pending.youtube !== "" ? (
                    <a
                      href={pending.youtube}
                      target="_blank"
                      className="bi-box-arrow-in-up-right text-xl text-red-300"
                    ></a>
                  ) : (
                    "-"
                  )}
                </div>
                {/* facebook */}
                <div className="col-span-1">
                  <p className="lg:hidden md:hidden text-xs mb-3 text-gray-400 bi-facebook">
                    <span className="ms-1"></span>
                    Facebook
                  </p>
                  {pending.facebook ? (
                    <a
                      href={pending.facebook}
                      target="_blank"
                      className="bi-box-arrow-in-up-right text-xl text-blue-300"
                    ></a>
                  ) : (
                    "-"
                  )}
                </div>
                {/* twitch */}
                <div className="lg:col-span-1 md:col-span-1 col-span-1">
                  <p className="lg:hidden md:hidden text-xs mb-3 text-gray-400 bi-twitch">
                    <span className="ms-1"></span>
                    Twitch
                  </p>
                  {pending.twich ? (
                    <a
                      href={pending.twich}
                      target="_blank"
                      className="text-purple-300 bi-box-arrow-in-up-right text-xl"
                    ></a>
                  ) : (
                    "-"
                  )}
                </div>
                {/* twitter */}
                <div className="lg:col-span-1 md:col-span-1 col-span-1">
                  <p className="lg:hidden md:hidden text-xs mb-3 text-gray-400 bi-twitter">
                    <span className="ms-1"></span>
                    Twitter
                  </p>
                  {pending.twitter ? (
                    <a
                      href={pending.twitter}
                      target="_blank"
                      className="text-cyan-600 bi-box-arrow-in-up-right text-xl"
                    ></a>
                  ) : (
                    "-"
                  )}
                </div>
                {/* tik tok */}
                <div className="lg:col-span-1 md:col-span-1 col-span-1">
                  <p className="lg:hidden md:hidden text-xs mb-3 text-gray-400 bi-tiktok">
                    <span className="ms-1"></span>
                    Tik tok
                  </p>
                  {pending.tiktoc ? (
                    <a
                      href={pending.tiktoc}
                      target="_blank"
                      className="bi-box-arrow-in-up-right text-xl text-white"
                    ></a>
                  ) : (
                    "-"
                  )}
                </div>
                {/* website */}
                <div className="lg:col-span-1 md:col-span-1 col-span-1">
                  <p className="lg:hidden md:hidden text-xs mb-3 text-gray-400 bi-globe">
                    <span className="ms-1"></span>
                    Website
                  </p>
                  {pending.website ? (
                    <a
                      href={pending.website}
                      target="_blank"
                      className="bi-box-arrow-in-up-right text-xl text-blue-300"
                    ></a>
                  ) : (
                    "-"
                  )}
                </div>
                {/* Edit */}
                <div className="flex md:flex justify-end relative col-span-1">
                  {option && ambassadorId === pending.uid && (
                    <>
                      {/* Delete */}
                      {!pending.verified && (
                        <>
                          <button
                            onClick={() => setApprove(true)}
                            className="bi-check-circle-fill text-green-600 text-xl"
                          ></button>
                          <button
                            onClick={() => setDecline(true)}
                            className="bi-trash-fill text-red-600 text-xl mx-3"
                          ></button>
                        </>
                      )}
                    </>
                  )}

                  <p
                    onClick={() => {
                      setOption(!option);
                      setAmbassadorId(pending.uid);
                      setAmbassadorName(pending.first_name);
                    }}
                    className={`${
                      option && ambassadorId === pending.uid
                        ? "bi-x me-1"
                        : "bi-three-dots-vertical"
                    } cursor-pointer`}
                  ></p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Ambassadors;
