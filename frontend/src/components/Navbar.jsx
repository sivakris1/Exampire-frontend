import { Link } from "react-router-dom";

const Navbar = () => {

  const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.reload();
};

  return (
    <div style={{
  display: "flex",
  justifyContent: "space-between",
  padding: "12px 20px",
  borderBottom: "1px solid #eee"
}}>
  <h2>Exampire</h2>

  <div style={{ display: "flex", gap: "15px" }}>
    <a href="/">Home</a>
    <a href="/exams">Exams</a>
    <a href="/saved">Saved</a>
  </div>
</div>
  );
};

export default Navbar;