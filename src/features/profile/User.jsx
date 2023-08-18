import { getUserById } from "../../services/backendApi";
import UserElement from "./UserElement";
import { useLoaderData } from "react-router-dom";

export default function User() {
  const user = useLoaderData();
  return <UserElement user={user} />;
}

export async function loader({ params }) {
  const user = await getUserById(params.userId);
  return user;
}
