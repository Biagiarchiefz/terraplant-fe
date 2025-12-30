import React, { useState } from "react";
import { register } from "../services/auth.services";
import { Link, useNavigate } from "react-router";
import LoginImg from "../assets/images/login.jpg";
import { alertError, alertSucces } from "../lib/alert";

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
      await alertSucces("Registrasi Berhasil");
      navigate("/login");
    } else {
      await alertError("Registrasi Gagal");
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
                  placeholder="masukkan nama..."
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
                Registrasi
              </button>
            </form>

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
