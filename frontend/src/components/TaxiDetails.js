import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const backendUrl = process.env.VITE_BACKEND_URL;

const TaxiDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.post(`${backendUrl}/api/taxi/single`, {
          taxiId: id,
        });
        if (response.data?.success && response.data.taxi) {
          setDetails(response.data.taxi);
        } else {
          console.error("Invalid response:", response.data);
        }
      } catch (err) {
        console.error("Error:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <div className="animate-spin h-16 w-16 border-b-2 border-orange-500 rounded-full"></div>
      </div>
    );

  if (!details)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-orange-50">
        <h2 className="text-2xl font-bold text-orange-600 mb-3">
          Taxi Not Found
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition"
        >
          Back
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-orange-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition"
        >
          ← Back to List
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images */}
          <div>
            <img
              src={details.image?.[selectedImageIndex]}
              alt={details.Title}
              className="w-full h-96 object-cover rounded-xl shadow-lg"
            />
            {details.image?.length > 1 && (
              <div className="flex gap-3 mt-3 overflow-x-auto">
                {details.image.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="Thumbnail"
                    onClick={() => setSelectedImageIndex(i)}
                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                      selectedImageIndex === i
                        ? "border-orange-500"
                        : "border-gray-200 hover:border-orange-400"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h1 className="text-3xl font-bold text-orange-600 mb-3">
                {details.Title}
              </h1>
              <p className="text-gray-700 mb-2">{details.address}</p>
              <p className="text-2xl font-semibold text-orange-500">
                Rs {details.price} / trip
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-bold text-orange-600 mb-3">
                Description
              </h2>
              <p className="text-gray-700">{details.description}</p>
            </div>

            {/* Contact */}
            <div className="bg-white p-6 rounded-xl shadow space-y-3">
              <h2 className="text-xl font-bold text-orange-600 mb-3">
                Contact
              </h2>
              <a
                href={`https://wa.me/${details.contact?.replace(/\D/g, "")}`}
                className="block w-full text-center bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
              >
                WhatsApp
              </a>
              <button className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition">
                Call Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxiDetails;
