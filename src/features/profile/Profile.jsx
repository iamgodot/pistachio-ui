import { getUser } from "../../services/backendApi";
import { useLoaderData } from "react-router-dom";
import UserElement from "./UserElement";

export default function Profile() {
  const user = useLoaderData();
  return <UserElement user={user} />;
}

export async function loader() {
  const user = getUser();
  return user;
}
