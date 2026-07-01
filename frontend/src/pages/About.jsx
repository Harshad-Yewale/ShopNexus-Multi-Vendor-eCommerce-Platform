import {
  FaStore,
  FaShippingFast,
  FaShieldAlt,
  FaHandshake,
  FaGlobe,
  FaUsers,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <section className="bg-slate-950 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold">
            About <span className="text-blue-500">ShopNexus</span>
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-slate-300 text-lg leading-8">
            ShopNexus is a modern multi-vendor eCommerce marketplace built to
            connect customers with trusted sellers. Our platform makes online
            shopping simple, secure, and convenient while helping businesses
            reach customers from anywhere.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Our Story
            </h2>

            <p className="text-slate-600 leading-8 mb-5">
              ShopNexus was created with one simple vision: to bring buyers and
              sellers together on one trusted platform. Instead of searching
              across multiple stores, customers can discover a wide range of
              quality products from verified vendors in one convenient
              marketplace.
            </p>

            <p className="text-slate-600 leading-8">
              Whether you're looking for electronics, fashion, home essentials,
              or lifestyle products, ShopNexus provides a seamless shopping
              experience with secure payments, reliable delivery, and dedicated
              customer support.
            </p>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200"
              alt="Online Shopping"
              className="rounded-2xl shadow-xl w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
            Why Choose ShopNexus
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-slate-50 rounded-xl p-8 shadow hover:shadow-xl transition duration-300">
              <FaStore className="text-4xl text-blue-500" />

              <h3 className="text-xl font-semibold mt-5 mb-3">
                Trusted Sellers
              </h3>

              <p className="text-slate-600 leading-7">
                Shop confidently from verified vendors offering quality
                products across multiple categories.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-8 shadow hover:shadow-xl transition duration-300">
              <FaShippingFast className="text-4xl text-blue-500" />

              <h3 className="text-xl font-semibold mt-5 mb-3">
                Fast Delivery
              </h3>

              <p className="text-slate-600 leading-7">
                Reliable shipping with secure packaging and timely delivery to
                your doorstep.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-8 shadow hover:shadow-xl transition duration-300">
              <FaShieldAlt className="text-4xl text-blue-500" />

              <h3 className="text-xl font-semibold mt-5 mb-3">
                Secure Payments
              </h3>

              <p className="text-slate-600 leading-7">
                Every payment is protected through trusted payment gateways and
                advanced security.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-8 shadow hover:shadow-xl transition duration-300">
              <FaHandshake className="text-4xl text-blue-500" />

              <h3 className="text-xl font-semibold mt-5 mb-3">
                Customer First
              </h3>

              <p className="text-slate-600 leading-7">
                We focus on excellent customer support, easy returns, and a
                smooth shopping experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-blue-600 text-white rounded-2xl p-8 md:p-10">
            <FaGlobe className="text-5xl mb-6" />

            <h2 className="text-3xl font-bold mb-5">
              Our Mission
            </h2>

            <p className="leading-8">
              Our mission is to provide a secure and reliable marketplace where
              customers can discover quality products while helping sellers
              grow their businesses through technology and innovation.
            </p>
          </div>

          <div className="bg-slate-900 text-white rounded-2xl p-8 md:p-10">
            <FaUsers className="text-5xl text-blue-400 mb-6" />

            <h2 className="text-3xl font-bold mb-5">
              Our Vision
            </h2>

            <p className="leading-8 text-slate-300">
              We envision ShopNexus becoming a trusted destination for online
              shopping by creating a marketplace built on transparency,
              convenience, and exceptional customer experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-slate-950 text-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-5 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Our Core Values
          </h2>

          <p className="text-slate-300 text-lg leading-8">
            Trust, transparency, innovation, and customer satisfaction are at
            the heart of everything we do. We strive to create an online
            marketplace where customers shop with confidence and sellers grow
            with success.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Ready to Start Shopping?
          </h2>

          <p className="text-slate-600 text-lg leading-8 mb-10">
            Explore thousands of products from trusted sellers and enjoy a
            seamless online shopping experience with ShopNexus.
          </p>

          <Link to={"/products"} className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold px-8 py-3 rounded-lg shadow-lg">
            Browse Products
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;

