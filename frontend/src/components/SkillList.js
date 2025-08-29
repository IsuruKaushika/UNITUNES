import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

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
        <div className="text-white font-bold text-lg">UniTunes</div>
      </div>
    </div>
  </div>
);

const FilterBar = ({ filters, onFilterChange }) => {
  const categories = [
    "Programming", "Design", "Music", "Sports",
    "Cooking", "Language", "Academic", "Art",
    "Photography", "Other"
  ];
  const experienceLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
      <div className="flex flex-wrap gap-3 items-center">
        {/* Category */}
        <select
          value={filters.category}
          onChange={(e) => onFilterChange("category", e.target.value)}
          className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Experience */}
        <select
          value={filters.experience}
          onChange={(e) => onFilterChange("experience", e.target.value)}
          className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700"
        >
          <option value="">All Levels</option>
          {experienceLevels.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>

        {/* Active only */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={filters.activeOnly}
            onChange={(e) => onFilterChange("activeOnly", e.target.checked)}
          />
          Active Only
        </label>

        {/* Clear */}
        <button
          onClick={() => onFilterChange("clear")}
          className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300 transition-all"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

const SkillList = ({ token }) => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    experience: "",
    activeOnly: true
  });

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backendUrl}/api/skillshare/list`);
        if (response.data.success) {
          let data = response.data.data || response.data.skills || [];
          setSkills(data);
        } else {
          toast.error(response.data.message || "Failed to fetch skills");
        }
      } catch (error) {
        console.error(error);
        toast.error(error.message || "Network error");
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const removeSkill = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/skill/remove`,
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setSkills((prev) => prev.filter((s) => s._id !== id));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleFilterChange = (key, value) => {
    if (key === "clear") {
      setFilters({ category: "", experience: "", activeOnly: true });
    } else {
      setFilters((prev) => ({ ...prev, [key]: value }));
    }
  };

  let filteredSkills = skills.filter((skill) => {
    const matchesSearch =
      searchQuery === "" ||
      (skill.skillType && skill.skillType.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory =
      !filters.category || skill.skillType === filters.category;
    const matchesExperience =
      !filters.experience || skill.experience === filters.experience;
    const matchesActive =
      !filters.activeOnly || skill.isActive !== false;

    return matchesSearch && matchesCategory && matchesExperience && matchesActive;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading skills...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-200 rounded-lg">
          Back
        </button>
        <CustomLogo onClick={() => navigate("/")} />
      </div>

      <div className="max-w-4xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none"
        />
      </div>

      <FilterBar filters={filters} onFilterChange={handleFilterChange} />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.length > 0 ? (
          filteredSkills.map((skill) => (
            <div key={skill._id} className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl cursor-pointer">
              <div className="h-48 bg-gray-200 relative">
                {skill.images && skill.images.length > 0 ? (
                  <img
                    src={`${backendUrl}/${skill.images[0]}`}
                    alt={skill.skillType}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = "/placeholder-image.jpg"; }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                )}
                {!skill.isActive && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs">Inactive</div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{skill.skillType}</h3>
                <p className="text-sm text-gray-500">{skill.studentName}</p>
                <p className="text-sm text-gray-400 mt-1">{skill.experience || "Beginner"}</p>
                <p className="text-sm font-bold text-blue-600 mt-2">
                  {skill.price === 0 ? "Free" : `LKR ${skill.price.toLocaleString()}`}
                </p>

                {token && (
                  <button
                    onClick={() => removeSkill(skill._id)}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors w-full"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 text-gray-500">No skills found 😢</div>
        )}
      </div>
    </div>
  );
};

export default SkillList;
