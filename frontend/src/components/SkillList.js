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

// Custom Logo Component (Updated to match BoardingList theme)
const CustomLogo = ({ onClick, className = "" }) => (
  <div 
    onClick={onClick}
    className={`cursor-pointer hover:scale-110 transition-transform duration-300 ${className}`}
  >
    <div className="bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 rounded-2xl p-3 shadow-lg">
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

// Filter Component (Updated with yellow-orange theme)
const FilterBar = ({ onFilterChange, activeFilters }) => {
  const skillTypes = [
    { label: "All Categories", value: "all" },
    { label: "Creative", value: "Creative" },
    { label: "Education", value: "Education" },
    { label: "Multimedia", value: "Multimedia" },
    { label: "Technology", value: "Technology" }
  ];

  const sortOptions = [
    { label: "Newest First", value: "newest" },
    { label: "Rating: High to Low", value: "rating_desc" },
    { label: "Rating: Low to High", value: "rating_asc" },
    { label: "A-Z", value: "name_asc" }
  ];

  const handleTypeChange = (value) => {
    console.log('Type filter changed:', value);
    onFilterChange({ ...activeFilters, type: value });
  };

  const handleSortChange = (value) => {
    console.log('Sort changed:', value);
    onFilterChange({ ...activeFilters, sort: value });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Type Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Skill Category
            <span className="ml-2 text-xs bg-yellow-100 text-black px-2 py-1 rounded-full">
              {activeFilters.type === 'all' ? 'All' : activeFilters.type}
            </span>
          </label>
          <select
            value={activeFilters.type}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-100 focus:border-yellow-300 transition-all duration-300 cursor-pointer text-black"
          >
            {skillTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Sort By
            <span className="ml-2 text-xs bg-blue-100 text-black px-2 py-1 rounded-full">
              {sortOptions.find(s => s.value === activeFilters.sort)?.label}
            </span>
          </label>
          <select
            value={activeFilters.sort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-100 focus:border-yellow-300 transition-all duration-300 cursor-pointer text-black"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters Button */}
        <div className="flex items-end">
          <button
            onClick={() => onFilterChange({ type: 'all', sort: 'newest', showFavoritesOnly: false })}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

// Favorites functionality
const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  React.useEffect(() => {
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

const SkillList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({ type: 'all', sort: 'newest' });
  const { favorites, toggleFavorite } = useFavorites();

  // Filter skills based on search and filters
  const filteredSkills = skillData.filter(skill => {
    const matchesSearch = skill.skill.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         skill.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         skill.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filters.type === 'all' || skill.type === filters.type;
    const matchesFavorites = !filters.showFavoritesOnly || favorites.includes(skill.id);
    
    return matchesSearch && matchesType && matchesFavorites;
  }).sort((a, b) => {
    switch (filters.sort) {
      case 'rating_desc':
        return b.rating - a.rating;
      case 'rating_asc':
        return a.rating - b.rating;
      case 'name_asc':
        return a.name.localeCompare(b.name);
      case 'newest':
      default:
        return b.id - a.id;
    }
  });

  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    setSearchLoading(true);
    
    // Simulate search delay
    setTimeout(() => {
      setSearchLoading(false);
    }, 500);
  };

  const handleSkillClick = (skill) => {
    navigate(`/skill-details/${skill.id}`, { state: skill });
  };

  const handleAddSkill = () => {
    navigate('/add-skill');
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50">
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
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Connect with talented individuals and share your expertise
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
                placeholder="Search skills, names, locations, or specializations..."
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

        {/* Results Count and Favorites Filter */}
        <div className="mb-8 flex justify-between items-center">
          <span className="inline-block bg-white px-6 py-3 rounded-full shadow-md border border-gray-200 text-gray-700 font-medium">
            {filteredSkills.length} skill{filteredSkills.length !== 1 ? 's' : ''} available
          </span>
          
          {/* Favorites Filter */}
          <button
            onClick={() => setFilters({...filters, showFavoritesOnly: !filters.showFavoritesOnly})}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
              filters.showFavoritesOnly
                ? 'bg-red-100 text-red-600 shadow-md'
                : 'bg-white text-gray-600 shadow-md hover:shadow-lg'
            }`}
          >
            ❤️ Favorites ({favorites.length})
          </button>
        </div>

        {/* Skills Grid/List */}
        {filteredSkills.length > 0 ? (
          <div className={`max-w-7xl mx-auto ${
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
              : 'space-y-6'
          }`}>
            {filteredSkills.map((skill, index) => (
              <div
                key={skill.id}
                onClick={() => handleSkillClick(skill)}
                className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer overflow-hidden border border-gray-100 hover:border-yellow-200 ${
                  viewMode === 'list' ? 'flex items-center p-6 space-x-6' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image Container */}
                <div className={`relative overflow-hidden ${
                  viewMode === 'list' ? 'w-48 h-32 flex-shrink-0' : 'h-48'
                }`}>
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

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(skill.id);
                    }}
                    className={`absolute bottom-4 left-4 p-2 rounded-full shadow-lg transition-all duration-300 ${
                      favorites.includes(skill.id)
                        ? 'bg-red-100 text-red-500'
                        : 'bg-white/90 text-gray-400 hover:text-red-500'
                    }`}
                  >
                    <svg className="w-5 h-5" fill={favorites.includes(skill.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                {/* Content */}
                <div className={`${viewMode === 'list' ? 'flex-1' : 'p-6'}`}>
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

                  {/* Skills Preview */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {skill.criteria.split(', ').slice(0, 2).map((criterion, idx) => (
                      <span key={idx} className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                        {criterion}
                      </span>
                    ))}
                    <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                      {skill.experience}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-lg font-bold text-gray-800">{skill.price}</span>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-lg transition-colors duration-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                      </button>
                      <button className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 px-4 py-2 rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm">
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6 animate-pulse">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              {searchQuery ? 'No Skills Found' : 'No Skills Available'}
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {searchQuery 
                ? `We couldn't find any skills matching "${searchQuery}". Try searching with different keywords.`
                : "We couldn't find any skills at the moment. Please check back later."
              }
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setFilters({ type: 'all', sort: 'newest', showFavoritesOnly: false });
              }}
              className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton onClick={handleAddSkill} />

      {/* Footer */}
      <div className="mt-20 py-8 bg-white/80 backdrop-blur-sm border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 SkillHub. Connect with talented individuals and share your expertise.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkillList;