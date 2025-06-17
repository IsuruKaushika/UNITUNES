import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import Ad from "../components/ad/Ad";


function HomePage() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  const handleBoardingClick = () => navigate("/boarding-list");
  const handleTaxiClick = () => navigate("/taxi-list");
  const handleMedicareClick = () => navigate("/medi-select");
  const handleShopClick = () => navigate("/shop-select");
  const handleRentingClick = () => navigate("/rent-items");
  const handleSkillSharingClick = () => navigate("/skill-list");

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
      <header className="relative flex flex-col items-center justify-center h-[90vh] bg-gradient-to-r from-indigo-700 to-purple-700 text-white text-center px-6">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0"></div>
        <div className="z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight drop-shadow-md">
            UniTunes
          </h1>
          <h2 className="color-red-900 text-xl md:text-2xl mb-6 font-medium max-w-xl mx-auto">
            Smart Solutions for Smarter Undergraduates!
          </h2>
          <button
            className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-full shadow-md hover:bg-indigo-200 transition"
            onClick={handleScrollToServices}
          >
            View Menu
          </button>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-14 text-indigo-800">
            Our Services
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Boardings",
                desc: "Find the perfect accommodation near campus",
                img: "/images/Bording.jpg",
                click: handleBoardingClick,
              },
              {
                title: "Taxis",
                desc: "Book reliable rides at student-friendly rates",
                img: "/images/Taxi.jpg",
                click: handleTaxiClick,
              },
              {
                title: "Medicare",
                desc: "Access healthcare services and medication",
                img: "/images/Medicine.jpg",
                click: handleMedicareClick,
              },
              {
                title: "Shops",
                desc: "Explore local eateries and campus stores",
                img: "/images/Food.jpg",
                click: handleShopClick,
              },
              {
                title: "Renting",
                desc: "Borrow equipment and essentials for your studies",
                img: "/images/Rental.jpg",
                click: handleRentingClick,
              },
              {
                title: "Skill Sharing",
                desc: "Connect with peers for tutoring and skill exchange",
                img: "/images/Skill Sharing.jpg",
                click: handleSkillSharingClick,
              },
            ].map(({ title, desc, img, click }, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow hover:shadow-2xl transition-transform transform hover:-translate-y-2 hover:scale-[1.01] overflow-hidden group cursor-pointer"
                onClick={click}
              >
                <img
                  src={img}
                  alt={title}
                  className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="p-5">
                  <h3 className="text-2xl font-semibold text-indigo-700 group-hover:text-indigo-900 transition">
                    {title}
                  </h3>
                  <p className="text-gray-600 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
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
