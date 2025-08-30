import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Backend URL
const backendUrl = process.env.REACT_APP_BACKEND_URL;

// Custom Logo Component
const CustomLogo = ({ onClick, className = "" }) => (
  <div
    onClick={onClick}
    className={`cursor-pointer hover:scale-110 transition-transform duration-300 ${className}`}
  >
    <div className="bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 rounded-2xl p-3 shadow-lg">
      <div className="flex items-center gap-2">
        <div className="relative">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
        </div>
        <div className="text-white font-bold text-lg">UniTunes</div>
      </div>
    </div>
  </div>
);

// Floating Action Button Component
const FloatingActionButton = ({ onClick }) => (
  <div className="fixed bottom-6 right-6 z-50">
    <button
      onClick={onClick}
      className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 group animate-bounce hover:animate-none"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    </button>
    <div className="absolute -top-2 -left-16 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
      Add Skill
    </div>
  </div>
);

// Filter Component
const FilterBar = ({ onFilterChange, activeFilters }) => {
  const categories = [
    "Programming", "Design", "Music", "Sports", "Cooking", 
    "Language", "Academic", "Art", "Photography", "Other"
  ];

  const experienceLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];

  const priceRanges = [
    { label: "All Prices", value: "all" },
    { label: "Free", value: "free" },
    { label: "Under Rs 10,000", value: "0-10000" },
    { label: "Rs 10,000 - 25,000", value: "10000-25000" },
    { label: "Above Rs 25,000", value: "25000+" }
  ];

  const sortOptions = [
    { label: "Most Popular", value: "popularity" },
    { label: "Highest Rated", value: "rating" },
    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" },
    { label: "Newest First", value: "newest" }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Category
            <span className="ml-2 text-xs bg-yellow-100 text-gray-800 px-2 py-1 rounded-full">
              {activeFilters.category || 'All'}
            </span>
          </label>
          <select
            value={activeFilters.category}
            onChange={(e) => onFilterChange({ ...activeFilters, category: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-100 focus:border-yellow-300 transition-all duration-300 cursor-pointer text-gray-800"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Experience Level Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Experience Level
            <span className="ml-2 text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
              {activeFilters.experience || 'All'}
            </span>
          </label>
          <select
            value={activeFilters.experience}
            onChange={(e) => onFilterChange({ ...activeFilters, experience: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-100 focus:border-yellow-300 transition-all duration-300 cursor-pointer text-gray-800"
          >
            <option value="">All Levels</option>
            {experienceLevels.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        {/* Price Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Price Range
            <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
              {activeFilters.price === 'all' ? 'All' : priceRanges.find(r => r.value === activeFilters.price)?.label}
            </span>
          </label>
          <select
            value={activeFilters.price}
            onChange={(e) => onFilterChange({ ...activeFilters, price: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-100 focus:border-yellow-300 transition-all duration-300 cursor-pointer text-gray-800"
          >
            {priceRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Sort By
            <span className="ml-2 text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
              {sortOptions.find(s => s.value === activeFilters.sort)?.label}
            </span>
          </label>
          <select
            value={activeFilters.sort}
            onChange={(e) => onFilterChange({ ...activeFilters, sort: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-100 focus:border-yellow-300 transition-all duration-300 cursor-pointer text-gray-800"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Clear Filters and Active Only Toggle */}
      <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-gray-200">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={activeFilters.activeOnly}
            onChange={(e) => onFilterChange({ ...activeFilters, activeOnly: e.target.checked })}
            className="w-5 h-5 text-yellow-600 rounded focus:ring-yellow-500"
          />
          <span className="text-sm font-medium text-gray-700">Show active skills only</span>
        </label>

        <button
          onClick={() => onFilterChange({ 
            category: '', 
            experience: '', 
            price: 'all', 
            sort: 'popularity', 
            activeOnly: true 
          })}
          className="ml-auto bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Clear Filters
        </button>
      </div>
    </div>
  );
};

// Favorites functionality
const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('skillFavorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  const toggleFavorite = (id) => {
    const updatedFavorites = favorites.includes(id)
      ? favorites.filter(fav => fav !== id)
      : [...favorites, id];
    
    setFavorites(updatedFavorites);
    localStorage.setItem('skillFavorites', JSON.stringify(updatedFavorites));
  };

  return { favorites, toggleFavorite };
};

// Individual Skill Card Component
const SkillCard = ({ skill, onRemove, token, viewMode, favorites, toggleFavorite }) => {
  const navigate = useNavigate();

  const handleRemove = async () => {
    if (window.confirm(`Are you sure you want to remove "${skill.skillType || skill.title}"?`)) {
      try {
        if (token) {
          await axios.delete(`${backendUrl}/api/skills/${skill._id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
        }
        onRemove(skill._id);
      } catch (error) {
        console.error("Error removing skill:", error);
      }
    }
  };

  const handleCardClick = () => {
    navigate(`/skill-details/${skill._id}`);
  };

  const getPopularityBadge = () => {
    const badges = {
      trending: { text: "🔥 Trending", color: "bg-red-500" },
      hot: { text: "⚡ Hot", color: "bg-orange-500" },
      popular: { text: "⭐ Popular", color: "bg-yellow-500" },
      new: { text: "✨ New", color: "bg-green-500" }
    };
    
    const badge = badges[skill.popularity];
    return badge ? (
      <div className={`${badge.color} text-white px-2 py-1 rounded-full text-xs font-semibold`}>
        {badge.text}
      </div>
    ) : null;
  };

  const skillTitle = skill.skillType || skill.title || "Untitled Skill";
  const instructorName = skill.studentName || skill.instructor || skill.owner || "Unknown Instructor";
  const skillPrice = skill.price || 0;
  const skillImage = skill.images?.[0] || skill.image?.[0] || null;
  const skillRating = skill.rating || 0;
  const studentCount = skill.students || 0;
  const skillDuration = skill.duration || "Not specified";
  const skillLocation = skill.location || "Online";
  const skillDescription = skill.description || "No description available";

  if (viewMode === 'list') {
    return (
      <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-yellow-200 flex items-center p-6 space-x-6">
        {/* Image Container */}
        <div className="relative w-48 h-32 flex-shrink-0 overflow-hidden rounded-xl">
          {skillImage ? (
            <img
              src={skillImage}
              alt={skillTitle}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-100 text-gray-400">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          )}
          
          {!skill.isActive && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Inactive
            </div>
          )}
          
          {skill.popularity && skill.isActive && (
            <div className="absolute top-2 right-2">
              {getPopularityBadge()}
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(skill._id);
            }}
            className={`absolute bottom-2 right-2 p-2 rounded-full shadow-lg transition-all duration-300 ${
              favorites.includes(skill._id)
                ? 'bg-red-100 text-red-500'
                : 'bg-white/90 text-gray-400 hover:text-red-500'
            }`}
          >
            <svg className="w-4 h-4" fill={favorites.includes(skill._id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-yellow-600 transition-colors cursor-pointer" onClick={handleCardClick}>
                {skillTitle}
              </h3>
              <p className="text-gray-600">by {instructorName}</p>
            </div>
          </div>
          
          <p className="text-gray-600 mb-4 line-clamp-2">{skillDescription}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <span>⭐</span>
                <span>{skillRating}</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>{studentCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{skillDuration}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-yellow-600">
                {skillPrice === 0 ? "Free" : `Rs ${skillPrice.toLocaleString()}`}
              </span>
              
              <div className="flex gap-2">
                <button 
                  onClick={handleCardClick}
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 px-4 py-2 rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm"
                >
                  View Details
                </button>
                
                {token && (
                  <button
                    onClick={handleRemove}
                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={handleCardClick}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer overflow-hidden border border-gray-100 hover:border-yellow-200"
    >
      <div className="relative h-48 overflow-hidden">
        {skillImage ? (
          <img
            src={skillImage}
            alt={skillTitle}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-100 text-gray-400">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white/90 rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
        </div>
        
        {/* Status Badge */}
        {!skill.isActive && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Inactive
          </div>
        )}
        
        {/* Popularity Badge */}
        {skill.popularity && skill.isActive && (
          <div className="absolute top-3 left-3">
            {getPopularityBadge()}
          </div>
        )}
        
        {/* Favorite Button */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(skill._id);
            }}
            className={`p-2 rounded-full backdrop-blur-sm transition-all ${
              favorites.includes(skill._id) 
                ? 'bg-red-500/90 text-white' 
                : 'bg-white/90 text-gray-700 hover:bg-white'
            }`}
          >
            <svg className={`w-4 h-4 ${favorites.includes(skill._id) ? 'fill-current' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        
        {/* Price Badge */}
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="font-bold text-gray-900">
            {skillPrice === 0 ? "Free" : `Rs ${skillPrice.toLocaleString()}`}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-yellow-600 transition-colors">
            {skillTitle}
          </h3>
          <p className="text-sm text-gray-600 mb-1">by {instructorName}</p>
          <p className="text-sm text-gray-500 line-clamp-2">{skillDescription}</p>
        </div>
        
        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <span>⭐</span>
            <span>{skillRating}</span>
            <span className="text-gray-400">({studentCount})</span>
          </div>
          
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <span>{skill.experience || "Beginner"}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{skillDuration}</span>
          <span>•</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{skillLocation}</span>
        </div>
        
        {/* Actions */}
        <div className="flex gap-2">
          <button 
            onClick={handleCardClick}
            className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-gray-800 font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform group-hover:scale-105"
          >
            View Details
          </button>
          
          {token && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const SkillList = ({ token }) => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({ 
    category: '', 
    experience: '', 
    price: 'all', 
    sort: 'popularity', 
    activeOnly: true 
  });
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/skills/list`);
        if (response.data?.success && Array.isArray(response.data.data)) {
          setSkills(response.data.data);
          setFilteredSkills(response.data.data);
        } else {
          console.warn("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching skills data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...skills];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(skill =>
        (skill.skillType || skill.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (skill.studentName || skill.instructor || skill.owner || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (skill.description || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (skill.category || "").toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(skill => skill.category === filters.category);
    }

    // Apply experience filter
    if (filters.experience) {
      filtered = filtered.filter(skill => skill.experience === filters.experience);
    }

    // Apply price filter
    if (filters.price !== 'all') {
      filtered = filtered.filter(skill => {
        const price = parseInt(skill.price) || 0;
        
        switch (filters.price) {
          case 'free':
            return price === 0;
          case '0-10000':
            return price > 0 && price <= 10000;
          case '10000-25000':
            return price > 10000 && price <= 25000;
          case '25000+':
            return price > 25000;
          default:
            return true;
        }
      });
    }

    // Apply active only filter
    if (filters.activeOnly) {
      filtered = filtered.filter(skill => skill.isActive !== false);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sort) {
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'price_asc':
          return (parseInt(a.price) || 0) - (parseInt(b.price) || 0);
        case 'price_desc':
          return (parseInt(b.price) || 0) - (parseInt(a.price) || 0);
        case 'newest':
          if (a.createdAt && b.createdAt) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          }
          return skills.indexOf(b) - skills.indexOf(a);
        case 'popularity':
        default:
          return (b.students || 0) - (a.students || 0);
      }
    });

    setFilteredSkills(filtered);
  }, [skills, searchQuery, filters]);

  // Search functionality
  const handleSearch = async (query) => {
    setSearchQuery(query);
    setSearchLoading(true);
    
    setTimeout(() => {
      setSearchLoading(false);
    }, 500);
  };

  const handleAddSkill = () => {
    navigate('/add-skill');
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleHome = () => {
    navigate("/");
  };

  const removeSkill = async (id) => {
    try {
      setSkills(prev => prev.filter(s => s._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-40 h-40 bg-orange-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-red-200 rounded-full opacity-20 animate-pulse delay-500"></div>

        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-yellow-200 border-t-yellow-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-orange-300 rounded-full animate-spin animate-reverse"></div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Skills</h3>
            <p className="text-gray-600">Discovering amazing learning opportunities...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-40 h-40 bg-orange-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-red-200 rounded-full opacity-20 animate-pulse delay-500"></div>

      {/* Header Section */}
      <div className="relative bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-800 to-gray-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:from-yellow-500 hover:to-orange-400 hover:text-gray-900 transition-all duration-300 transform hover:-translate-y-0.5 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            {/* Custom Logo */}
            <CustomLogo onClick={handleHome} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mb-6 shadow-lg animate-bounce">
            <svg className="w-10 h-10 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent mb-4">
            Skill Marketplace
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover and learn new skills from expert instructors worldwide
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Search Bar with View Toggle */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search for skills, instructors, or topics..."
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-100 focus:border-yellow-300 transition-all duration-300 text-gray-700 placeholder-gray-400"
              />
              {searchLoading && (
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                  <div className="w-5 h-5 border-2 border-yellow-200 border-t-yellow-500 rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-6 py-4 transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-6 py-4 transition-all duration-300 ${
                  viewMode === 'list'
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Search Results Info */}
          {searchQuery && (
            <div className="mt-4 text-center">
              <span className="inline-block bg-white px-4 py-2 rounded-full shadow-md border border-gray-200 text-gray-600 text-sm">
                {searchLoading ? 'Searching...' : `${filteredSkills.length} result${filteredSkills.length !== 1 ? 's' : ''} for "${searchQuery}"`}
              </span>
            </div>
          )}
        </div>

        {/* Filter Bar */}
        <FilterBar onFilterChange={setFilters} activeFilters={filters} />

        {/* Content */}
        {filteredSkills.length > 0 ? (
          <>
            {/* Results Count */}
            <div className="mb-8 flex justify-between items-center">
              <span className="inline-block bg-white px-6 py-3 rounded-full shadow-md border border-gray-200 text-gray-700 font-medium">
                {filteredSkills.length} skill{filteredSkills.length !== 1 ? 's' : ''} available
              </span>
              
              {/* Favorites Filter */}
              <button
                onClick={() => setFilters({...filters, showFavoritesOnly: !filters.showFavoritesOnly})}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                  filters.showFavoritesOnly
                    ? 'bg-red-100 text-red-600 shadow-md'
                    : 'bg-white text-gray-600 shadow-md hover:shadow-lg'
                }`}
              >
                <svg className="w-4 h-4" fill={filters.showFavoritesOnly ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Favorites ({favorites.length})
              </button>
            </div>

            {/* Skills Grid/List */}
            <div className={`max-w-7xl mx-auto ${
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
                : 'space-y-6'
            }`}>
              {filteredSkills
                .filter(skill => !filters.showFavoritesOnly || favorites.includes(skill._id))
                .map((skill, index) => (
                <SkillCard
                  key={skill._id}
                  skill={skill}
                  onRemove={removeSkill}
                  token={token}
                  viewMode={viewMode}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6 animate-pulse">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              {searchQuery ? 'No Results Found' : 'No Skills Available'}
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {searchQuery 
                ? `We couldn't find any skills matching "${searchQuery}". Try searching with different keywords.`
                : "We couldn't find any skills at the moment. Please check back later or try refreshing the page."
              }
            </p>
            {searchQuery ? (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setFilters(prev => ({...prev, showFavoritesOnly: false}));
                }}
                className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Clear Search
              </button>
            ) : (
              <button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Refresh Page
              </button>
            )}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton onClick={handleAddSkill} />

      {/* Stats Footer */}
      <div className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-yellow-600 mb-2">{skills.length}</div>
                <div className="text-sm text-gray-600">Total Skills</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {skills.filter(s => s.isActive !== false).length}
                </div>
                <div className="text-sm text-gray-600">Active Courses</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-600 mb-2">
                  {skills.reduce((acc, s) => acc + (s.students || 0), 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Students</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-600 mb-2">
                  {favorites.length}
                </div>
                <div className="text-sm text-gray-600">Your Favorites</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-black text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span className="text-3xl font-bold text-white">UniTunes</span>
                </div>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-4">Empowering Learning Through Skills</h3>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              Connect with expert instructors, discover new skills, and unlock your potential in our vibrant learning community.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <svg className="w-8 h-8 text-yellow-400 mb-3 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <h4 className="font-semibold mb-2">Trending Skills</h4>
                <p className="text-sm text-gray-300">Discover the most popular courses</p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <svg className="w-8 h-8 text-orange-400 mb-3 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <h4 className="font-semibold mb-2">Expert Instructors</h4>
                <p className="text-sm text-gray-300">Learn from industry professionals</p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <svg className="w-8 h-8 text-red-400 mb-3 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
                <h4 className="font-semibold mb-2">Community Driven</h4>
                <p className="text-sm text-gray-300">Join thousands of learners worldwide</p>
              </div>
            </div>
            
            <div className="border-t border-gray-700 pt-8">
              <p className="text-gray-400 mb-2">
                © 2025 UniTunes. Transforming lives through learning.
              </p>
              <p className="text-gray-500 text-sm">
                Building bridges between knowledge and opportunity since 2025
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SkillList; 