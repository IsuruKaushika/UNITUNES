// src/pages/SkillList.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const SkillList = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);

  // Fetch active skills
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/skill/list-active`);
        if (response.data.success) {
          setSkills(response.data.skills);
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };
    fetchSkills();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Available Skills</h2>
      {skills.length === 0 ? (
        <p className="text-center text-gray-600">No skills available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <div
              key={skill._id}
              onClick={() => navigate(`/skills/${skill._id}`)}
              className="bg-white shadow-lg rounded-2xl p-4 cursor-pointer hover:shadow-xl transition"
            >
              {/* Skill Images */}
              {skill.images && skill.images.length > 0 ? (
                <img
                  src={skill.images[0]}
                  alt={skill.skillType}
                  className="w-full h-40 object-cover rounded-xl mb-3"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 rounded-xl mb-3 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              {/* Skill Info */}
              <h3 className="text-lg font-semibold">{skill.skillType}</h3>
              <p className="text-sm text-gray-600">{skill.studentName}</p>
              <p className="text-sm text-gray-500 line-clamp-2">{skill.moreDetails}</p>
              <p className="text-sm mt-1">
                <span className="font-medium">Experience:</span> {skill.experience}
              </p>
              <p className="text-sm">
                <span className="font-medium">Location:</span> {skill.location}
              </p>
              <p className="text-sm font-bold text-blue-600 mt-2">
                Rs. {skill.price}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillList;
