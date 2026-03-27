import { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { loginUser } from "../api/client";
import toast from "react-hot-toast";


const Login = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const from = location.state?.from || "/";

  const [loading,setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);
    const res = await loginUser(form);

    localStorage.setItem("token", res.data.token);

    console.log("FROM:", location.state?.from); // DEBUG

    navigate(from, { replace: true });

  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button disabled={loading}>
  {loading ? "Logging in..." : "Login"}
</button>
      </form>
    </div>
  );
};

export default Login;