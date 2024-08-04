import useAmbassadors from "@/hook/useAmbassadors";

const ApprovedAmbassadors = () => {
  const { activeAmbassadors } = useAmbassadors();
  return (
    <>
      <p className="mt-5 text-white py-2 text-sm">Approved Ambassadors</p>
      {/* Header */}
      <div className="text-white lg:mt-2 md:mt-2 border border-gray-700 rounded p-3 lg:mb-0 md:mb-0 mb-4">
        <div className="lg:flex justify-between w-full">
          <div>
            <p className="text-gray-200">Headline</p>
            <p className="text-gray-400 text-xs">
              List of Approved Ambassador.
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
        <div className="col-span-1">
          <p className="text-sm">Earning</p>
        </div>
      </div>

      {/* Pending */}
      {activeAmbassadors.length === 0 ? (
        <p className="w-full bg-white text-center py-3 text-sm">
          List of requested ambassadors
        </p>
      ) : (
        activeAmbassadors.map((active) => (
          <div
            key={active.uid}
            className="grid lg:grid-cols-12 md:grid-cols-12 grid-cols-4 gap-x-5 lg:gap-y-0 md:gap-y-0 gap-y-5 hero-bg text-white lg:px-2 md:px-2 p-4 mt-1 rounded hover:border-l-4 border-blue-500 bg-gray-800 mb-2"
          >
            {/* First Name */}
            <div className="col-span-1 lg:col-span-1 md:col-span-1">
              <p className="lg:hidden md:hidden text-xs mb-3 text-gray-400">
                First Name
              </p>
              <p className="text-sm text-ellipsis overflow-hidden text-nowrap">
                {active.first_name}
              </p>
            </div>
            {/* Last Name */}
            <div className="col-span-1">
              <p className="lg:hidden md:hidden text-xs mb-3 text-gray-400">
                Last Name
              </p>
              <p className="text-sm text-ellipsis overflow-hidden text-nowrap">
                {active.last_name}
              </p>
            </div>
            {/* Email */}
            <div className="col-span-1">
              <p className="lg:hidden md:hidden text-xs mb-3 text-gray-400">
                Email
              </p>
              <p className="text-sm text-ellipsis overflow-hidden text-nowrap">
                {active.email !== "" ? (
                  <a
                    href={`mailto:${active.email}`}
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
              {active.linkedin !== "" ? (
                <a
                  href={active.linkedin}
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
              {active.instagram !== "" ? (
                <a
                  href={active.instagram}
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

              {active.youtube !== "" ? (
                <a
                  href={active.youtube}
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
              {active.facebook ? (
                <a
                  href={active.facebook}
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
              {active.twich ? (
                <a
                  href={active.twich}
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
              {active.twitter ? (
                <a
                  href={active.twitter}
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
              {active.tiktoc ? (
                <a
                  href={active.tiktoc}
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
              {active.website ? (
                <a
                  href={active.website}
                  target="_blank"
                  className="bi-box-arrow-in-up-right text-xl text-blue-300"
                ></a>
              ) : (
                "-"
              )}
            </div>
            <div>
              <p className="lg:hidden md:hidden text-xs mb-3 text-gray-400">
                Earning
              </p>
              <p className="text-sm text-ellipsis overflow-hidden text-nowrap">
                {active.earnings}
              </p>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default ApprovedAmbassadors;
