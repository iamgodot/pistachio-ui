import { Link } from "react-router-dom";
import { getUser } from "../services/backendApi";
import { useLoaderData } from "react-router-dom";

const DropdownUser = () => {
  const user = useLoaderData();
  return (
    <div className="relative">
      <Link className="flex items-center gap-4" to="profile">
        <span className="text-right block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {user.nickname}
          </span>
          <span className="block text-xs">{user.email}</span>
        </span>

        <img src={user.avatar} alt="User" className="h-12 w-12 rounded-full" />
      </Link>
    </div>
  );
};

export async function loader() {
  const user = await getUser();
  return user;
}

export default DropdownUser;
