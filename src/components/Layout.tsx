import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      {/* Here can be shared content  */}
      <Outlet />
      {/* Here can be shared content, like this: <CheckAuth/> */}
    </div>
  );
}

export { Layout }