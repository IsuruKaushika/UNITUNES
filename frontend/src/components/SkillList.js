import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Enhanced skill data
const skillData = [
  {
    id: 1,
    name: "Kasun Perera",
    skill: "Graphic Design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    type: "Creative",
    criteria: "Photoshop, Illustrator",
    specialization: "Logo & Branding",
    phone: "0771234567",
    payment: "Paid",
    price: "Rs 2,000/hour",
    rating: 4.8,
    experience: "3 Years",
    location: "Colombo"
  },
  {
    id: 2,
    name: "Nimali Silva",
    skill: "Tutoring",
    image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop",
    type: "Education",
    criteria: "Mathematics, Physics",
    specialization: "A/L Tutoring",
    phone: "0719876543",
    payment: "Free",
    price: "Free",
    rating: 4.9,
    experience: "2 Years",
    location: "Kandy"
  },
  {
    id: 3,
    name: "Tharindu Jayasena",
    skill: "Video Editing",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop",
    type: "Multimedia",
    criteria: "Adobe Premiere, After Effects",
    specialization: "Short Films",
    phone: "0751122334",
    payment: "Paid",
    price: "Rs 1,500/hour",
    rating: 4.7,
    experience: "4 Years",
    location: "Galle"
  },
  {
    id: 4,
    name: "Priya Fernando",
    skill: "Web Development",
    image: "https://images.unsplash.com/photo-1494790108755-2616c15a9e3e?w=400&h=300&fit=crop",
    type: "Technology",
    criteria: "React, Node.js, MongoDB",
    specialization: "Full Stack Development",
    phone: "0761234567",
    payment: "Paid",
    price: "Rs 3,000/hour",
    rating: 4.6,
    experience: "5 Years",
    location: "Colombo"
  }
];

// Custom Logo Component
const CustomLogo = ({ onClick, className = "" }) => (
  <div 
    onClick={onClick}
    className={`cursor-pointer hover:scale-110 transition-transform duration-300 ${className}`}
  >
    <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl p-3 shadow-lg">
      <div className="flex items-center gap-2">
        <div className="relative">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
        </div>
        <div className="text-white font-bold text-lg">
          SkillHub
        </div>
      </div>
    </div>
  </div>
);

const SkillList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Filter skills based on search and type
  const filteredSkills = skillData.filter(skill => {
    const matchesSearch = skill.skill.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         skill.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || skill.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleSkillClick = (skill) => {
    navigate(`/skill-details/${skill.id}`, { state: skill });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Animated Background */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-40 h-40 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-center">
            <CustomLogo onClick={() => navigate("/")} />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6 shadow-lg animate-bounce">
            <span className="text-3xl">🎓</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent mb-4">
            Skill Sharing Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with talented individuals and share your expertise
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search skills, names, or locations..."
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-300 transition-all duration-300"
              />
            </div>
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-6 py-4 bg-white border border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-300 transition-all duration-300"
            >
              <option value="all">All Categories</option>
              <option value="Creative">Creative</option>
              <option value="Education">Education</option>
              <option value="Multimedia">Multimedia</option>
              <option value="Technology">Technology</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <span className="inline-block bg-white px-6 py-3 rounded-full shadow-md border border-gray-200 text-gray-700 font-medium">
            {filteredSkills.length} skill{filteredSkills.length !== 1 ? 's' : ''} available
          </span>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.id}
              onClick={() => handleSkillClick(skill)}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer overflow-hidden border border-gray-100 hover:border-blue-200"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={skill.image}
                  alt={skill.skill}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Payment Badge */}
                <div className="absolute top-4 right-4">
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold shadow-lg ${
                    skill.payment === "Paid" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-blue-100 text-blue-800"
                  }`}>
                    {skill.payment === "Paid" ? "💰 Paid" : "🎁 Free"}
                  </div>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="text-sm font-semibold text-gray-800">{skill.rating}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {skill.skill}
                </h3>
                <p className="text-gray-600 font-medium mb-2">{skill.name}</p>
                
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm text-gray-500">{skill.location}</span>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-lg font-bold text-gray-800">{skill.price}</span>
                  </div>
                  <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredSkills.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">No Skills Found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setFilterType("all");
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillList;