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
      <header className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center px-4">
        <h1 className="text-5xl font-bold mb-4">UniTunes</h1>
        <h2 className="text-xl md:text-2xl mb-6">Smart Solutions for Smarter Undergraduates!</h2>
        <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition" onClick={handleScrollToServices}>
          View Menu
        </button>
      </header>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid gap-8 px-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {[
            { title: "Boardings", desc: "Find the perfect accommodation near campus", img: "/images/Bording.jpg", click: handleBoardingClick },
            { title: "Taxis", desc: "Book reliable rides at student-friendly rates", img: "/images/Taxi.jpg", click: handleTaxiClick },
            { title: "Medicare", desc: "Access healthcare services and medication", img: "/images/Medicine.jpg", click: handleMedicareClick },
            { title: "Shops", desc: "Explore local eateries and campus stores", img: "/images/Food.jpg", click: handleShopClick },
            { title: "Renting", desc: "Borrow equipment and essentials for your studies", img: "/images/Rental.jpg", click: handleRentingClick },
            { title: "Skill Sharing", desc: "Connect with peers for tutoring and skill exchange", img: "/images/Skill Sharing.jpg", click: handleSkillSharingClick }
          ].map(({ title, desc, img, click }, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition" onClick={click}>
              <img src={img} alt={title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-10 bg-white">
        <Ad />
      </section>

      {/* About Section */}
      <section className="py-16 bg-indigo-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">About UniTunes</h2>
          <p className="text-gray-700 text-lg">
            UniTunes is the ultimate campus companion designed specifically for undergraduate students. Our platform connects you with essential services to make your university life easier, more convenient, and more affordable.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="text-lg font-bold text-white">UniTunes</div>
          <div className="flex flex-col gap-2">
            <a href="/about" className="hover:underline">About Us</a>
            <a href="/contact" className="hover:underline">Contact</a>
            <a href="/privacy" className="hover:underline">Privacy Policy</a>
            <a href="/terms" className="hover:underline">Terms of Service</a>
          </div>
          <div className="text-sm mt-4 md:mt-0">
            © {new Date().getFullYear()} UniTunes. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}



export default HomePage;
