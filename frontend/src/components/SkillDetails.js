import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const SkillDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-yellow-50 text-gray-800">
        <h2 className="text-2xl font-bold mb-4">Skill data not found</h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-yellow-400 hover:text-black transition"
        >
          ← Back
        </button>
      </div>
    );
  }

  const { name, image, skill, type, criteria, specialization, phone, payment } =
    state;

  return (
    <div className="min-h-screen bg-yellow-50 py-12 px-4 flex justify-center items-center">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 bg-black text-white px-4 py-2 rounded-lg hover:bg-yellow-400 hover:text-black transition"
      >
        ← Back
      </button>

      {/* Skill Details Box */}
      <div className="max-w-5xl w-full bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row transform scale-105">
        {/* Skill Image */}
        <img
          src={image}
          alt={name}
          className="w-full md:w-1/2 h-96 object-cover"
        />

        {/* Skill Info */}
        <div className="p-8 md:w-1/2">
          <h2 className="text-3xl font-extrabold text-black mb-4">{skill}</h2>
          <p className="text-gray-700 mb-2">
            <strong>Student:</strong> {name}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Skill Type:</strong> {type}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Criteria:</strong> {criteria}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Specialization:</strong> {specialization}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Phone:</strong> {phone}
          </p>
          <p className="text-gray-700 mb-5">
            <strong>Payment:</strong> {payment}
          </p>

          {/* Contact Button */}
          <button className="bg-yellow-500 text-black px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition font-semibold">
            📞 Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillDetails;
