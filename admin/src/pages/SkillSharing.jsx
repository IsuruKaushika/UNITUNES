// src/pages/SkillSharing.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const backendUrl = 'http://localhost:4000';

const SkillSharing = ({ token }) => {
  const navigate = useNavigate();
  const [skill, setSkill] = useState('');
  const [studentName, setStudentName] = useState('');
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('skill', skill);
      formData.append('studentName', studentName);
      formData.append('contact', contact);
      formData.append('description', description);
      image && formData.append('image', image);

      const response = await axios.post(`${backendUrl}/api/skillshare/add`, formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setSkill('');
        setStudentName('');
        setContact('');
        setDescription('');
        setImage(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
      <div className="w-full">
        <p>Skill</p>
        <input
          onChange={(e) => setSkill(e.target.value)}
          value={skill}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Enter skill (e.g. Web Design, Physics Tutoring)"
          required
        />
      </div>

      <div className="w-full">
        <p>Student Name</p>
        <input
          onChange={(e) => setStudentName(e.target.value)}
          value={studentName}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Enter your name"
          required
        />
      </div>

      <div className="w-full">
        <p>Contact Number</p>
        <input
          onChange={(e) => setContact(e.target.value)}
          value={contact}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Enter contact number"
          required
        />
      </div>

      <div className="w-full">
        <p>More Details</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Describe your service or skill"
          required
        />
      </div>

      <div>
        <p className="mb-2">Upload Image</p>
        <label htmlFor="image">
          <img className="w-20" src={!image ? 'upload_area_placeholder_image_url' : URL.createObjectURL(image)} alt="Upload" />
          <input type="file" id="image" hidden onChange={(e) => setImage(e.target.files[0])} />
        </label>
      </div>

      <div className="flex gap-4 mt-4">
        <button type="submit" className="w-28 py-3 bg-green-600 text-white">ADD</button>
        <button type="button" className="w-28 py-3 bg-gray-800 text-white" onClick={() => navigate('/skillsharinglist')}>
          Skill List
        </button>
      </div>
    </form>
  );
};

export default SkillSharing;
