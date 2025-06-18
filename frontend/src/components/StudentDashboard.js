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
<header
  className="relative flex flex-col items-center justify-center h-[80vh] text-white text-center px-6 bg-cover bg-center"
  style={{ backgroundImage: "url('/images/back.jpg')" }}
>
  {/* Overlay to simulate transparency */}
  <div className="absolute inset-0 bg-white/60" />  {/* white overlay with transparency */}

  <div className="relative z-10 flex flex-col items-center justify-center">
    <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight text-orange-900">
      UniTunes
    </h1>
    <h2 className="text-xl md:text-2xl mb-6 font-medium max-w-xl mx-auto text-gray-800">
      Smart Solutions for Smarter Undergraduates!
    </h2>
    <button
      className="px-6 py-3 bg-white text-orange-600 font-semibold rounded-full shadow-md hover:bg-orange-200 transition"
      onClick={handleScrollToServices}
    >
      View Menu
    </button>
  </div>
</header>




  {/* Services Section - Improved */}
<section id="services" className="py-20 bg-orange-50 px-4 sm:px-6 lg:px-8">
  <div className="text-center mb-14">
    <h2 className="text-4xl font-bold text-orange-500 relative inline-block">
      Our Services
      <span className="block h-1 w-24 bg-orange-400 rounded-full mt-2 mx-auto"></span>
    </h2>
  </div>


  {/* Responsive Layout: horizontal scroll on mobile, grid on md+ */}
  <div className="flex md:grid md:grid-cols-3 gap-8 overflow-x-auto scrollbar-thin scrollbar-thumb-orange-400 pb-4">
    {services.map(({ title, desc, img, click }, index) => (
      <div
        key={index}
        onClick={click}
        className="flex-shrink-0 w-80 md:w-auto bg-white rounded-2xl border border-gray-200 shadow hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
      >
        <img
          src={img}
          alt={title}
          className="w-full h-44 object-cover rounded-t-2xl"
        />
        <div className="p-5">
          <h3 className="text-xl font-bold text-orange-500 mb-2">
            {title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {desc}
          </p>
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
      <section className="py-20 bg-orange-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-orange-500">
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
