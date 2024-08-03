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
        <div className="col-span-2">
          <p className="text-[14px] logo">First Name</p>
        </div>
        <div className="col-span-2">
          <p className="text-[14px]">Last Name</p>
        </div>
        <div className="col-span-2">
          <p className="text-[14px]">Email</p>
        </div>
        <div className="col-span-2">
          <p className="text-sm text-white"> Earning</p>
        </div>
        <div className="col-span-1">
          <p className="text-sm bi-instagram text-red-500"> Insta</p>
        </div>
        <div className="col-span-1">
          <p className="text-sm bi-youtube text-red-500"> YouTube</p>
        </div>

        <div className="col-span-1">
          <p className="text-sm bi-twitter text-cyan-500"> Twitter</p>
        </div>
        <div className="col-span-1">
          <p className="text-sm bi-tiktok text-white"> Tik Tok</p>
        </div>
      </div>

      {/* Course */}
      {activeAmbassadors.length === 0 ? (
        <p className="w-full bg-white text-center py-3 text-sm">
          List of approved ambassadors
        </p>
      ) : (
        activeAmbassadors.map((approved) => (
          <div
            key={approved.uid}
            className="grid lg:grid-cols-12 md:grid-cols-12 grid-cols-4 gap-x-5 lg:gap-y-0 md:gap-y-0 gap-y-5 hero-bg text-white lg:px-2 md:px-2 p-4 mt-1 rounded hover:border-l-4 border-blue-500 bg-gray-800 mb-2"
          >
            {/* First Name */}
            <div className="col-span-2">
              <p className="lg:hidden md:hidden text-xs mb-3 text-gray-400">
                First Name
              </p>
              <p className="text-sm text-ellipsis overflow-hidden text-nowrap">
                {approved.first_name}
              </p>
            </div>
            {/* Last Name */}
            <div className="col-span-2">
              <p className="lg:hidden md:hidden text-xs mb-3 text-gray-400">
                Last Name
              </p>
              <p className="text-sm text-ellipsis overflow-hidden text-nowrap">
                {approved.last_name}
              </p>
            </div>
            {/* Email */}
            <div className="col-span-2">
              <p className="lg:hidden md:hidden text-xs mb-3 text-gray-400">
                Email
              </p>
              <p className="text-sm text-ellipsis overflow-hidden text-nowrap">
                <a
                  href={`mailto:${approved.email}`}
                  className="text-sm text-blue-300"
                >
                  {approved.email}
                </a>
              </p>
            </div>
            {/* Earning */}
            <div className="col-span-2">
              <p className="lg:hidden md:hidden text-xs mb-3 text-gray-400">
                Earning
              </p>
              <p className="text-sm text-ellipsis overflow-hidden text-nowrap">
                {approved.earnings}
              </p>
            </div>
            {/* instagram */}
            <div className="col-span-1">
              <p className="lg:hidden md:hidden text-xs mb-3 text-gray-400 bi-instagram">
                <span className="ms-1"></span>
                Instagram
              </p>
              {approved.instagram !== "" ? (
                <a
                  href={approved.instagram}
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

              {approved.youtube !== "" ? (
                <a
                  href={approved.youtube}
                  target="_blank"
                  className="bi-box-arrow-in-up-right text-xl text-red-300"
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
              {approved.twitter ? (
                <a
                  href={approved.twitter}
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
              {approved.tiktoc ? (
                <a
                  href={approved.tiktoc}
                  target="_blank"
                  className="bi-box-arrow-in-up-right text-xl text-white"
                ></a>
              ) : (
                "-"
              )}
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default ApprovedAmbassadors;
