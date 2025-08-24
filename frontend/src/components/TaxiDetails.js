import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";

const backendUrl = process.env.VITE_BACKEND_URL || "http://localhost:4000";

const TaxiDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [taxi, setTaxi] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTaxi = async () => {
      try {
        const response = await axios.post(`${backendUrl}/api/taxi/single`, { taxiId: id });
        if (response.data?.success && response.data.taxi) {
          setTaxi(response.data.taxi);
        } else {
          console.warn("Invalid response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching taxi details:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTaxi();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500 mt-20">Loading taxi details...</p>;
  if (!taxi)
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold text-black mb-3">Taxi Not Found</h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-600 transition"
        >
          Back
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-yellow-50 px-4 py-6">
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

      <div className="max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-slate-900">{taxi.Title}</h2>

        <div className="flex gap-4 overflow-x-auto mb-6">
          {taxi.image?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Taxi ${index + 1}`}
              className="rounded-lg object-cover w-72 h-48 shadow"
            />
          ))}
        </div>

        <div className="text-emerald-600 text-2xl font-bold mb-6">
          Rs {taxi.price} <span className="text-lg text-slate-700 font-medium">/ trip</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-[17px]">
          <p><strong className="text-slate-700">Owner:</strong> {taxi.owner}</p>
          <p><strong className="text-slate-700">Address:</strong> {taxi.address}</p>
          <p><strong className="text-slate-700">Contact:</strong> {taxi.contact}</p>
        </div>

        {taxi.description && (
          <div className="mb-8">
            <h3 className="font-bold text-lg text-slate-900 mb-2">Description</h3>
            <p className="text-slate-700">{taxi.description}</p>
          </div>
        )}

        {taxi.contact && (
          <a
            href={`https://wa.me/${taxi.contact.replace(/\D/g, "")}`}
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

export default TaxiDetails;
