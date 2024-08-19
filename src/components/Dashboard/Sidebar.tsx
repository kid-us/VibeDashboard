import useAuth from "@/store/useAuth";
import { Link } from "react-router-dom";

interface Props {
  active: string;
}

export const tabs = [
  { id: 1, icon: "bi-speedometer", title: "Dashboard", path: "/" },
  {
    id: 2,
    icon: "bi-person-heart",
    title: "Ambassadors",
    path: "/ambassadors",
  },
  { id: 3, icon: "bi-border-width", title: "Cards", path: "/cards" },
  { id: 5, icon: "bi-wallet-fill", title: "Wallets", path: "/wallets" },
];

const Sidebar = ({ active }: Props) => {
  const { type } = useAuth();

  return (
    <>
      <div className="lg:block md:block hidden sticky top-0 secondary-bg border-r border-gray-700 h-[100dvh] lg:pe-3 pt-3">
        <Link to="/">
          <h1 className="text-white lg:text-4xl md:text-2xl md:text-center lg:text-start lg:ms-3 logo-font ">
            <span className="md:hidden lg:block  logo-font">vibecard</span>
            <span className="lg:hidden md:block hidden text-5xl">v</span>
          </h1>
        </Link>
        <div className="mt-10 md:text-center lg:text-start lg:ms-3">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              to={tab.path}
              className={`${
                active === tab.title
                  ? "lg:bg-teal-500 rounded lg:text-black md:text-teal-400"
                  : "text-white"
              } block mb-5 lg:text-xl md:text-3xl p-2`}
            >
              <span className={`${tab.icon}`}></span>
              <span className={`lg:inline hidden lg:ms-5 font-poppins`}>
                {tab.title}
              </span>
            </Link>
          ))}
          {type === "super_admin" && (
            <Link
              to={"/forms"}
              className={`${
                active === "Forms"
                  ? "lg:bg-teal-600 rounded lg:text-black md:text-teal-400"
                  : "text-white"
              } block mb-5 lg:text-xl md:text-3xl p-2`}
            >
              <span className={`bi-input-cursor-text`}></span>
              <span className={`lg:inline hidden lg:ms-5`}>Forms</span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
