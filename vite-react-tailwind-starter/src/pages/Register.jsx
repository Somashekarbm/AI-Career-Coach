import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ButtonSpinner from "../components/ButtonSpinner";
import sessionService from "../services/sessionService";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../services/firebase";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sessionService.register(form);
      toast.success("Registered successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Registration failed. Try a different email.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      
      // Extract user info from Google result
      const userData = {
        firstName: result.user.displayName?.split(' ')[0] || '',
        lastName: result.user.displayName?.split(' ').slice(1).join(' ') || ''
      };
      
      await sessionService.registerWithGoogle(idToken, userData);
      toast.success("Registered with Google!");
      setTimeout(() => {
        navigate("/landing");
      }, 1000);
    } catch (error) {
      console.error('Google registration error:', error);
      if (error.code === "auth/popup-closed-by-user") {
        toast.error("Google sign-in was cancelled.");
      } else if (error.response?.data) {
        toast.error(error.response.data);
      } else {
        toast.error("Google registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleRegister}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Register
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-white bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 dark:focus:border-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-white bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 dark:focus:border-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-white bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 dark:focus:border-blue-400"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-white bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 dark:focus:border-blue-400"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-200"
          >
            {loading ? <ButtonSpinner /> : "Register"}
          </button>
        </div>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition duration-200 mb-2"
            >
              Login here
            </button>
          </p>
        </div>
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={handleGoogleRegister}
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.22l6.85-6.85C36.68 2.7 30.74 0 24 0 14.82 0 6.73 5.8 2.69 14.09l7.98 6.2C12.36 13.41 17.73 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.6C43.98 37.13 46.1 31.3 46.1 24.55z"/><path fill="#FBBC05" d="M10.67 28.29c-1.13-3.36-1.13-6.97 0-10.33l-7.98-6.2C.99 15.1 0 19.41 0 24c0 4.59.99 8.9 2.69 12.24l7.98-6.2z"/><path fill="#EA4335" d="M24 48c6.74 0 12.42-2.23 16.56-6.07l-7.19-5.6c-2.01 1.35-4.59 2.15-7.37 2.15-6.27 0-11.64-3.91-13.33-9.29l-7.98 6.2C6.73 42.2 14.82 48 24 48z"/><path fill="none" d="M0 0h48v48H0z"/></g></svg>
            {loading ? <ButtonSpinner /> : "Sign up with Google"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
