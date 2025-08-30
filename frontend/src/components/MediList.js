import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Use Vite env variable
const backendUrl = process.env.REACT_APP_BACKEND_URL;

// Custom Logo Component
const CustomLogo = ({ onClick, className = "" }) => (
  <div
    onClick={onClick}
    className={`cursor-pointer hover:scale-110 transition-transform duration-300 ${className}`}
  >
    <div className="bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 rounded-2xl p-3 shadow-lg">
      <div className="flex items-center gap-2">
        <div className="relative">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
        </div>
        <div className="text-white font-bold text-lg">UniTunes</div>
      </div>
    </div>
  </div>
);

// Filter Bar Component (Category)
const FilterBar = ({ onFilterChange, activeFilter, categories }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onFilterChange(cat)}
            className={`px-4 py-2 rounded-xl font-medium transition-colors duration-300 ${
              activeFilter === cat
                ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
        <button
          onClick={() => onFilterChange("")}
          className="px-4 py-2 rounded-xl font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all duration-300"
        >
          All
        </button>
      </div>
    </div>
  );
};

const MediList = ({ token }) => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    const fetchServices = async () => {
      try {
<<<<<<< HEAD
        const response = await axios.get(`${backendUrl}/api/medical-services`);
        if (response.data?.success && Array.isArray(response.data.services)) {
          setServices(response.data.services);
        } else {
          console.error("Invalid response:", response.data);
        }
=======
        const response = await axios.get(`${backendUrl}/api/pharmacy`);
        if (response.data?.success) setServices(response.data.services);
>>>>>>> 14addcecd28d10baa1292a8e62b3fa7786be8776
      } catch (err) {
        console.error("Error fetching services:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Remove service (optional if token exists)
  const removeService = async (id) => {
    if (!token) return;
    if (!window.confirm("Are you sure you want to remove this service?")) return;
    try {
      const response = await axios.post(
        `${backendUrl}/api/medical-services/remove`,
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        alert(response.data.message);
        setServices((prev) => prev.filter((s) => s._id !== id));
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // Filter and search
  const filteredServices = services
    .filter((s) => {
      const matchesSearch =
        !searchQuery ||
        s.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !categoryFilter || s.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => a.name.localeCompare(b.name)); // Sort by name

  const categories = [...new Set(services.map((s) => s.category))];

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading services...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-200 rounded-lg">
          Back
        </button>
        <CustomLogo onClick={() => navigate("/")} />
      </div>

      <div className="max-w-4xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search medical services..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none"
        />
      </div>

      <FilterBar
        categories={categories}
        activeFilter={categoryFilter}
        onFilterChange={setCategoryFilter}
      />

      <div
        className={`max-w-7xl mx-auto ${
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }`}
      >
        {filteredServices.length > 0 ? (
          filteredServices.map((s) => (
            <div
              key={s._id}
              onClick={() => navigate(`/medi-details/${s._id}`, { state: { service: s } })}
              className={`bg-white rounded-2xl shadow-lg p-4 cursor-pointer hover:shadow-xl transition-all ${
                viewMode === "list" ? "flex items-center gap-4" : ""
              }`}
            >
              <div className={`${viewMode === "list" ? "w-48 h-32 flex-shrink-0" : "h-56"} relative`}>
                {s.image ? (
                  <img
                    src={`${backendUrl}/${s.image}`}
                    alt={s.name}
                    className="w-full h-full object-cover rounded-xl"
                    onError={(e) => {
                      e.target.src = "/placeholder-image.jpg";
                      e.target.onerror = null;
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-xl">
                    No Image
                  </div>
                )}
              </div>
              <div className={`${viewMode === "list" ? "flex-1" : "mt-4"}`}>
                <h3 className="text-xl font-bold mb-2">{s.name}</h3>
                <p className="text-gray-500 line-clamp-2">{s.description}</p>
                <p className="text-sm text-gray-400 mt-1">Category: {s.category}</p>
                {token && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeService(s._id);
                    }}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors duration-300"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20">No services found 😢</div>
        )}
      </div>
    </div>
  );
};

export default MediList;
