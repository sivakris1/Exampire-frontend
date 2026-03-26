import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/client";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();

  const [loading,setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
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
      await registerUser(form);
      toast.success("Registered successful ✅");
      navigate("/login");
    } catch (err) {
      const message =
      err.response?.data?.message || "Registration failed ❌";

    toast.error(message);
    }finally{
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Signup</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

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

        {loading ? "Loading" : <button type="submit">Signup</button>}
      </form>
    </div>
  );
};

export default Signup;