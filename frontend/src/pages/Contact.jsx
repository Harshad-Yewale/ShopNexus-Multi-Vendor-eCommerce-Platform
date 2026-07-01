import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <section className="bg-slate-950 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold">
            Contact <span className="text-blue-500">ShopNexus</span>
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-300 leading-8">
            Have a question, feedback, or need assistance? Our team is here to
            help. Reach out to us anytime and we'll get back to you as soon as
            possible.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Information */}
          <div className="bg-slate-900 text-white rounded-2xl p-8 md:p-10 shadow-lg">
            <h2 className="text-3xl font-bold mb-6">
              Get In Touch
            </h2>

            <p className="text-slate-300 leading-8 mb-10">
              We'd love to hear from you. Whether you have a question about
              your order, our services, or simply want to share feedback, feel
              free to contact us.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-blue-600 p-3 rounded-lg">
                  <FaPhone className="text-xl" />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Phone</h3>
                  <p className="text-slate-300 mt-1">
                    +91 98765 4327
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-600 p-3 rounded-lg">
                  <FaEnvelope className="text-xl" />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p className="text-slate-300 mt-1">
                    support@shopnexus.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-600 p-3 rounded-lg">
                  <FaMapMarkerAlt className="text-xl" />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Address</h3>
                  <p className="text-slate-300 mt-1">
                    Mumbai, Maharashtra, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-600 p-3 rounded-lg">
                  <FaClock className="text-xl" />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    Working Hours
                  </h3>
                  <p className="text-slate-300 mt-1">
                    Monday - Saturday
                    <br />
                    9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Send us a Message
            </h2>

            <p className="text-slate-600 mb-8">
              Fill out the form below and our team will respond as soon as
              possible.
            </p>

            <form className="space-y-6">
              <div>
                <label className="block mb-2 font-medium text-slate-700">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-slate-700">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-slate-700">
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="Enter subject"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-slate-700">
                  Message
                </label>

                <textarea
                  rows={6}
                  placeholder="Write your message..."
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-lg shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ / Support */}
      <section className="bg-slate-950 text-white py-16">
        <div className="max-w-5xl mx-auto px-5 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need Help?
          </h2>

          <p className="text-slate-300 text-lg leading-8">
            Our support team is committed to providing quick and reliable
            assistance. We aim to respond to all inquiries within 24 business
            hours and ensure every customer has a smooth experience with
            ShopNexus.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;

