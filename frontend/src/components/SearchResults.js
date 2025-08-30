import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../config";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // get query string ?q=hewfh
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setResults([]);
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`${backendUrl}/api/search?q=${query}`);
        if (response.data.success) {
          setResults(response.data.items); // adjust key (items/skills/ads) based on backend
        } else {
          setResults([]);
        }
      } catch (err) {
        console.error("Search error:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Search Results for "{query}"
      </h2>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : results.length === 0 ? (
        <p className="text-gray-600">No results found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/skills/${item._id}`)}
              className="bg-white shadow-md hover:shadow-xl rounded-2xl p-4 cursor-pointer border border-gray-200"
            >
              {item.images && item.images.length > 0 ? (
                <img
                  src={`${backendUrl}/${item.images[0]}`}
                  alt={item.skillType || "Item"}
                  className="w-full h-40 object-cover rounded-xl"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              <h3 className="text-lg font-semibold mt-2">
                {item.skillType || item.name}
              </h3>
              <p className="text-sm text-gray-600">{item.studentName}</p>
              <p className="text-sm text-blue-600 font-bold mt-1">
                Rs. {item.price}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
