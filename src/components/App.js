import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";

// Mock authentication function
const isAuthenticated = () => localStorage.getItem("auth") === "true";

// Login Page
const Login = ({ setAuth }) => {
  const handleLogin = () => {
    localStorage.setItem("auth", "true");
    setAuth(true);
  };

  return (
    <div className="main-container">
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

// Private Route Component
const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

// Home (Protected) Page
const Home = ({ setAuth }) => {
  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth(false);
  };

  return (
    <div className="main-container">
      <h2>Code Playground (Protected)</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

// App Component
const App = () => {
  const [auth, setAuth] = useState(isAuthenticated());

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/login">Login</Link>
        <p>Auth Status: {auth ? "Authenticated" : "You are not authenticated, Please login first"}</p>
      </nav>

      <Routes>
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/" element={<PrivateRoute element={<Home setAuth={setAuth} />} />} />
      </Routes>
    </Router>
  );
};

export default App;
