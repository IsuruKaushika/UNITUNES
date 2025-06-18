import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png"; // Adjust the path as needed

const backendUrl = "http://localhost:4000";

const BoardingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoardingDetails = async () => {
      try {
        const response = await axios.post(`${backendUrl}/api/boarding/single`, {
          boardingId: id,
        });

        if (response.data?.success && response.data.boarding) {
          setDetails(response.data.boarding);
        } else {
          console.error("Invalid response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching boarding details:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBoardingDetails();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500 mt-20">Loading...</p>;
  if (!details) return <p className="text-center text-red-500 mt-20">Details not found!</p>;

  return (
    <div className="min-h-screen bg-yellow-50 px-4 py-6">
      {/* Top Navigation: Back + Logo */}
      <div className="flex justify-between items-center max-w-6xl mx-auto mb-6">
        <button
          onClick={() => navigate(-1)}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          ← Back
        </button>
        <img
          src={logo}
          alt="Unitune Logo"
          className="h-16 rounded-xl shadow cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>

      {/* Main Card */}
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-slate-900">{details.Title}</h2>

        {/* Image Gallery */}
        <div className="flex gap-4 overflow-x-auto mb-6">
          {details.image?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Boarding ${index + 1}`}
              className="rounded-lg object-cover w-72 h-48 shadow"
            />
          ))}
        </div>

        {/* Price */}
        <div className="text-emerald-600 text-2xl font-bold mb-6">
          Rs {details.price} <span className="text-lg text-slate-700 font-medium">/ month</span>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-[17px]">
          <p><span className="font-semibold text-slate-700">Owner:</span> {details.owner}</p>
          <p><span className="font-semibold text-slate-700">Address:</span> {details.address}</p>
          <p><span className="font-semibold text-slate-700">Rooms:</span> {details.Rooms}</p>
          <p><span className="font-semibold text-slate-700">Bathrooms:</span> {details.bathRooms}</p>
          <p><span className="font-semibold text-slate-700">Contact:</span> {details.contact}</p>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h3 className="font-bold text-lg text-slate-900 mb-2">Description</h3>
          <p className="text-slate-700">{details.description}</p>
        </div>

        {/* Features */}
        {details.features?.length > 0 && (
          <div className="mb-10">
            <h4 className="font-bold text-lg text-slate-900 mb-2">Features</h4>
            <ul className="list-disc list-inside text-slate-700 space-y-1">
              {details.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        {/* WhatsApp Button */}
        <div>
          <a
            href={`https://wa.me/${details.contact?.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-6 rounded-xl shadow transition duration-200">
              Contact via WhatsApp
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default BoardingDetails;
