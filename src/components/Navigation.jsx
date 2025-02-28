import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { BiBookContent } from "react-icons/bi";
import { CiLogin } from "react-icons/ci";
import { GrSchedulePlay } from "react-icons/gr";
import { MdAddHomeWork } from "react-icons/md";
import { TbEmergencyBed } from "react-icons/tb";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react";
import { logoutAction } from "../redux/slices/authSlice";

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoggedIn, auth } = useSelector((state) => state?.auth);

  // eslint-disable-next-line react/prop-types
  const NavLink = ({ to, children, className }) => {
    const isActive = location.pathname === to;

    return (
      <button
        onClick={() => navigate(to)}
        className={`${className} ${
          isActive ? "text-white bg-blue-500 " : ""
        }  text-left px-3 py-2 transition-colors duration-200`}
      >
        {children}
      </button>
    );
  };

  const handleSignOut = () => dispatch(logoutAction());

  const NAVIGATION_LINKS = [
    {
      name: "Home",
      url: "/",
      icon: <MdAddHomeWork />,
    },
    {
      name: "Pregnancy Education",
      url: "/pregnancy-education",
      icon: <BiBookContent />,
    },
    {
      name: "Appointment",
      url: "/appointment",
      icon: <GrSchedulePlay />,
    },
    {
      name: "Emergence",
      url: "/emergence",
      icon: <TbEmergencyBed />,
    },
    {
      name: "Register",
      url: "/register",
      icon: <CiLogin />,
      loggedIn: isLoggedIn,
    },
    {
      name: "Login",
      url: "/login",
      icon: <CiLogin />,
      loggedIn: isLoggedIn,
    },
  ];

  return (
    <Navbar
      fluid
      rounded
      className="px-4 text-primaryText bg-slate-100 shadow-md "
    >
      <button onClick={() => navigate("/")} className="flex items-center">
        <img src="logo.png" className="mr-3 h-6 sm:h-9" alt="Mama care logo" />
      </button>

      {isLoggedIn && (
        <div className="flex md:order-2 z-50">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User settings" img={auth?.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{auth?.full_name}</span>
              <span className="block truncate text-sm font-medium">
                {auth?.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item
              onClick={() => navigate(`/profile/${auth?.user?.id}`)}
            >
              Dashboard
            </Dropdown.Item>
            <Dropdown.Item onClick={() => navigate("/settings")}>
              Settings
            </Dropdown.Item>
            <Dropdown.Item onClick={() => navigate("/earnings")}>
              Earnings
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
      )}

      <Navbar.Collapse className="lg:ml-72">
        {NAVIGATION_LINKS.map((link) => (
          <Fragment key={link.name}>
            {!link?.loggedIn && (
              <NavLink
                key={link.name}
                to={link.url}
                className="flex items-center font-normal hover:text-white hover:bg-blue-500 rounded-md hover:transition hover:duration-700 hover:ease-in-out"
              >
                {link.icon}
                <span className="ml-1">{link.name}</span>
              </NavLink>
            )}
          </Fragment>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
