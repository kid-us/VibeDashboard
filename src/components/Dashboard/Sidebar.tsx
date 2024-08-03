import { Link } from "react-router-dom";
// import Logout from "./Logout/Logout";

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
  //   { id: 3, icon: "bi-tags-fill", title: "Categories", path: "/category" },
  //   { id: 4, icon: "bi-book-fill", title: "Courses", path: "/courses" },
  //   { id: 5, icon: "bi-people-fill", title: "Students", path: "/students" },
  //   { id: 6, icon: "bi-gear-fill", title: "Setting", path: "/setting" },
];

const Sidebar = ({ active }: Props) => {
  return (
    <>
      <div className="lg:block md:block hidden sticky top-0 hero-bg border-r border-gray-700 h-[100dvh] lg:pe-3">
        <Link to="/">
          <h1 className="text-white lg:text-4xl md:text-2xl md:pt-4 md:text-center lg:text-start lg:ms-3 logo-font ">
            vibecard
          </h1>
        </Link>
        <div className="mt-10 md:text-center lg:text-start lg:ms-3">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              to={tab.path}
              className={`${
                active === tab.title
                  ? "lg:bg-teal-600 rounded lg:text-black md:text-teal-400"
                  : "text-white"
              } block mb-5 lg:text-xl md:text-3xl p-2`}
            >
              <span className={`${tab.icon}`}></span>
              <span className={`lg:inline hidden lg:ms-5`}>{tab.title}</span>
            </Link>
          ))}

          {/* Logout */}
          {/* <Logout /> */}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
