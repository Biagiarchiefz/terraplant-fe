import React, { useState } from "react";
import { login, googleLogin } from "../services/auth.services";
import { Link, useNavigate } from "react-router";
import useAuthStore from "../store/useAuthStore";
import LoginImg from "../assets/images/login.jpg";
import { alertError, alertSucces } from "../lib/alert";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const authLogin = useAuthStore((state) => state.login);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(formData);
      const { data, token } = response.data;

      authLogin(data, token);

      await alertSucces("Login Berhasil");

      // redirect berdasarkan role
      if (data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      await alertError("Login Gagal");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await googleLogin(credentialResponse.credential);
      const { data, token } = response.data;

      authLogin(data, token);

      await alertSucces("Login dengan Google Berhasil");

      // redirect berdasarkan role
      if (data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      await alertError("Login dengan Google Gagal");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-5xl bg-card rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 ">
        {/* kiri FORM */}
        <div className="flex flex-col justify-center px-8 py-12 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back
              </h1>
              <p className="text-muted-foreground">
                Login to your Acme Inc account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 mb-5">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="masukkan email..."
                  className="w-full h-12 px-4 rounded-lg border border-black/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-foreground"
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Forgot your password?
                  </a>
                </div>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="masukkan password..."
                  className="w-full h-12 px-4 rounded-lg border border-black/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity bg-[#034032] text-white"
              >
                Login
              </button>
            </form>

            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border mb-7">
              <span className="relative z-10 bg-background px-2 text-muted-foreground bg-white">
                Or continue with
              </span>
            </div>

            <div className="mb-5">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  alertError("Login dengan Google Gagal");
                }}
                theme="outline"
                size="large"
                width="100%"
                text="continue_with"
              />
            </div>

            <p className="text-center mt-8 text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to={"/register"}
                className="text-foreground font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Kanan gambar */}
        <div className="hidden lg:block relative">
          <img
            src={LoginImg}
            alt="Decorative plants on wooden shelves"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
