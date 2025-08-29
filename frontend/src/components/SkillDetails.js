import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
        </div>
        <div className="text-white font-bold text-lg">UniTunes</div>
      </div>
    </div>
  </div>
);

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

// Related Skills Component
const RelatedSkills = ({ currentSkillId, category }) => {
  const [relatedSkills, setRelatedSkills] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRelatedSkills = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/skills/list`);
        if (response.data?.success && Array.isArray(response.data.data)) {
          const related = response.data.data
            .filter(skill => 
              skill._id !== currentSkillId && 
              skill.category === category &&
              skill.isActive !== false
            )
            .slice(0, 3);
          setRelatedSkills(related);
        }
      } catch (error) {
        console.error("Error fetching related skills:", error);
      }
    };

    if (category) {
      fetchRelatedSkills();
    }
  }, [currentSkillId, category]);

  if (relatedSkills.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Related Skills</h3>
      <div className="space-y-4">
        {relatedSkills.map((skill) => (
          <div
            key={skill._id}
            onClick={() => navigate(`/skill-details/${skill._id}`)}
            className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-yellow-50 hover:shadow-md transition-all duration-300 cursor-pointer group"
          >
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              {skill.images?.[0] || skill.image?.[0] ? (
                <img
                  src={skill.images?.[0] || skill.image?.[0]}
                  alt={skill.skillType || skill.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 truncate group-hover:text-orange-600 transition-colors">
                {skill.skillType || skill.title}
              </h4>
              <p className="text-sm text-gray-600 truncate">
                by {skill.studentName || skill.instructor || skill.owner}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-semibold text-orange-600">
                  {skill.price === 0 ? "Free" : `Rs ${skill.price?.toLocaleString()}`}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <div className="flex items-center gap-1">
                  <span className="text-xs">⭐</span>
                  <span className="text-xs text-gray-500">{skill.rating || 0}</span>
                </div>
              </div>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

const SkillDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchSkillDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backendUrl}/api/skills/${id}`);
        
        if (response.data?.success && response.data.data) {
          setSkill(response.data.data);
        } else {
          setError("Skill not found");
        }
      } catch (error) {
        console.error("Error fetching skill details:", error);
        setError("Failed to load skill details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSkillDetails();
    }
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleHome = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 flex items-center justify-center">
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-40 h-40 bg-orange-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-red-200 rounded-full opacity-20 animate-pulse delay-500"></div>

        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-yellow-200 border-t-orange-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-red-300 rounded-full animate-spin animate-reverse"></div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Skill Details</h3>
            <p className="text-gray-600">Please wait while we fetch the information...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !skill) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 flex flex-col justify-center items-center">
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-40 h-40 bg-orange-200 rounded-full opacity-20 animate-pulse delay-1000"></div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {error || "Skill Not Found"}
          </h2>
          <p className="text-gray-600 mb-8">
            The skill you're looking for doesn't exist or has been removed.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleBack}
              className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg"
            >
              ← Back
            </button>
            <button
              onClick={handleHome}
              className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 px-6 py-3 rounded-xl font-semibold hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg"
            >
              Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const skillTitle = skill.skillType || skill.title || "Untitled Skill";
  const instructorName = skill.studentName || skill.instructor || skill.owner || "Unknown Instructor";
  const skillPrice = skill.price || 0;
  const skillImages = skill.images || skill.image || [];
  const skillRating = skill.rating || 0;
  const studentCount = skill.students || 0;
  const skillDuration = skill.duration || "Not specified";
  const skillLocation = skill.location || "Online";
  const skillDescription = skill.description || "No description available";
  const skillCategory = skill.category || "Other";
  const skillExperience = skill.experience || "Beginner";
  const skillPhone = skill.phone || skill.contact || "";

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-40 h-40 bg-orange-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-red-200 rounded-full opacity-20 animate-pulse delay-500"></div>

      {/* Header */}
      <div className="relative bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-800 to-gray-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:from-yellow-500 hover:to-orange-400 hover:text-gray-900 transition-all duration-300 transform hover:-translate-y-0.5 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            <CustomLogo onClick={handleHome} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Skill Header */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
            <div className="flex flex-col lg:flex-row">
              {/* Image Gallery */}
              <div className="lg:w-1/2">
                <div className="relative h-96 lg:h-full min-h-[400px]">
                  {skillImages.length > 0 ? (
                    <>
                      <img
                        src={skillImages[activeImageIndex]}
                        alt={skillTitle}
                        className="w-full h-full object-cover"
                      />
                      {skillImages.length > 1 && (
                        <>
                          <button
                            onClick={() => setActiveImageIndex((prev) => 
                              prev === 0 ? skillImages.length - 1 : prev - 1
                            )}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                          <button
                            onClick={() => setActiveImageIndex((prev) => 
                              prev === skillImages.length - 1 ? 0 : prev + 1
                            )}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                          
                          {/* Image Indicators */}
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {skillImages.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => setActiveImageIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                  index === activeImageIndex
                                    ? 'bg-white shadow-lg'
                                    : 'bg-white/60 hover:bg-white/80'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  )}

                  {/* Status and Favorite Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {skill.isActive !== false && (
                      <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                        Available
                      </div>
                    )}
                    {skill.popularity && (
                      <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                        {skill.popularity === 'trending' && '🔥 Trending'}
                        {skill.popularity === 'hot' && '⚡ Hot'}
                        {skill.popularity === 'popular' && '⭐ Popular'}
                        {skill.popularity === 'new' && '✨ New'}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => toggleFavorite(skill._id)}
                    className={`absolute top-4 right-4 p-3 rounded-full shadow-lg transition-all duration-300 ${
                      favorites.includes(skill._id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/90 text-gray-600 hover:text-red-500'
                    }`}
                  >
                    <svg className="w-6 h-6" fill={favorites.includes(skill._id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Skill Information */}
              <div className="lg:w-1/2 p-8 lg:p-12">
                <div className="h-full flex flex-col">
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight">
                          {skillTitle}
                        </h1>
                        <p className="text-lg text-gray-600 mb-4">
                          by <span className="font-semibold text-gray-800">{instructorName}</span>
                        </p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-6 text-sm mb-6">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(skillRating) ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="font-medium text-gray-700">{skillRating}</span>
                        <span className="text-gray-500">({studentCount} students)</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-gray-900">
                          {skillPrice === 0 ? "Free" : `Rs ${skillPrice.toLocaleString()}`}
                        </span>
                        {skillPrice > 0 && (
                          <span className="text-gray-500">per course</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Course Details */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-yellow-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-semibold text-gray-700 text-sm">Duration</span>
                      </div>
                      <span className="text-gray-900 font-medium">{skillDuration}</span>
                    </div>

                    <div className="bg-orange-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                        <span className="font-semibold text-gray-700 text-sm">Level</span>
                      </div>
                      <span className="text-gray-900 font-medium">{skillExperience}</span>
                    </div>

                    <div className="bg-red-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        <span className="font-semibold text-gray-700 text-sm">Category</span>
                      </div>
                      <span className="text-gray-900 font-medium">{skillCategory}</span>
                    </div>

                    <div className="bg-green-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="font-semibold text-gray-700 text-sm">Location</span>
                      </div>
                      <span className="text-gray-900 font-medium">{skillLocation}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-auto space-y-4">
                    {skillPhone && (
                                              <a
                        href={`tel:${skillPhone}`}
                        className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Contact Instructor
                      </a>
                    )}

                    <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Enroll Now
                    </button>

                    <div className="grid grid-cols-2 gap-3">
                      <button className="bg-white border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:border-yellow-300 hover:bg-yellow-50 transition-all duration-300 flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                        Share
                      </button>
                      <button className="bg-white border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:border-orange-300 hover:bg-orange-50 transition-all duration-300 flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* About this Skill */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">About this Skill</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                    {skillDescription}
                  </p>
                </div>
              </div>

              {/* What You'll Learn */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll Learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Core concepts and fundamentals",
                    "Practical hands-on experience",
                    "Industry best practices",
                    "Real-world applications",
                    "Advanced techniques",
                    "Professional insights"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-yellow-50 rounded-xl">
                      <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructor Info */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Meet Your Instructor</h2>
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {instructorName.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{instructorName}</h3>
                    <p className="text-gray-600 mb-4">
                      {skillExperience} level instructor with extensive experience in {skillCategory.toLowerCase()}.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>{studentCount} students taught</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>⭐</span>
                        <span>{skillRating} instructor rating</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Course Details Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-32">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Course Details</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold text-gray-900">{skillDuration}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Level</span>
                    <span className="font-semibold text-gray-900">{skillExperience}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Location</span>
                    <span className="font-semibold text-gray-900">{skillLocation}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Students</span>
                    <span className="font-semibold text-gray-900">{studentCount}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Rating</span>
                    <div className="flex items-center gap-1">
                      <span>⭐</span>
                      <span className="font-semibold text-gray-900">{skillRating}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {skillPrice === 0 ? "Free" : `Rs ${skillPrice.toLocaleString()}`}
                    </div>
                    <div className="text-gray-500 text-sm">
                      {skillPrice > 0 && "One-time payment"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Skills */}
              <RelatedSkills currentSkillId={skill._id} category={skillCategory} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 py-8 bg-white/80 backdrop-blur-sm border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 rounded-2xl p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="text-2xl font-bold text-white">UniTunes</span>
              </div>
            </div>
          </div>
          <p className="text-gray-500 text-sm mb-2">
            © 2025 UniTunes. Empowering learning through expert instruction.
          </p>
          <p className="text-gray-400 text-xs">
            Transform your potential into expertise with world-class skills training
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkillDetails;