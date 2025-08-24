import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";

// backend URL
const backendUrl = "https://unitunes-backend.vercel.app" || "http://localhost:4000";

const BoardingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [boarding, setBoarding] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoarding = async () => {
      try {
        const response = await axios.post(`${backendUrl}/api/boarding/single`, { boardingId: id });
        if (response.data?.success && response.data.boarding) {
          setBoarding(response.data.boarding);
        } else {
          console.warn("Invalid data received:", response.data);
        }
      } catch (error) {
        console.error("Error fetching boarding details:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBoarding();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500 mt-20">Loading...</p>;
  if (!boarding) return <p className="text-center text-red-500 mt-20">Boarding details not found!</p>;

  return (
    <div className="min-h-screen bg-yellow-50 px-4 py-6">
      {/* Navigation */}
      <div className="flex justify-between items-center max-w-6xl mx-auto mb-6">
        <button
          onClick={() => navigate(-1)}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          ← Back
        </button>
        <img
          src={logo}
          alt="UniTunes Logo"
          className="h-16 rounded-xl shadow cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>

      {/* Boarding Card */}
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-slate-900">{boarding.Title}</h2>

        {/* Images */}
        <div className="flex gap-4 overflow-x-auto mb-6">
          {boarding.image?.map((img, index) => (
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
          Rs {boarding.price}
          <span className="text-lg text-slate-700 font-medium"> / month</span>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-[17px]">
          <p><strong className="text-slate-700">Owner:</strong> {boarding.owner}</p>
          <p><strong className="text-slate-700">Address:</strong> {boarding.address}</p>
          <p><strong className="text-slate-700">Rooms:</strong> {boarding.Rooms}</p>
          <p><strong className="text-slate-700">Bathrooms:</strong> {boarding.bathRooms}</p>
          <p><strong className="text-slate-700">Contact:</strong> {boarding.contact}</p>
        </div>

        {/* Description */}
        {boarding.description && (
          <div className="mb-8">
            <h3 className="font-bold text-lg text-slate-900 mb-2">Description</h3>
            <p className="text-slate-700">{boarding.description}</p>
          </div>
        )}

        {/* Features */}
        {boarding.features?.length > 0 && (
          <div className="mb-10">
            <h4 className="font-bold text-lg text-slate-900 mb-2">Features</h4>
            <ul className="list-disc list-inside text-slate-700 space-y-1">
              {boarding.features.map((feature, i) => <li key={i}>{feature}</li>)}
            </ul>
          </div>
        )}

        {/* WhatsApp Button */}
        {boarding.contact && (
          <a
            href={`https://wa.me/${boarding.contact.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-6 rounded-xl shadow transition">
              Contact via WhatsApp
            </button>
          </a>
        )}
      </div>
    </div>
  );
};

export default BoardingDetails;
