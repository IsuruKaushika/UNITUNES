import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import Ad from "../components/ad/Ad";

function HomePage() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  const services = [
    {
      title: "Boardings",
      desc: "Find the perfect accommodation near campus",
      img: "/images/Bording.jpg",
      click: () => navigate("/boarding-list"),
    },
    {
      title: "Taxis",
      desc: "Book reliable rides at student-friendly rates",
      img: "/images/Taxi.jpg",
      click: () => navigate("/taxi-list"),
    },
    {
      title: "Medicare",
      desc: "Access healthcare services and medication",
      img: "/images/Medicine.jpg",
      click: () => navigate("/medi-select"),
    },
    {
      title: "Shops",
      desc: "Explore local eateries and campus stores",
      img: "/images/Food.jpg",
      click: () => navigate("/shop-select"),
    },
    {
      title: "Renting",
      desc: "Borrow equipment and essentials for your studies",
      img: "/images/Rental.jpg",
      click: () => navigate("/rent-items"),
    },
    {
      title: "Skill Sharing",
      desc: "Connect with peers for tutoring and skill exchange",
      img: "/images/Skill Sharing.jpg",
      click: () => navigate("/skill-list"),
    },
  ];

  const handleScrollToServices = () => {
    const element = document.getElementById("services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar setShowLogin={setShowLogin} />

      {/* Hero Section */}
      <div className="flex flex-col items-center  flex flex-col justify-center h-[40vh] bg-gradient-to-r from-indigo-700 to-orange-700 text-white text-center px-6">
       <div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight drop-shadow-md">
          UniTunes
        </h1>
        <h2 className="text-xl md:text-2xl mb-6 font-medium max-w-xl mx-auto">
          Smart Solutions for Smarter Undergraduates!
        </h2>
        <button
          className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-full shadow-md hover:bg-indigo-200 transition"
          onClick={handleScrollToServices}
        >
          View Menu
        </button>
     </div>
      </div>

      {/* Services Section - Horizontal Scroll */}
      <section id="services" className="py-20 bg-gray-100 px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 text-indigo-800">
          Our Services
        </h2>
        <div className="overflow-x-auto whitespace-nowrap space-x-6 flex scrollbar-thin scrollbar-thumb-indigo-400 pb-4">
          {services.map(({ title, desc, img, click }, index) => (
            <div
              key={index}
              className="inline-block bg-white rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 hover:scale-[1.02] transition duration-300 cursor-pointer w-80 min-w-[18rem] mx-2"
              onClick={click}
            >
              <img
                src={img}
                alt={title}
                className="w-full h-44 object-cover rounded-t-xl"
              />
              <div className="p-5">
                <h3 className="text-2xl font-semibold text-indigo-700 mb-1">
                  {title}
                </h3>
                <p className="text-gray-600 text-sm">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ad Section */}
      <section className="py-10 bg-white">
        <Ad />
      </section>

      {/* About Section */}
      <section className="py-20 bg-indigo-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-indigo-700">
            About UniTunes
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            UniTunes is the ultimate campus companion designed specifically for
            undergraduate students. Our platform connects you with essential
            services to make your university life easier, more convenient, and
            more affordable.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">UniTunes</h3>
            <p className="text-sm text-gray-400">
              Empowering undergraduates with everyday campus essentials.
            </p>
          </div>
          <div className="space-y-2 text-sm">
            <a href="/about" className="hover:text-white transition">About Us</a>
            <a href="/contact" className="hover:text-white transition">Contact</a>
            <a href="/privacy" className="hover:text-white transition">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition">Terms of Service</a>
          </div>
          <div className="text-sm text-center md:text-right">
            © {new Date().getFullYear()} UniTunes. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
