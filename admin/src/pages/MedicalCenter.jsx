import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

const AddMedicalCenter = ({ token }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact: "",
    doctorName: "",
    description: "",
    availableTime: "",
    specialties: [],
    image: [],
    date: Date.now(), // store current timestamp by default
  });

  const [specialtyInput, setSpecialtyInput] = useState("");
  const [imageInput, setImageInput] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add specialty
  const addSpecialty = () => {
    if (specialtyInput.trim() !== "") {
      setFormData({
        ...formData,
        specialties: [...formData.specialties, specialtyInput.trim()],
      });
      setSpecialtyInput("");
    }
  };

  // Add image
  const addImage = () => {
    if (imageInput.trim() !== "") {
      setFormData({
        ...formData,
        image: [...formData.image, imageInput.trim()],
      });
      setImageInput("");
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${backendUrl}/api/medical/add`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Medical center added successfully!");
      setFormData({
        name: "",
        address: "",
        contact: "",
        doctorName: "",
        description: "",
        availableTime: "",
        specialties: [],
        image: [],
        date: Date.now(),
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding medical center");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Add Medical Center</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Medical Center Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact"
          value={formData.contact}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="doctorName"
          placeholder="Doctor Name"
          value={formData.doctorName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="availableTime"
          placeholder="Available Time (e.g., 9 AM - 5 PM)"
          value={formData.availableTime}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        {/* Specialties */}
        <div>
          <label className="font-semibold">Specialties</label>
          <div className="flex gap-2 mt-1">
            <input
              type="text"
              value={specialtyInput}
              onChange={(e) => setSpecialtyInput(e.target.value)}
              placeholder="Add Specialty"
              className="flex-1 p-2 border rounded"
            />
            <button
              type="button"
              onClick={addSpecialty}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.specialties.map((sp, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                {sp}
              </span>
            ))}
          </div>
        </div>

        {/* Images */}
        <div>
          <label className="font-semibold">Images (URLs)</label>
          <div className="flex gap-2 mt-1">
            <input
              type="text"
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              placeholder="Image URL"
              className="flex-1 p-2 border rounded"
            />
            <button
              type="button"
              onClick={addImage}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.image.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="preview"
                className="w-20 h-20 object-cover rounded border"
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-purple-600 text-white font-semibold rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddMedicalCenter;
