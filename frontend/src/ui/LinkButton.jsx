import { Link, useNavigate } from "react-router-dom";

function LinkButton({ to, children }) {
  const navigate = useNavigate();
  const styles = "hover:text-blue-600 text-sm text-blue-500";

  if (to === "-1")
    return (
      <button className={styles} onClick={() => navigate(-1)}>
        {children}
      </button>
    );

  return (
    <Link to={to} className={styles}>
      {children}
    </Link>
  );
}

export default LinkButton;
