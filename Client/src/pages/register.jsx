import { useState } from "react";
import "./register.css";

function Register({onHome, onLogin}) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    role: "Buyer",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch {
      alert("Unable to connect to the server.");
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="page-navigation">
          <a href="#" onClick={event => {
            event.preventDefault();
            onHome();}}
          >
            Home
          </a>
        </div>
        <h1>Agricultural Marketplace</h1>
        <h2>Create an Account</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="07XXXXXXXX or 01XXXXXXXX"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="Buyer">Buyer</option>
              <option value="Farmer">Farmer</option>
            </select>
          </div>

          <button type="submit">Register</button>
        </form>

        <p className="login-link">
          Already have an account?{""} 
          <a href="#" onClick={event => {
            event.preventDefault();
            onLogin();
          }}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;