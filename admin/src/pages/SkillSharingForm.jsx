import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const SkillSharingForm = ({ token }) => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [skill, setSkill] = useState('');
  const [studentName, setStudentName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('skill', skill);
      formData.append('studentName', studentName);
      formData.append('description', description);
      if (image) formData.append('image', image);

      const res = await axios.post(`${backendUrl}/api/skill-ads`, formData, {
        headers: { token },
      });

      if (res.data.success) {
        toast.success('Ad posted successfully!');
        navigate('/skill-sharing');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error('Failed to post ad.');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-orange-50">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-md px-4 py-6 bg-white rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-2">Post Your Skill Ad</h2>

        <label>Skill</label>
        <input type="text" required value={skill} onChange={(e) => setSkill(e.target.value)} className="border px-3 py-2" placeholder="e.g., Photoshop, Python" />

        <label>Your Name</label>
        <input type="text" required value={studentName} onChange={(e) => setStudentName(e.target.value)} className="border px-3 py-2" />

        <label>Description</label>
        <textarea required value={description} onChange={(e) => setDescription(e.target.value)} className="border px-3 py-2" placeholder="Explain what you're offering..." />

        <label>Upload Image (optional)</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <button type="submit" className="bg-blue-600 text-white py-2 mt-4 rounded-md">Post Ad</button>
      </form>
    </div>
  )
}

export default SkillSharingForm;
