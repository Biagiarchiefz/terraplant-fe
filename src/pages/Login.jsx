import React, { useState } from "react";
import { login, googleLogin } from "../services/auth.services";
import { Link, useNavigate } from "react-router";
import useAuthStore from "../store/useAuthStore";
import LoginImg from "../assets/images/login.jpg";
import { alertError, alertSucces } from "../lib/alert";
import { useGoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const navigate = useNavigate();
  const authLogin = useAuthStore((state) => state.login);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error untuk field yang sedang diubah
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

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

      // Tangkap error dari backend
      if (error.response?.status === 400 && error.response?.data?.error) {
        const errorMessage = error.response.data.error;

        // Mapping error message ke field yang sesuai
        if (errorMessage.toLowerCase().includes("email")) {
          setErrors({ email: errorMessage });
        } else if (errorMessage.toLowerCase().includes("password")) {
          setErrors({ password: errorMessage });
        } else {
          await alertError(errorMessage);
        }
      } else {
        await alertError("Login Gagal");
      }
    }
  };

  const googleLoginHandler = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsGoogleLoading(true);
      try {
        const response = await googleLogin(tokenResponse.access_token);
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
      } finally {
        setIsGoogleLoading(false);
      }
    },
    onError: () => {
      alertError("Login dengan Google Gagal");
    },
  });

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-5xl bg-card rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 ">
        {/* kiri FORM */}
        <div className="flex flex-col justify-center px-8 py-12 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Selamat Datang
              </h1>
              <p className="text-muted-foreground">
                Akses akun Terraplant Anda sekarang
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
                  placeholder="Masukkan email..."
                  className={`w-full h-12 px-4 rounded-lg border ${
                    errors.email ? "border-red-500" : "border-black/20"
                  } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
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
                    Lupa password?
                  </a>
                </div>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Masukkan password..."
                  className={`w-full h-12 px-4 rounded-lg border ${
                    errors.password ? "border-red-500" : "border-black/20"
                  } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                  required
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
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
                Atau lanjutkan dengan
              </span>
            </div>

            {/* Google Login Button */}
            <div className="mb-5">
              <button
                type="button"
                onClick={() => googleLoginHandler()}
                disabled={isGoogleLoading}
                className="h-12 w-full flex items-center justify-center gap-3 border border-black/20 rounded-lg bg-white hover:bg-gray-50 hover:cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGoogleLoading ? (
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                ) : (
                  <>
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
                    <span className="text-sm font-medium text-foreground">
                      Continue with Google
                    </span>
                  </>
                )}
              </button>
            </div>

            <p className="text-center mt-8 text-muted-foreground">
              Belum punya akun?{" "}
              <Link
                to={"/register"}
                className="text-foreground font-medium hover:underline"
              >
                Registrasi
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
