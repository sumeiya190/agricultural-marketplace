import { useState } from "react";
import "./login.css";

function Login({onHome, onRegister, onLoginSuccess}) {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    const response = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      onLoginSuccess();
    } else {
      alert(data.message);
    }
  } catch {
    alert("Unable to connect to the server.");
  }
};

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="page-navigation">
          <a href="#" onClick={event => {
            event.preventDefault();
            onHome();}}
          >
            Home
          </a>
        </div>
        <h1>Agricultural Marketplace</h1>
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="login-form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Login</button>
        </form>

        <p className="login-register-link">
          Don't have an account?{" "}
          <a href="#" onClick={event => {
            event.preventDefault();
            onRegister();
          }}>
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;