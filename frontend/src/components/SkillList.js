import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
          </svg>
        </div>
        <div className="text-white font-bold text-lg">UniTunes</div>
      </div>
    </div>
  </div>
);

const FilterBar = ({ onFilterChange, activeFilter }) => {
  const categories = ["coding", "design", "writing", "marketing", "other"];
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onFilterChange(cat)}
            className={`px-4 py-2 rounded-xl font-medium transition-colors duration-300 ${
              activeFilter === cat
                ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
        <button
          onClick={() => onFilterChange("")}
          className="px-4 py-2 rounded-xl font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all duration-300"
        >
          All
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
  const [categoryFilter, setCategoryFilter] = useState("");

  // Fetch skills
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/skill/list-active`);
        if (response.data.success && Array.isArray(response.data.skills)) {
          setSkills(response.data.skills);
        } else {
          setSkills([]);
        }
      } catch (error) {
        console.error("Error fetching skills:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  // Remove skill
  const removeSkill = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/skill/remove`,
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        alert(response.data.message);
        setSkills((prev) => prev.filter((skill) => skill._id !== id));
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  // Filter & search
  const filteredSkills = skills.filter((skill) => {
    const matchesSearch =
      searchQuery === "" ||
      (skill.skillType && skill.skillType.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (skill.studentName && skill.studentName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      categoryFilter === "" || (skill.category && skill.category.toLowerCase() === categoryFilter);

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading skills...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-200 rounded-lg">
          Back
        </button>
        <CustomLogo onClick={() => navigate("/")} />
      </div>

      <div className="max-w-4xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none"
        />
      </div>

      <FilterBar onFilterChange={setCategoryFilter} activeFilter={categoryFilter} />

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.length > 0 ? (
          filteredSkills.map((skill) => (
            <div
              key={skill._id}
              onClick={() => navigate(`/skills/${skill._id}`, { state: { item: skill } })}
              className="bg-white rounded-2xl shadow-lg p-4 cursor-pointer hover:shadow-xl transition-all"
            >
              <div className="h-44 relative">
                {skill.images?.[0] ? (
                  <img
                    src={`${backendUrl}/${skill.images[0]}`}
                    alt={skill.skillType}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-xl">
                    No Image
                  </div>
                )}
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-bold mb-2">{skill.skillType}</h3>
                <p className="text-gray-500 line-clamp-2">{skill.moreDetails}</p>
                <p className="text-sm text-gray-400 mt-1">By: {skill.studentName}</p>
                {token && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSkill(skill._id);
                    }}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors duration-300"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20">No skills found 😢</div>
        )}
      </div>
    </div>
  );
};

export default SkillList;
