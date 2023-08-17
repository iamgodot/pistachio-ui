import { Outlet } from "react-router-dom";
export default function PostLayout() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 2xl:grid-cols-3 2xl:gap-7.5">
      <Outlet />
    </div>
  );
}
