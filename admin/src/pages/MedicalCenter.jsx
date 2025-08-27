import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../assets/assets";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AddMedicalCenter = ({ token }) => {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [centerName, setCenterName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [description, setDescription] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [availableTime, setAvailableTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", centerName);
      formData.append("address", address);
      formData.append("contact", contactNumber);
      formData.append("description", description);
      formData.append("doctorName", doctorName);
      formData.append("availableTime", availableTime);
      if (image) formData.append("image", image);

      const response = await axios.post(
        `${backendUrl}/api/medicare/add`,
        formData,
        {
          headers: {
            token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        // Reset fields
        setCenterName("");
        setAddress("");
        setContactNumber("");
        setDescription("");
        setDoctorName("");
        setAvailableTime("");
        setImage(null);
      } else {
        toast.error(response.data.message || "Failed to add medical center");
      }
    } catch (error) {
      console.error("Error adding medical center:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Something went wrong!";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen"
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white/80 p-6 rounded-xl shadow-xl border border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">🏥 Add New Medical Center</h1>
          <p className="text-sm text-gray-500 mt-1">
            Provide accurate information to help students find medical services.
          </p>
        </div>

        {/* Image Upload */}
        <div className="bg-white/80 p-6 rounded-xl shadow-md border border-gray-200">
          <p className="mb-4 font-semibold text-gray-700">📸 Upload Image</p>
          <label htmlFor="image">
            <div className="w-full h-40 bg-gray-100 border border-gray-300 rounded-xl flex items-center justify-center overflow-hidden cursor-pointer">
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                className="w-full h-full object-cover"
                alt="Upload"
              />
            </div>
            <input
              type="file"
              id="image"
              hidden
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
        </div>

        {/* Basic Info */}
        <div className="bg-white/80 p-6 rounded-xl shadow-md border border-gray-200 grid gap-4">
          <InputField
            label="Medical Center Name"
            value={centerName}
            setValue={setCenterName}
            required
          />
          <InputField
            label="Doctor's Name"
            value={doctorName}
            setValue={setDoctorName}
          />
          <InputField
            label="Contact Number"
            value={contactNumber}
            setValue={setContactNumber}
            type="tel"
            required
          />
          <TextArea label="Address" value={address} setValue={setAddress} required />
        </div>

        {/* Available Time */}
        <div className="bg-white/80 p-6 rounded-xl shadow-md border border-gray-200">
          <TextArea
            label="Available Time"
            value={availableTime}
            setValue={setAvailableTime}
            placeholder="e.g., Mon-Fri: 9am - 5pm, Sat: 9am - 1pm"
          />
        </div>

        {/* Description */}
        <div className="bg-white/80 p-6 rounded-xl shadow-md border border-gray-200">
          <TextArea
            label="Services & Facilities"
            value={description}
            setValue={setDescription}
            placeholder="Describe services, facilities, equipment..."
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Add Medical Center"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/medilist")}
            className="px-6 py-3 bg-gray-700 text-white rounded-xl shadow-md hover:bg-gray-800"
          >
            View Medical Centers
          </button>
        </div>
      </div>
    </form>
  );
};

// Reusable Input
const InputField = ({ label, value, setValue, type = "text", required = false }) => (
  <div className="w-full">
    <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type={type}
      required={required}
      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
    />
  </div>
);

// Reusable TextArea
const TextArea = ({ label, value, setValue, required = false, placeholder = "" }) => (
  <div className="w-full">
    <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
    <textarea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      required={required}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded-xl min-h-[100px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
    />
  </div>
);

export default AddMedicalCenter;
