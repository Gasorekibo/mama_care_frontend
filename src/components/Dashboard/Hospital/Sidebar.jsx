import classNames from "classnames";
import { Link, useLocation, useParams } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import PropTypes from "prop-types";
import {
  HiOutlineViewGrid,
  HiOutlineQuestionMarkCircle,
  HiOutlineCog,
} from "react-icons/hi";
import { Ambulance, Bed, FileText, Stethoscope, Users } from "lucide-react";

const linkClass =
  "flex items-center gap-2 font-light px-3 py-2 text-neutral-50 hover:bg-blue-500 hover:no-underline active:bg-blue-600 rounded-sm text-base hover:transition hover:duration-500 hover:ease-in-out";

export default function ChwSideBar() {
  const { id } = useParams();
  const CHW_SIDEBAR_LINKS = [
    {
      key: "dashboard",
      label: "Dashboard",
      path: `/profile/${id}`,
      icon: <HiOutlineViewGrid />,
    },
    {
      key: "patients",
      label: "Patient",
      path: `/profile/${id}/patients`,
      icon: <Users />,
    },
    {
      key: "emergency",
      label: "Emergency",
      path: `/profile/${id}/emergency`,
      icon: <Ambulance />,
    },
    {
      key: "departments",
      label: "Departments",
      path: `/profile/${id}/departments`,
      icon: <Stethoscope />,
    },
    {
      key: "resources",
      label: "Resources",
      path: `/profile/${id}/resources`,
      icon: <Bed />,
    },
    {
      key: "reports",
      label: "Reports",
      path: `/profile/${id}/report`,
      icon: <FileText />,
    },
  ];

  const CHW_SIDEBAR_BOTTOM_LINKS = [
    {
      key: "settings",
      label: "Settings",
      path: `/profile/${id}/settings`,
      icon: <HiOutlineCog />,
    },
    {
      key: "support",
      label: "Help & Support",
      path: `/profile/${id}/support`,
      icon: <HiOutlineQuestionMarkCircle />,
    },
  ];

  return (
    <div className="h-full bg-gradient-to-b from-blue-900/100 to-blue-800/90 w-60 p-3 flex flex-col">
      <Link to={"/"}>
        <div className="flex items-center gap-2 px-1 py-3">
          <img src="../../../public/logo.png" alt="" className="h-6" />
          <span className="text-neutral-200 text-lg">MamaCare</span>
        </div>
      </Link>
      <div className="py-8 flex flex-1 flex-col gap-0.5">
        {CHW_SIDEBAR_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} />
        ))}
      </div>
      <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
        {CHW_SIDEBAR_BOTTOM_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} />
        ))}
        <div className={classNames(linkClass, "cursor-pointer text-red-500")}>
          <span className="text-xl">
            <HiOutlineLogout />
          </span>
          Logout
        </div>
      </div>
    </div>
  );
}

SidebarLink.propTypes = {
  link: PropTypes.shape({
    key: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

function SidebarLink({ link }) {
  const { pathname } = useLocation();

  return (
    <Link
      to={link.path}
      className={classNames(
        pathname === link.path
          ? "bg-neutral-700 text-neutral-50"
          : "text-neutral-400",
        linkClass
      )}
    >
      <span className="text-xl">{link.icon}</span>
      {link.label}
    </Link>
  );
}
