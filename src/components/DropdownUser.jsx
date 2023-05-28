import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const DropdownUser = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .get("/api/v1/user", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        setUser(response.data);
      });
  }, []);
  return (
    <div className="relative">
      <Link className="flex items-center gap-4" to="#">
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {user && user.nickname}
          </span>
          <span className="block text-xs">{user && user.email}</span>
        </span>

        <span className="h-12 w-12 rounded-full">
          <img src={user && user.avatar} alt="User" />
        </span>
      </Link>
    </div>
  );
};

export default DropdownUser;
