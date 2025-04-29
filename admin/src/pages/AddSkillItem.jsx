import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const backendUrl = 'http://localhost:4000';

const AddSkillItem = ({ token }) => {
  const { skillType } = useParams();
  const [skillName, setSkillName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState('');
  const [skillImage, setSkillImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('skillType', skillType);
      formData.append('skillName', skillName);
      formData.append('studentName', studentName);
      formData.append('contact', contact);
      formData.append('description', description);
      if (skillImage) {
        formData.append('skillImage', skillImage);
      }

      const response = await axios.post(`${backendUrl}/api/skills/add`, formData, {
        headers: {
          token,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setSkillName('');
        setStudentName('');
        setContact('');
        setDescription('');
        setSkillImage(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <form onSubmit={handleSubmit} className="bg-blue-100 p-8 rounded-xl shadow-md w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">
          Add {skillType.charAt(0).toUpperCase() + skillType.slice(1)} Skill Ad
        </h2>

        <input value={skillName} onChange={(e) => setSkillName(e.target.value)} placeholder="Skill Name" required className="input" />
        <input value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="Student Name" required className="input" />
        <input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Contact Number" required className="input" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required className="input" />

        <div className="my-3">
          <label className="text-gray-600 block mb-1">Upload Skill Image (optional)</label>
          <input type="file" accept="image/*" onChange={(e) => setSkillImage(e.target.files[0])} className="w-full" />
        </div>

        <button type="submit" className="bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-700 w-full">
          Add Skill Advertisement
        </button>
      </form>
    </div>
  );
};

export default AddSkillItem;
