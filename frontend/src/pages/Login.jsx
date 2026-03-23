import { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { loginUser } from "../api/client";

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

      const token = res.data.token;

      localStorage.setItem("token", token);

      navigate("/");
    } catch (err) {
      setError("Invalid credentials");
      console.log(err.response.data );
    }finally{
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

        {loading ? 'Loading' : <button type="submit">Login</button>}
      </form>
    </div>
  );
};

export default Login;