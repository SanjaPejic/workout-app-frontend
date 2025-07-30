import { Outlet } from "react-router-dom";
import Header from "../shared/Header";

function HeaderLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default HeaderLayout;
