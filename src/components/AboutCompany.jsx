import React from "react";
import Title from "../components/Title";
import Img from "../assets/images/CompanyImg.webp";

const AboutCompany = () => {
  return (
    <div className="pl-6 md:pl-16 lg:pl-50 pt-10 pb-[100px] md:pb-[200px]">
      <div className="flex flex-col gap-14 md:flex-row relative">
        <div className="flex flex-col gap-6">
          <Title title="Company" />
          <p className="pr-4 md:max-w-160">
            Kami adalah toko tanaman yang berfokus menghadirkan keindahan dan 
            kesegaran alam ke setiap ruang maupun diluar ruangan. Dengan pilihan tanaman hias berkualitas dan 
            perawatan yang tepat, kami membantu menciptakan suasana yang lebih hidup, nyaman, 
            dan menenangkan di rumah maupun di tempat kerja Anda. Setiap tanaman dipilih dengan 
            penuh perhatian agar tumbuh sehat dan tahan lama.
          </p>
        </div>

        <img
          src={Img}
          alt=""
          className=" max-w-[500px] md:absolute right-0 top-0"
        />
      </div>
    </div>
  );
};

export default AboutCompany;
