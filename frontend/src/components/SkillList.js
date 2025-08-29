import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

// --- Custom Logo (same style as BoardingList) ---
const CustomLogo = ({ onClick, className = "" }) => (
  <div
    onClick={onClick}
    className={`cursor-pointer hover:scale-110 transition-transform duration-300 ${className}`}
  >
    <div className="bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 rounded-2xl p-3 shadow-lg">
      <div className="flex items-center gap-2">
        <div className="relative">
          <svg
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 14l9-5-9-5-9 5 9 5zm0 0l9-5v10l-9 5-9-5V9l9 5z" />
          </svg>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
        </div>
        <div className="text-white font-bold text-lg">UniTunes</div>
      </div>
    </div>
  </div>
);

// --- Floating Action Button ---
const FloatingActionButton = ({ onClick }) => (
  <div className="fixed bottom-6 right-6 z-50">
    <button
      onClick={onClick}
      className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 group animate-bounce hover:animate-none"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    </button>
    <div className="absolute -top-2 -left-16 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
      Add Skill
    </div>
  </div>
);

// --- Favorites hook ---
const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("skillFavorites") || "[]");
    setFavorites(saved);
  }, []);

  const toggleFavorite = (id) => {
    const updated = favorites.includes(id)
      ? favorites.filter((f) => f !== id)
      : [...favorites, id];

    setFavorites(updated);
    localStorage.setItem("skillFavorites", JSON.stringify(updated));
  };

  return { favorites, toggleFavorite };
};

const SkillList = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/skills/list`);
        if (res.data?.success && Array.isArray(res.data.skills)) {
          setSkills(res.data.skills);
          setFilteredSkills(res.data.skills);
        }
      } catch (err) {
        console.error("Error fetching skills:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  useEffect(() => {
    let filtered = [...skills];
    if (searchQuery) {
      filtered = filtered.filter(
        (s) =>
          s.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredSkills(filtered);
  }, [skills, searchQuery]);

  const handleCardClick = (id) => {
    navigate(`/skill-details/${id}`);
  };

  const handleAddSkill = () => {
    navigate("/add-skill");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <div className="relative bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-800 to-gray-700 text-white px-6 py-3 rounded-xl shadow-lg hover:from-yellow-500 hover:to-yellow-400 hover:text-gray-900 transition-all font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <CustomLogo onClick={() => navigate("/")} />
        </div>
      </div>

      {/* Title */}
      <div className="text-center my-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mb-6 shadow-lg animate-bounce">
          <span className="text-3xl">🎓</span>
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent mb-4">
          Skill Sharing Marketplace
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover, learn, and share skills with your community
        </p>
      </div>

      {/* Search */}
      <div className="max-w-4xl mx-auto mb-8">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by skill, category, or description..."
          className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl shadow-lg focus:ring-4 focus:ring-yellow-100 text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pb-16">
        {loading ? (
          <div className="text-center py-20">Loading skills...</div>
        ) : filteredSkills.length > 0 ? (
          <div
            className={`${
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                : "space-y-6"
            }`}
          >
            {filteredSkills.map((skill) => (
              <div
                key={skill._id}
                onClick={() => handleCardClick(skill._id)}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden border border-gray-100 hover:border-yellow-200"
              >
                <div className="relative h-48">
                  <img
                    src={skill.images?.[0]}
                    alt={skill.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(skill._id);
                    }}
                    className={`absolute top-4 right-4 p-2 rounded-full shadow-lg ${
                      favorites.includes(skill._id)
                        ? "bg-red-100 text-red-500"
                        : "bg-white/90 text-gray-400 hover:text-red-500"
                    }`}
                  >
                    ❤️
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {skill.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {skill.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">
                      Rs {parseInt(skill.price).toLocaleString()}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        skill.availability === "available"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {skill.availability}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">No skills available</div>
        )}
      </div>

      {/* Floating Add Button */}
      <FloatingActionButton onClick={handleAddSkill} />

      {/* Footer */}
      <div className="mt-20 py-8 bg-white/80 backdrop-blur-sm border-t border-gray-100 text-center">
        <p className="text-gray-500 text-sm">
          © 2025 UniTunes. Share and learn skills together.
        </p>
      </div>
    </div>
  );
};

export default SkillList;
