import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaChevronLeft, FaChevronRight, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";

import { CategoryConstants } from "../../utils/CategoryConstants";

const CategoryCardSlider = () => {
  return (
    <div className="relative w-[95%] mx-auto py-6">
      <div className="flex items-end justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          Shop by Category
        </h2>

        <div className="hidden sm:flex items-center gap-2">
          <div className="category-prev cursor-pointer w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center transition-colors hover:bg-gray-900 hover:text-white hover:border-gray-900">
            <FaChevronLeft size={14} />
          </div>
          <div className="category-next cursor-pointer w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center transition-colors hover:bg-gray-900 hover:text-white hover:border-gray-900">
            <FaChevronRight size={14} />
          </div>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: ".category-prev",
          nextEl: ".category-next",
        }}
        spaceBetween={20}
        slidesPerView={2.2}
        breakpoints={{
          480: { slidesPerView: 2.4 },
          640: { slidesPerView: 3.2 },
          1024: { slidesPerView: 4.2 },
          1280: { slidesPerView: 5 },
        }}
        className="category-swiper pt-6! pb-2!"
      >
        {CategoryConstants.map((category) => (
          <SwiperSlide key={category.id}>
            <Link
              to={`/products?category=${category.name}`}
              className="group relative block w-full text-left focus:outline-none"
            >
              {/* Base card */}
              <div className="relative h-36 sm:h-40 rounded-2xl border border-gray-200 bg-white px-5 py-4 flex flex-col justify-end shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:border-gray-300 group-focus-visible:ring-2 group-focus-visible:ring-gray-900 group-focus-visible:ring-offset-2">
                <span className="text-base sm:text-lg font-semibold text-gray-900 leading-snug">
                  {category.name}
                </span>
                <span className="text-xs text-gray-400 mt-0.5">
                  Shop now
                </span>
              </div>

              {/* Overlapping image, popping outside the card's top-right corner */}
              <div className="pointer-events-none absolute -top-6 right-2 w-24 h-24 sm:w-28 sm:h-28 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}

        {/* Trailing card: more categories */}
        <SwiperSlide>
          <Link
            to="/products"
            className="group relative flex h-36 sm:h-40 w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-gray-300 bg-gray-50 text-center transition-all duration-300 hover:border-gray-900 hover:bg-gray-900"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-300 text-gray-700 transition-all duration-300 group-hover:bg-white group-hover:border-white group-hover:translate-x-1">
              <FaArrowRight size={14} />
            </span>
            <span className="text-sm font-semibold text-gray-700 transition-colors duration-300 group-hover:text-white">
              More Categories
            </span>
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default CategoryCardSlider;