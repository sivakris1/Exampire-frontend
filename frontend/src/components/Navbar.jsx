import { Link } from "react-router-dom";

const Navbar = () => {

  const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.reload();
};

  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      <Link to="/">Home</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;