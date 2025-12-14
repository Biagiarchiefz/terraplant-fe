import React from 'react';
import bungalogin from "../assets/images/bunga.webp";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Simulasi Login berhasil!');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F8F8F8] p-10 sm:p-4 md:p-10">

      <div className="flex w-full max-w-[1000px] overflow-hidden rounded-2xl bg-white shadow-xl shadow-gray-300/50">

        <div className="hidden flex-1 flex-col items-center justify-center border-r border-[#D3D3D3] p-12 lg:flex">

          <div className="mb-5 flex h-[350px] w-full items-center justify-center rounded-xl bg-[#E6F4EA] text-lg font-bold text-[#1A4C40]">
            <img
              src={bungalogin}
              alt="login"
              className="w-full max-w-lg h-95 object-cover"
            />
          </div>

          <p className="text-center text-[#333]">
            Satu Akar, Seribu Janji: Lambang Kesetiaan yang Tak Lekang Waktu
          </p>
        </div>

        <div className="flex-1 p-10 sm:p-12 md:p-14 lg:p-12 text-left">

          <h1 className="mb-2 text-4xl font-bold text-[#1A4C40]">Getting Started</h1>

          <p className="mb-10 text-base text-[#4A8574]">Let's login for explore continues</p>

          <form onSubmit={handleSubmit}>

            <label className="mb-2 mt-5 block text-sm font-semibold text-[#333]" htmlFor="emailOrPhone">Email or Phone Number</label>

            <div className="flex items-center rounded-lg border border-[#D3D3D3] bg-white p-3 transition duration-300 focus-within:border-[#4A8574]">
              <input
                className="w-full flex-grow border-none bg-transparent px-3 text-base text-[#333] outline-none"
                type="text"
                id="emailOrPhone"
                placeholder="example@gmail.com"
                required
                defaultValue=""
              />
            </div>

            <label className="mb-2 mt-5 block text-sm font-semibold text-[#333]" htmlFor="password">Password</label>

            <div className="flex items-center rounded-lg border border-[#D3D3D3] bg-white p-3 transition duration-300 focus-within:border-[#4A8574]">

              <input
                className="w-full flex-grow border-none bg-transparent px-3 text-base text-[#333] outline-none"
                type="password"
                id="password"
                placeholder="••••••"
                required
                defaultValue=""
              />
              <button
                className="ml-2 cursor-pointer border-none bg-transparent text-sm font-medium text-[#E74C3C]"
                type="button"
              >
                View
              </button>
            </div>

            <div className="mb-7 mt-3 text-right">
              <a className="text-sm text-[#E74C3C] hover:underline" href="/forgot-password">Forgot Password?</a>
            </div>

            <button
              className="w-full cursor-pointer rounded-lg bg-gradient-to-r from-[#4A8574] to-[#1A4C40] p-4 text-lg font-bold uppercase text-white shadow-lg shadow-[#4A8574]/40 transition duration-300 hover:opacity-90"
              type="submit"
            >
              Sign In
            </button>
          </form>

          <p className="mt-5 text-center text-base text-gray-600">
            Don't have an account?
            <a className="ml-1 font-bold text-[#4A8574] hover:underline" href="/register">Sign Up here</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;