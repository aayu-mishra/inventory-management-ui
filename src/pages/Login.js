import { useState } from "react";
import { login } from "../services/Auth";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const login = async (username, password) => {
  const res = await api.post("/auth/login", { username, password });
  const token = res.data;
  localStorage.setItem("authToken", token);
  return token;
};

  

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const token = await login(credentials.username, credentials.password);

    if (token) {
      navigate("/products"); // redirect on success
    } else {
      setError("Login failed. No token received.");
    }
  } catch (err) {
    setError("Invalid username or password");
  }
};



  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
