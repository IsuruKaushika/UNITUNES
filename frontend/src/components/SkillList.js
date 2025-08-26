import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Custom Logo Component
const CustomLogo = ({ onClick, className = "" }) => (
  <div 
    onClick={onClick}
    className={`cursor-pointer hover:scale-110 transition-transform duration-300 ${className}`}
  >
    <div className="bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 rounded-2xl p-3 shadow-lg">
      <div className="flex items-center gap-2">
        <div className="relative">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
        </div>
        <div className="text-white font-bold text-lg">
          UniTunes
        </div>
      </div>
    </div>
  </div>
);

const SkillList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Backend API base URL - adjust this to match your backend URL
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://unitunes-backend.vercel.app/api';

  // Fetch skills from backend
  const fetchSkills = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`${API_BASE_URL}/skill/active`);
      
      if (response.data.success) {
        setSkills(response.data.skills);
      } else {
        setError('Failed to fetch skills');
      }
    } catch (err) {
      console.error('Error fetching skills:', err);
      setError('Failed to connect to the server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Transform backend data to match frontend expectations
  const transformSkillData = (skill) => {
    return {
      id: skill._id,
      name: skill.studentName,
      skill: skill.skillType,
      image: skill.images && skill.images.length > 0 
        ? skill.images[0] 
        : "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop", // Default image
      type: getSkillCategory(skill.skillType),
      criteria: skill.moreDetails,
      specialization: skill.moreDetails,
      phone: skill.contact,
      payment: skill.price > 0 ? "Paid" : "Free",
      price: skill.price > 0 ? `Rs ${skill.price.toLocaleString()}/hour` : "Free",
      rating: 4.5, // You can add rating field to your backend model later
      experience: skill.experience || "Beginner",
      location: skill.location || "Not specified",
      moreDetails: skill.moreDetails,
      allImages: skill.images || []
    };
  };

  // Map skill types to categories
  const getSkillCategory = (skillType) => {
    const categoryMap = {
      'Programming': 'Technology',
      'Design': 'Creative',
      'Music': 'Creative',
      'Sports': 'Physical',
      'Cooking': 'Lifestyle',
      'Language': 'Education',
      'Academic': 'Education',
      'Art': 'Creative',
      'Photography': 'Creative',
      'Other': 'Other'
    };
    return categoryMap[skillType] || 'Other';
  };

  // Get unique categories from skills
  const getUniqueCategories = () => {
    const categories = skills.map(skill => getSkillCategory(skill.skillType));
    return [...new Set(categories)];
  };

  // Filter skills based on search and type
  const filteredSkills = skills
    .map(transformSkillData)
    .filter(skill => {
      const matchesSearch = 
        skill.skill.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.criteria.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = filterType === 'all' || skill.type === filterType;
      return matchesSearch && matchesType;
    });

  const handleSkillClick = (skill) => {
    navigate(`/skill-details/${skill.id}`, { state: skill });
  };

  // Fetch skills on component mount
  useEffect(() => {
    fetchSkills();
  }, []);

  // Loading component
  if (loading) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-500 mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-700">Loading skills...</h3>
          <p className="text-gray-500 mt-2">Please wait while we fetch the latest skills</p>
        </div>
      </div>
    );
  }

  // Error component
  if (error) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-6">
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Oops! Something went wrong</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchSkills}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Animated Background */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-40 h-40 bg-orange-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-pulse delay-500"></div>

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-800 to-gray-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:from-yellow-500 hover:to-yellow-400 hover:text-gray-900 transition-all duration-300 transform hover:-translate-y-0.5 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            {/* Custom Logo */}
            <CustomLogo onClick={() => navigate("/")} />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mb-6 shadow-lg animate-bounce">
            <span className="text-3xl">🎓</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent mb-4">
            Skill Sharing Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with talented individuals and share your expertise
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto mt-6 rounded-full"></div>
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
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-100 focus:border-yellow-300 transition-all duration-300 text-gray-700 placeholder-gray-400"
              />
            </div>
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-6 py-4 bg-white border border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-100 focus:border-yellow-300 transition-all duration-300 text-gray-700"
            >
              <option value="all">All Categories</option>
              {getUniqueCategories().map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="text-center mb-8">
          <button
            onClick={fetchSkills}
            className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-200 text-gray-700 font-medium hover:shadow-lg hover:border-yellow-300 transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
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
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer overflow-hidden border border-gray-100 hover:border-yellow-200"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={skill.image}
                  alt={skill.skill}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop";
                  }}
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

                {/* Experience Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="text-sm font-semibold text-gray-800">{skill.experience}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-yellow-600 transition-colors duration-300">
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
                  <button className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 px-4 py-2 rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredSkills.length === 0 && !loading && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">No Skills Found</h3>
            <p className="text-gray-600 mb-6">
              {skills.length === 0 
                ? "No skills have been added yet. Be the first to share your expertise!"
                : "Try adjusting your search or filter criteria"
              }
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setFilterType("all");
              }}
              className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
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