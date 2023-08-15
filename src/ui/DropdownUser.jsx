import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const DropdownUser = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    (async () => {
      const response = await axios.get("/api/v1/user", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setUser(response.data);
      setLoading(false);
    })();
  }, []);
  return (
    <div className="relative">
      {loading ? (
        <Loader />
      ) : (
        <Link className="flex items-center gap-4" to="#">
          <span className="text-right block">
            <span className="block text-sm font-medium text-black dark:text-white">
              {user.nickname}
            </span>
            <span className="block text-xs">{user.email}</span>
          </span>

          <span className="h-12 w-12 rounded-full">
            <img src={user.avatar} alt="User" />
          </span>
        </Link>
      )}
    </div>
  );
};

function Loader() {
  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}

export default DropdownUser;
