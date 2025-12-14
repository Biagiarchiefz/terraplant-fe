import React from 'react';
import bungaregister from "../assets/images/register.webp";

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Simulasi Register berhasil!');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F8F8F8] p-10 sm:p-4 md:p-10">

      <div className="flex w-full max-w-[1000px] overflow-hidden rounded-2xl bg-white shadow-xl shadow-gray-300/50">

        <div className="hidden flex-1 flex-col items-center justify-center border-r border-[#D3D3D3] p-12 lg:flex">

          <div className="mb-5 flex h-[350px] w-full items-center justify-center rounded-xl bg-[#E6F4EA] text-lg font-bold text-[#1A4C40]">
            <img
              src={bungaregister}
              alt="register"
              className="w-full max-w-lg h-95 object-cover"
            />
          </div>

          <p className="text-center text-sm text-[#4A8574]">
            Bergabunglah dengan kami! Buat akun untuk memulai perjalanan Anda.
          </p>
        </div>

        <div className="flex-1 p-10 sm:p-12 md:p-14 lg:p-12 text-left">

          <h1 className="mb-2 text-4xl font-bold text-[#1A4C40]">Create Account</h1>

          <p className="mb-10 text-base text-[#4A8574]">Sign up to start your journey!</p>

          <form onSubmit={handleSubmit}>

            <label className="mb-2 mt-4 block text-sm font-semibold text-[#333]" htmlFor="username">Username</label>
            <div className="flex items-center rounded-lg border border-[#D3D3D3] bg-white p-3 transition duration-300 focus-within:border-[#4A8574]">
              <input
                className="w-full flex-grow border-none bg-transparent px-3 text-base text-[#333] outline-none"
                type="text"
                id="username"
                placeholder="Buat Username Anda"
                required
              />
            </div>

            <label className="mb-2 mt-4 block text-sm font-semibold text-[#333]" htmlFor="emailOrPhone">Email or Phone Number</label>
            <div className="flex items-center rounded-lg border border-[#D3D3D3] bg-white p-3 transition duration-300 focus-within:border-[#4A8574]">
              <input
                className="w-full flex-grow border-none bg-transparent px-3 text-base text-[#333] outline-none"
                type="text"
                id="emailOrPhone"
                placeholder="example@gmail.com"
                required
              />
            </div>

            <label className="mb-2 mt-4 block text-sm font-semibold text-[#333]" htmlFor="password">Password</label>
            <div className="flex items-center rounded-lg border border-[#D3D3D3] bg-white p-3 transition duration-300 focus-within:border-[#4A8574]">
              <input
                className="w-full flex-grow border-none bg-transparent px-3 text-base text-[#333] outline-none"
                type="password"
                id="password"
                placeholder="Buat Kata Sandi"
                required
              />
            </div>

            <label className="mb-2 mt-4 block text-sm font-semibold text-[#333]" htmlFor="confirm-password">Confirm Password</label>
            <div className="flex items-center rounded-lg border border-[#D3D3D3] bg-white p-3 transition duration-300 focus-within:border-[#4A8574]">
              <input
                className="w-full flex-grow border-none bg-transparent px-3 text-base text-[#333] outline-none"
                type="password"
                id="confirm-password"
                placeholder="Konfirmasi Kata Sandi"
                required
              />
            </div>

            <button
              className="w-full cursor-pointer rounded-lg bg-gradient-to-r from-[#4A8574] to-[#1A4C40] p-4 text-lg font-bold uppercase text-white shadow-lg shadow-[#4A8574]/40 transition duration-300 hover:opacity-90 mt-8"
              type="submit"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-5 text-center text-base text-gray-600">
            Sudah punya akun?
            <a className="ml-1 font-bold text-[#4A8574] hover:underline" href="/login">Log In here</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;