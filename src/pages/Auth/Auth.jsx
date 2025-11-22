import React, { useState } from "react";
import AuthNavbar from "../../components/navbar/authnavbar";
import "./auth.css";
import loaderLogo from "../../assets/chitkara.jpg";


export default function Auth() {
  const [showLogin, setShowLogin] = useState(true);
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [loading, setLoading] = useState(false);

  // ---------------- LOGIN ----------------
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    if (!email || !password) {
      setLoginError("Please enter both fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      setTimeout(() => {
        setLoading(false);
        if (data.success) {
          window.location.href = "/";
        } else {
          setLoginError(data.message || "Incorrect email or password");
        }
      }, 800);
    } catch (err) {
      setLoading(false);
      setLoginError("Server error. Please try again later.");
    }
  };

  // ---------------- REGISTER ----------------
  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError("");

    const formData = {
      fullname: e.target.fullname.value.trim(),
      roll: e.target.roll.value.trim(),
      batch: e.target.batch.value,
      course: e.target.course.value,
      email: e.target.email.value.trim(),
      password: e.target.password.value.trim(),
    };

    if (Object.values(formData).some(v => !v)) {
      setRegisterError("Please fill out all fields.");
      return;
    }

    if (!/^[^@]+@[^@]+\.[^@]+$/.test(formData.email)) {
      setRegisterError("Enter a valid email.");
      return;
    }

    if (formData.password.length < 6) {
      setRegisterError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      setTimeout(() => {
        setLoading(false);
        if (data.success) {
          setShowLogin(true);
          setLoginError("Registration successful! Please login.");
        } else {
          setRegisterError(data.message || "Registration failed");
        }
      }, 800);
    } catch (err) {
      setLoading(false);
      setRegisterError("Server error. Try again later.");
    }
  };

  const togglePassword = (id) => {
    const field = document.getElementById(id);
    if (field) field.type = field.type === "password" ? "text" : "password";
  };

  return (
    <>
      <AuthNavbar />
      <div style={{ paddingTop: 80 }} />

      <div className="login-container">
        <div className="login-wrapper">
          <div className="login-hero">
            <div className="hero-content">
              <h1>Campus Journey Begins Here</h1>
              <p>Discover events, connect with peers, and make the most of your campus life</p>

              <div className="stats-mini">
                <div className="stat-item">
                  <span className="stat-number">100+</span>
                  <span className="stat-label">Campus Events</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">30+</span>
                  <span className="stat-label">Student Clubs</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Campus Access</span>
                </div>
              </div>
            </div>
          </div>

          <div className="login-form-section">
            <div className="form-container">
              <div className="tab-nav">
                <button className={showLogin ? "active" : ""} 
                        onClick={() => { setShowLogin(true); setLoginError(""); setRegisterError(""); }}>
                  Login
                </button>
                <button className={!showLogin ? "active" : ""} 
                        onClick={() => { setShowLogin(false); setLoginError(""); setRegisterError(""); }}>
                  Register
                </button>
              </div>

              {/* ---------------- LOGIN FORM ---------------- */}
              {showLogin ? (
                <form className="login-form" onSubmit={handleLogin}>
                  <div className="form-header">
                    <h2>Student Login</h2>
                    <p>Enter your details to access your account</p>
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <div className="input-wrapper">
                      <i className="fas fa-user"></i>
                      <input name="email" type="email" placeholder="Enter your email" required />
                    </div>
                  </div>

                  <div className="form-group password-wrapper">
                    <label>Password</label>
                    <div className="input-wrapper">
                      <input id="login-password" name="password" type="password" placeholder="Enter your password" required />
                      <span className="password-toggle" onClick={() => togglePassword("login-password")}>
                        <i className="fa fa-eye"></i>
                      </span>
                    </div>
                  </div>

                  <div className="error-message">{loginError}</div>
                  <button type="submit" className="login-btn">Login to Chitkara Diaries</button>
                </form>
              ) : (
                /* ---------------- REGISTER FORM ---------------- */
                <form className="login-form" onSubmit={handleRegister}>
                  <div className="form-header">
                    <h2>Create Account</h2>
                    <p>Sign up to get started</p>
                  </div>

                  <div className="form-group">
                    <label>Full Name</label>
                    <div className="input-wrapper">
                      <i className="fas fa-user"></i>
                      <input name="fullname" type="text" placeholder="Enter your full name" required />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Roll Number</label>
                    <div className="input-wrapper">
                      <i className="fas fa-id-card"></i>
                      <input name="roll" type="text" placeholder="Enter roll number" required />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Batch Year</label>
                    <div className="input-wrapper">
                      <i className="fas fa-calendar"></i>
                      <select name="batch" required defaultValue="">
                        <option value="" disabled>Select batch year</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Course</label>
                    <div className="input-wrapper">
                      <i className="fas fa-graduation-cap"></i>
                      <select name="course" required defaultValue="">
                        <option value="" disabled>Select your course</option>
                        <option value="B.Tech">B.Tech</option>
                        <option value="BCA">BCA</option>
                        <option value="MBA">MBA</option>
                        <option value="M.Tech">M.Tech</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <div className="input-wrapper">
                      <i className="fas fa-envelope"></i>
                      <input name="email" type="email" placeholder="Enter your email" required />
                    </div>
                  </div>

                  <div className="form-group password-wrapper">
                    <label>Password</label>
                    <div className="input-wrapper">
                      <input id="register-password" name="password" type="password" placeholder="Create your password" required />
                      <span className="password-toggle" onClick={() => togglePassword("register-password")}>
                        <i className="fa fa-eye"></i>
                      </span>
                    </div>
                  </div>

                  <div className="error-message">{registerError}</div>
                  <button type="submit" className="login-btn">Create Account</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div id="loader" className="loader-overlay">
          <img src={loaderLogo} alt="Loading..." className="loader-logo" />
          <div className="loader-text">Processing...</div>
        </div>
      )}
    </>
  );
}
