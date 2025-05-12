// src/pages/SkillSharingList.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const backendUrl = 'http://localhost:4000';

const SkillSharingList = () => {
  const [skills, setSkills] = useState([]);

  const fetchSkills = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/skillshare/list`);
      if (response.data.success) {
        setSkills(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching skills:', error.message);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Skill Sharing List</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {skills.map((item, index) => (
          <div key={index} className="border rounded p-4 shadow-md bg-white">
            <img src={`${backendUrl}/${item.image}`} alt={item.skill} className="w-full h-40 object-cover rounded mb-2" />
            <h3 className="font-semibold text-lg">{item.skill}</h3>
            <p><strong>Name:</strong> {item.studentName}</p>
            <p><strong>Contact:</strong> {item.contact}</p>
            <p><strong>Details:</strong> {item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillSharingList;
