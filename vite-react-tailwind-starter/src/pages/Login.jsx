import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import ButtonSpinner from "../components/ButtonSpinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) navigate("/");
  }, []);

const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const res = await axios.post("http://localhost:8080/api/v1/auth/login", {
      email,
      password,
    });

    Cookies.set("token", res.data.token, { expires: 1 });
    toast.success("Login successful!");

    // ✅ Force full page reload to /landing
    window.location.href = "/landing";
  } catch (error) {
    console.error(error);
    toast.error("Login failed. Please check your credentials.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex justify-center items-center bg-black">
      <form
        onSubmit={handleLogin}
        className="bg-[#121212] p-8 rounded-xl shadow-md min-h-96 max-w-1/2"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 bg-black border border-white text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 bg-black border border-white text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-1/2 bg-black border border-white text-white p-3 rounded hover:bg-white hover:border-black hover:text-black transition flex justify-center items-center gap-2"
          disabled={loading}
        >
          {loading ? (
            <>
              <ButtonSpinner />
              <span>Logging in...</span>
            </>
          ) : (
            "Login"
          )}
        </button>
        <p className="text-sm mt-4 text-center">
            Don't have an account?{" "}
            <a href="/register" className="text-indigo-600 hover:underline">
            Register
            </a>
        </p>
      </form>

    </div>
  );
};

export default Login;
