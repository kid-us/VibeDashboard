import useAmbassadors from "@/hook/useAmbassadors";
import { useState } from "react";
import Approve from "../Modal/Approve";
import Delete from "../Modal/Delete";
import Loading from "../Loading/Loading";

const PendingAmbassadors = () => {
  const { pendingAmbassadors, loading } = useAmbassadors();

  const [option, setOption] = useState<boolean>(false);
  const [decline, setDecline] = useState<boolean>(false);
  const [approve, setApprove] = useState<boolean>(false);
  const [ambassadorId, setAmbassadorId] = useState<string>();
  const [ambassadorName, setAmbassadorName] = useState<string>();

  return (
    <>
      {loading && <Loading />}
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
      <p className="mt-8 text-white py-2 font-poppins">Pending Ambassadors</p>

      {/* Table */}
      <div className="lg:grid md:grid hidden lg:grid-cols-12 md:grid-cols-12 grid-cols-1 gap-x-5 bg-gray-950 p-2 text-white mb-2 mt-1">
        <div className="col-span-1">
          <p className="text-[14px] font-poppins logo">First Name</p>
        </div>
        <div className="col-span-1">
          <p className="text-[14px] font-poppins">Last Name</p>
        </div>
        <div className="col-span-1">
          <p className="text-[14px] font-poppins">Email</p>
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

      {/* Pending */}
      {pendingAmbassadors.length === 0 ? (
        <p className="w-full bg-white text-center py-3 text-sm">
          List of requested/pending ambassadors will display here
        </p>
      ) : (
        pendingAmbassadors.map((pending) => (
          <div
            key={pending.uid}
            className="grid lg:grid-cols-12 md:grid-cols-12 grid-cols-4 gap-x-5 lg:gap-y-0 md:gap-y-0 gap-y-5 hero-bg text-white lg:px-2 md:px-2 p-4 mt-1 rounded hover:border-l-4 border-blue-500 secondary-bg mb-2"
          >
            {/* First Name */}
            <div className="col-span-1 lg:col-span-1 md:col-span-1">
              <p className="lg:hidden md:hidden text-xs mb-3 text-gray-400 font-poppins">
                First Name
              </p>
              <p className="text-sm text-ellipsis overflow-hidden text-nowrap">
                {pending.first_name}
              </p>
            </div>
            {/* Last Name */}
            <div className="col-span-1">
              <p className="lg:hidden md:hidden text-xs mb-3 text-gray-400 font-poppins">
                Last Name
              </p>
              <p className="text-sm text-ellipsis overflow-hidden text-nowrap">
                {pending.last_name}
              </p>
            </div>
            {/* Email */}
            <div className="col-span-1">
              <p className="lg:hidden md:hidden text-xs mb-3 text-gray-400 font-poppins">
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
              <p className="lg:hidden md:hidden text-xs mb-3 bi-linkedin text-gray-400 font-poppins">
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
              <p className="lg:hidden md:hidden text-xs mb-3 text-gray-400 font-poppins bi-instagram">
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
              <p className="lg:hidden md:hidden text-xs mb-3 text-gray-400 font-poppins-400 bi-youtube">
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
              <p className="lg:hidden md:hidden text-xs mb-3 text-gray-400 font-poppins bi-facebook">
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
              <p className="lg:hidden md:hidden text-xs mb-3 text-gray-400 font-poppins bi-twitch">
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
              <p className="lg:hidden md:hidden text-xs mb-3 text-gray-400 font-poppins bi-twitter">
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
              <p className="lg:hidden md:hidden text-xs mb-3 text-gray-400 font-poppins bi-tiktok">
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
              <p className="lg:hidden md:hidden text-xs mb-3 text-gray-400 font-poppins bi-globe">
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
    </>
  );
};

export default PendingAmbassadors;
