import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  EffectFade,
  Navigation,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { Link } from "react-router-dom";
import { bannerLists } from "../../utils/bannerItems";
import { FaArrowLeft, FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const colors = [
  "bg-banner-color1",
  "bg-banner-color2",
  "bg-banner-color3",
  "bg-banner-color4",
];

const HeroBanner = () => {
  return (
    <div className="w-[95%] sm:w-[98%] mt-3 sm:mt-4.5 mx-auto relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl">

      {/* Custom Navigation */}
      <div className="hero-prev">
        <FaChevronLeft size={16} strokeWidth={2.5} />
      </div>

      <div className="hero-next">
        <FaChevronRight size={16} strokeWidth={2.5} />
      </div>

      <Swiper
        modules={[
          Pagination,
          EffectFade,
          Navigation,
          Autoplay,
        ]}
        effect="fade"
        speed={900}
        loop
        grabCursor
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={{
          prevEl: ".hero-prev",
          nextEl: ".hero-next",
        }}
        className="hero-swiper"
      >
        {bannerLists.map((item, i) => (
          <SwiperSlide key={item.id}>
            <div
              className={`relative flex items-center min-h-95 h-[60vh] max-h-115 sm:h-120 md:h-130 md:max-h-none ${colors[i]}`}
            >
              <div className="absolute inset-0 bg-linear-to-b sm:bg-linear-to-r from-black/45 sm:from-black/40 via-black/15 sm:via-black/10 to-black/10 sm:to-transparent" />

              <div className="relative z-10 flex flex-col-reverse sm:flex-row justify-end sm:justify-between items-center w-full h-full px-5 sm:px-8 lg:px-16 py-6 sm:py-0 gap-4 sm:gap-0">

                {/* LEFT */}
                <div className="max-w-xl text-center sm:text-left">

                  <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/15 backdrop-blur-md text-white text-xs sm:text-sm font-medium">
                    Featured Collection
                  </span>

                  <h1 className="mt-3 sm:mt-5 text-2xl sm:text-4xl lg:text-6xl font-bold text-white leading-tight">
                    {item.subtitle}
                  </h1>

                  <p className="mt-2 sm:mt-5 text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed sm:leading-8 max-w-xs sm:max-w-md mx-auto sm:mx-0">
                    {item.description}
                  </p>

                  <Link
                    to={`/products?${encodeURIComponent(item.Path.name)}=${encodeURIComponent(item.Path.value)}`}
                    className="inline-flex items-center gap-2 mt-4 sm:mt-8 bg-white text-black px-5 py-2.5 sm:px-7 sm:py-3 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 hover:bg-black hover:text-white"
                    
                  >
                    Shop Now <FaArrowRight/>
                  </Link>

                </div>

                {/* RIGHT */}
                <div className="flex w-full sm:w-1/2 justify-center shrink-0">

                  <img
                    src={item.image}
                    alt={item.subtitle}
                    className="max-h-35 sm:max-h-75 lg:max-h-97.5 object-contain transition duration-500 sm:hover:scale-105"
                  />

                </div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
            .hero-prev,
            .hero-next{
                position:absolute;
                top:50%;
                transform:translateY(-50%);
                z-index:10;

                width:24px;
                height:32px;

                display:flex;
                align-items:center;
                justify-content:center;

                border-radius:10px;
                padding:2px;

                background:rgba(255,255,255,.52);

                backdrop-filter:blur(14px);

                box-shadow:
                    0 12px 30px rgba(0,0,0,.12);

                cursor:pointer;

                transition:.3s;
            }

            .hero-prev{
                left:8px;
            }

            .hero-next{
                right:8px;
            }

            .hero-prev:hover,
            .hero-next:hover{
                background:#111827;
                color:white;
                transform:translateY(-50%) scale(1.08);
            }

            .hero-swiper .swiper-pagination{
                bottom:10px;
            }

            .hero-swiper .swiper-pagination-bullet{
                width:7px;
                height:7px;
                background:white;
                opacity:.45;
                transition:.3s;
            }

            .hero-swiper .swiper-pagination-bullet-active{
                width:22px;
                border-radius:999px;
                opacity:1;
            }

            @media(min-width:640px){

            .hero-prev,
            .hero-next{
                width:28px;
                height:38px;
                border-radius:12px;
            }

            .hero-prev{
                left:14px;
            }

            .hero-next{
                right:14px;
            }

            .hero-swiper .swiper-pagination{
                bottom:20px;
            }

            .hero-swiper .swiper-pagination-bullet{
                width:10px;
                height:10px;
            }

            .hero-swiper .swiper-pagination-bullet-active{
                width:32px;
            }

            }
      `}</style>

    </div>
  );
};

export default HeroBanner;