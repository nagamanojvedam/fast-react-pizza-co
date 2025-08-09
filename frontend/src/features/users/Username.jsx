import { useSelector } from "react-redux";
import { getUsername } from "./userSlice";
import { Link } from "react-router-dom";

function Username() {
  const username = useSelector(getUsername);

  if (!username) return null;

  return (
    <Link to="/orders" className="hidden text-sm font-semibold md:block">
      {username}
    </Link>
  );
}

export default Username;
