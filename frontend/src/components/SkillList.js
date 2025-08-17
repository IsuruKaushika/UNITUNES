import React from "react";
import { useNavigate } from "react-router-dom";

const SkillList = () => {
  const navigate = useNavigate();

  const skillData = [
    {
      id: 1,
      name: "Kasun Perera",
      skill: "Graphic Design",
      image: "/images/skill-1.jpg",
      type: "Creative",
      criteria: "Photoshop, Illustrator",
      specialization: "Logo & Branding",
      phone: "0771234567",
      payment: "Paid",
    },
    {
      id: 2,
      name: "Nimali Silva",
      skill: "Tutoring",
      image: "/images/skill-2.jpg",
      type: "Education",
      criteria: "Mathematics, Physics",
      specialization: "A/L Tutoring",
      phone: "0719876543",
      payment: "Free",
    },
    {
      id: 3,
      name: "Tharindu Jayasena",
      skill: "Video Editing",
      image: "/images/skill-3.jpg",
      type: "Multimedia",
      criteria: "Adobe Premiere, After Effects",
      specialization: "Short Films",
      phone: "0751122334",
      payment: "Paid",
    },
  ];

  const handleClick = (item) => {
    navigate(`/skill-details/${item.id}`, { state: item });
  };

  return (
    <div className="relative min-h-screen bg-white py-12 px-4">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-center text-black mb-12 drop-shadow">
        👩‍🎓 Skill Sharing
      </h1>

      {/* Skill Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {skillData.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClick(item)}
            className="bg-yellow-100 border border-yellow-200 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-black line-clamp-1">
                {item.skill}
              </h3>
              <p className="text-sm text-gray-800 mt-1">{item.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillList;
