import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div style={{ width: "100%" }}>
      <Navbar />
      <Outlet />
    </div>
  );
};
export default MainLayout;
