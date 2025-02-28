import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import PregnantWomanSidebar from "../PregnantWoman/SideBar";
import PregnantWomanHeader from "../PregnantWoman/Header";
import ChwSideBar from "../CHW/SideBar";
import ChwHeader from "../CHW/Header";
import { AlignJustify, X } from "lucide-react";
import HospitalSidebar from "../Hospital/Sidebar";

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { auth } = useSelector((state) => state.auth);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getSidebar = () => {
    if (auth?.user?.role === "ADMIN") {
      return <Sidebar />;
    } else if (auth?.user?.role === "PREGNANT_WOMAN") {
      return <PregnantWomanSidebar />;
    } else if (auth?.user?.role === "HOSPITAL") {
      return <HospitalSidebar />;
    } else {
      return <ChwSideBar />;
    }
  };

  const getHeader = () => {
    if (auth?.user?.role === "ADMIN") {
      return <Header />;
    } else if (auth?.user?.role === "PREGNANT_WOMAN") {
      return <PregnantWomanHeader />;
    } else if (auth?.user?.role === "HOSPITAL") {
      return <></>;
    } else {
      return <ChwHeader />;
    }
  };

  return (
    <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md"
      >
        {isSidebarOpen ? (
          <X size={34} className="text-white relative left-36" />
        ) : (
          <AlignJustify size={34} className="relative bottom-5" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        transition-transform duration-500 ease-in-out
        fixed lg:static
        h-full
        z-40
        lg:z-0
      `}
      >
        {getSidebar()}
      </div>

      {/* Main Content */}
      <div
        className={`
        flex flex-col flex-1
        transition-all duration-300 ease-in-out
        ${isSidebarOpen ? "lg:ml-0" : "ml-0"}
      `}
      >
        {getHeader()}
        <div className="flex-1 p-4 min-h-0 overflow-auto">
          <Outlet />
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}
