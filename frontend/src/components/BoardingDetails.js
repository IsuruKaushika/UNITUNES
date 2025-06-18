import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../components/Styles/BoardingDetails.css";

const backendUrl = "http://localhost:4000";

const BoardingDetails = () => {
  const { id } = useParams();
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

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (!details) return <p className="text-center text-red-600">Details not found!</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-blue-50 rounded-xl shadow-sm text-slate-800">
      <h2 className="text-3xl font-bold mb-6 text-slate-900">{details.Title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {details.image?.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Boarding ${index + 1}`}
            className="rounded-lg shadow-sm object-cover w-full h-64"
          />
        ))}
      </div>

      <div className="space-y-2 text-lg">
        <p><span className="font-semibold text-slate-700">Owner:</span> {details.owner}</p>
        <p><span className="font-semibold text-slate-700">Address:</span> {details.address}</p>
        <p><span className="font-semibold text-slate-700">Rooms:</span> {details.Rooms}</p>
        <p><span className="font-semibold text-slate-700">Bathrooms:</span> {details.bathRooms}</p>
        <p><span className="font-semibold text-slate-700">Description:</span> {details.description}</p>
        <p className="text-emerald-600 text-xl font-bold">Rs {details.price} / month</p>
        <p><span className="font-semibold text-slate-700">Contact:</span> {details.contact}</p>
      </div>

      {details.features?.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold text-slate-800 mb-2">Features:</h4>
          <ul className="list-disc list-inside text-slate-700">
            {details.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8">
        <a
          href={`https://wa.me/${details.contact?.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-xl shadow transition duration-200">
            Contact via WhatsApp
          </button>
        </a>
      </div>
    </div>
  );
};

export default BoardingDetails;
