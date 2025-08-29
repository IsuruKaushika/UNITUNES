// src/pages/SkillList.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const SkillList = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch active skills from backend
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/skill/list-active`);
        if (response.data?.success && Array.isArray(response.data.skills)) {
          setSkills(response.data.skills);
        } else {
          setSkills([]);
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
        setSkills([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  // Helper for safe image URL
  const getImageUrl = (imgPath) => {
    if (!imgPath) return null;
    return imgPath.startsWith("http") ? imgPath : `${backendUrl}/${imgPath}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Available Skills
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading skills...</p>
      ) : skills.length === 0 ? (
        <p className="text-center text-gray-600">No skills available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <div
              key={skill._id}
              onClick={() => navigate(`/skills/${skill._id}`)}
              className="bg-white shadow-md hover:shadow-xl transition-shadow rounded-2xl overflow-hidden cursor-pointer border border-gray-100"
            >
              {/* Skill Image */}
              {skill.images && skill.images.length > 0 ? (
                <img
                  src={getImageUrl(skill.images[0])}
                  alt={skill.skillType || "Skill"}
                  className="w-full h-44 object-cover"
                />
              ) : (
                <div className="w-full h-44 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                  No Image Available
                </div>
              )}

              {/* Skill Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {skill.skillType || "Unnamed Skill"}
                </h3>
                <p className="text-sm text-gray-600">
                  {skill.studentName || "Unknown Student"}
                </p>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {skill.moreDetails || "No details provided."}
                </p>
                <p className="text-sm mt-2">
                  <span className="font-medium">Experience:</span>{" "}
                  {skill.experience || "Not specified"}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Location:</span>{" "}
                  {skill.location || "Not specified"}
                </p>
                <p className="text-sm font-bold text-blue-600 mt-2">
                  Rs. {(Number(skill.price) || 0).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillList;
