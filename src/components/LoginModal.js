import React, { useState } from "react";

const LoginModal = ({ onClose, onAuth }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", username: "", password: "" });
  const [error, setError] = useState("");

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async () => {
    if (!validatePassword(formData.password)) {
      setError("Password must contain 1 uppercase, 1 special char, and be at least 8 characters long.");
      return;
    }

    try {
      const response = await fetch(`/api/${isLogin ? "login" : "signup"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || "Authentication failed");
        return;
      }
      
      onAuth(data.token);
      onClose();
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        {!isLogin && (
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        {error && <p className="error">{error}</p>}
        <button onClick={handleSubmit}>{isLogin ? "Login" : "Sign Up"}</button>
        <p onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
        </p>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default LoginModal;
