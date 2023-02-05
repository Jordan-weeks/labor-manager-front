import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";

const DashLayout = () => {
  return (
    <>
      <DashHeader />
      <Outlet />
    </>
  );
};

export default DashLayout;
