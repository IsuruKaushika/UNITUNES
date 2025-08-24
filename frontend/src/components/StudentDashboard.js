import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import Ad from "../components/ad/Ad";

function HomePage() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  const services = [
    { title: "Boardings", desc: "Find the perfect accommodation near campus", img: "/images/Bording.jpg", click: () => navigate("/boarding-list"), icon: "🏠", color: "from-blue-500 to-blue-600" },
    { title: "Taxis", desc: "Book reliable rides at student-friendly rates", img: "/images/Taxi.jpg", click: () => navigate("/taxi-list"), icon: "🚗", color: "from-yellow-500 to-yellow-600" },
    { title: "Medicare", desc: "Access healthcare services and medication", img: "/images/Medicine.jpg", click: () => navigate("/medi-select"), icon: "🏥", color: "from-red-500 to-red-600" },
    { title: "Shops", desc: "Explore local eateries and campus stores", img: "/images/Food.jpg", click: () => navigate("/shop-select"), icon: "🍔", color: "from-green-500 to-green-600" },
    { title: "Renting", desc: "Borrow equipment and essentials for your studies", img: "/images/Rental.jpg", click: () => navigate("/rent-items"), icon: "📚", color: "from-purple-500 to-purple-600" },
    { title: "Skill Sharing", desc: "Connect with peers for tutoring and skill exchange", img: "/images/Skill Sharing.jpg", click: () => navigate("/skill-list"), icon: "🤝", color: "from-indigo-500 to-indigo-600" },
  ];

  const handleScrollToServices = () => {
    const element = document.getElementById("services");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 text-gray-800">
      <Navbar setShowLogin={setShowLogin} />

      {/* Hero Section */}
      <header
        className="relative flex flex-col items-center justify-center h-[85vh] text-white text-center px-6 bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/images/back.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-800/40 via-yellow-300/30 to-transparent animate-pulse" />
        <div className="absolute inset-0 bg-black/20" />

        {/* Floating decor */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-bounce"></div>
        <div className="absolute bottom-32 right-16 w-16 h-16 bg-yellow-300/20 rounded-full blur-lg animate-pulse"></div>
        <div className="absolute top-1/3 right-10 w-12 h-12 bg-white/15 rounded-full blur-md animate-bounce delay-300"></div>

        <div className="relative z-10 flex flex-col items-center justify-center transform hover:scale-105 transition-transform duration-500">
          <h1 className="text-6xl md:text-8xl font-black mb-2 tracking-tight text-white drop-shadow-2xl">
            Uni<span className="text-orange-300">Tunes</span>
          </h1>
          <div className="h-2 w-32 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mx-auto animate-pulse"></div>

          <h2 className="text-xl md:text-3xl mt-6 font-medium max-w-2xl mx-auto text-white/95 drop-shadow-lg leading-relaxed">
            Smart Solutions for <span className="text-orange-300 font-bold">Smarter</span> Undergraduates!
          </h2>

          <button
            className="mt-8 group px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-full shadow-2xl hover:shadow-orange-500/40 hover:from-orange-600 hover:to-orange-700 transform hover:scale-110 transition-all duration-300 border border-white/20"
            onClick={handleScrollToServices}
          >
            <span className="flex items-center gap-2">
              Explore Services
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gradient-to-b from-white to-orange-50 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="text-center mb-6 relative z-10">
          <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-orange-500 to-orange-700 mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 text-lg font-medium">Everything you need for campus life</p>
        </div>

        {/* Transparent Map Background */}
<div
  className="absolute inset-0 z-0 bg-cover bg-center rounded-3xl opacity-6 pointer-events-none filter blur-sm"
  style={{ backgroundImage: "url('/images/map.jpg')" }}
></div>



        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {services.map(({ title, desc, img, click, icon, color }, index) => (
              <div key={index} onClick={click} className="group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl border border-gray-100 transition-all duration-500 h-full">
                  <div className="relative">
                    <img src={img} alt={title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {icon}
                    </div>

                    <div className="absolute top-4 left-4 w-8 h-8 bg-orange-500/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      {index + 1}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-300 mb-2">{title}</h3>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{desc}</p>
                    <div className="flex items-center text-orange-500 font-semibold group-hover:text-orange-600 transition-colors duration-300 mt-4">
                      <span className="text-sm">Explore</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
     {/* Ad Section - Enhanced */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-orange-50 relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-orange-200/20 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-300/15 rounded-full blur-3xl"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <Ad />
        </div>
      </section>

      {/* About Section - Enhanced */}
      <section className="py-24 bg-gradient-to-br from-orange-50 via-white to-orange-100 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-200/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-orange-300/15 rounded-full blur-2xl"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="mb-12">
            <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-orange-500 to-orange-700 mb-6">
              About UniTunes
            </h2>
            <div className="flex justify-center items-center gap-2 mb-8">
              <div className="h-1 w-20 bg-gradient-to-r from-transparent to-orange-400 rounded-full"></div>
              <div className="w-4 h-4 bg-orange-500 rounded-full animate-pulse"></div>
              <div className="h-1 w-20 bg-gradient-to-l from-transparent to-orange-400 rounded-full"></div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/50 mb-8">
            <p className="text-gray-700 text-xl md:text-2xl leading-relaxed font-medium mb-6">
              UniTunes is the <span className="text-orange-600 font-bold">ultimate campus companion</span> designed specifically for
              undergraduate students. Our platform connects you with essential
              services to make your university life <span className="text-orange-600 font-bold">easier</span>, more <span className="text-orange-600 font-bold">convenient</span>, and
              more <span className="text-orange-600 font-bold">affordable</span>.
            </p>
            
            <div className="flex flex-wrap justify-center gap-3">
              <div className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2">
                🏠 <span>Accommodation</span>
              </div>
              <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700 px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2">
                🚗 <span>Transportation</span>
              </div>
              <div className="bg-gradient-to-r from-red-100 to-red-200 text-red-700 px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2">
                🏥 <span>Healthcare</span>
              </div>
              <div className="bg-gradient-to-r from-green-100 to-green-200 text-green-700 px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2">
                🍔 <span>Food & Shops</span>
              </div>
              <div className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2">
                📚 <span>Equipment Rental</span>
              </div>
              <div className="bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-700 px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2">
                🤝 <span>Skill Sharing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    {/* About Section - Enhanced */}
      <section className="py-24 bg-gradient-to-br from-orange-50 to-red-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Text content */}
            <div>
              <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <span>🎯</span>
                <span>About UniTunes</span>
              </div>
              
              <h2 className="text-5xl font-black mb-6">
                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  About UniTunes
                </span>
              </h2>
              
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                UniTunes is the ultimate campus companion designed specifically for
                undergraduate students. Our platform connects you with essential
                services to make your university life easier, more convenient, and
                more affordable.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">500+</div>
                  <div className="text-gray-600">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">6</div>
                  <div className="text-gray-600">Core Services</div>
                </div>
              </div>
            </div>

            {/* Visual element */}
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-orange-200 to-red-200 rounded-3xl flex items-center justify-center shadow-2xl">
                <div className="text-center text-white">
                  <div className="text-8xl mb-4">📱</div>
                  <h3 className="text-2xl font-bold">Mobile App</h3>
                  <p className="text-lg opacity-90">Coming Soon</p>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <span className="text-2xl">⭐</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-blue-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <span className="text-xl">🚀</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Enhanced */}
      <footer className="bg-gradient-to-br from-gray-900 to-black text-gray-300 py-16 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            {/* Brand section */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                  <span className="text-xl font-bold text-white">UT</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">UniTunes</h3>
                  <p className="text-sm text-gray-400">Smart Student Solutions</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md">
                Empowering undergraduates with everyday campus essentials. 
                Making university life easier, one service at a time.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <div className="space-y-3">
                <a href="/about" className="block text-gray-400 hover:text-white transition-colors hover:translate-x-1 transform duration-200">About Us</a>
                <a href="/contact" className="block text-gray-400 hover:text-white transition-colors hover:translate-x-1 transform duration-200">Contact</a>
                <a href="/privacy" className="block text-gray-400 hover:text-white transition-colors hover:translate-x-1 transform duration-200">Privacy Policy</a>
                <a href="/terms" className="block text-gray-400 hover:text-white transition-colors hover:translate-x-1 transform duration-200">Terms of Service</a>
              </div>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
              <div className="flex space-x-3">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span>📘</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-colors cursor-pointer">
                  <span>📷</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-400 transition-colors cursor-pointer">
                  <span>🐦</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} UniTunes. All rights reserved.
            </div>
            <div className="text-sm text-gray-400 mt-4 md:mt-0">
              Made with ❤️ for students
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .bg-grid-pattern {
          background-image: radial-gradient(circle, #e5e7eb 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
}

export default HomePage;