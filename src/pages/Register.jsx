import React, { useState } from "react";
import { register } from "../services/auth.services";
import { Link, useNavigate } from "react-router";
import LoginImg from "../assets/images/login.jpg"

const Register = () => {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData, // kita spread agar properti yang lainya tidak tertimpa, maka kita perlu juga ambil semua propertinya, ingat state object di react itu di replace bukan merge
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Password dan Confirm Password tidak cocok!");
      return;
    }

    // console.log("Register data:", formData);
    const response = await register(formData);

    if (response.status === 201) {
      alert("registrasi berhasil");
      navigate("/login");
    } else {
      alert("gagal registrasi");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-5xl bg-card rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 m-8">

        {/* kiri FORM */}
        <div className="flex flex-col justify-center px-8 py-8 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <div className="text-center mb-5">
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
                  htmlFor="nama"
                  className="block text-sm font-medium text-foreground"
                >
                  Nama
                </label>
                <input
                  id="nama"
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  placeholder="masukkan email..."
                  className="w-full h-12 px-4 rounded-lg border border-black/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>

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

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="Confirm Password"
                    className="block text-sm font-medium text-foreground"
                  >
                    Confirm Password
                  </label>
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="confirm password..."
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

            <div className="grid grid-cols-3 gap-3">
              <button className="h-12 flex items-center justify-center border border-black/20 rounded-lg hover:bg-muted transition-colors">
                <svg
                  className="w-5 h-5 text-foreground"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                </svg>
              </button>
              <button className="h-12 flex items-center justify-center border border-black/20 rounded-lg bg-secondary hover:bg-muted transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </button>
              <button className="h-12 flex items-center justify-center border border-black/20 rounded-lg bg-secondary hover:bg-muted transition-colors">
                <svg
                  className="w-5 h-5 text-foreground"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </button>
            </div>

            <p className="text-center mt-8 text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to={"/login"}
                className="text-foreground font-medium hover:underline"
              >
                Sign In
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

export default Register;