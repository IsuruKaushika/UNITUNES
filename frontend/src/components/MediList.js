import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

// Filter Component
const FilterBar = ({ onFilterChange, activeFilters, categories }) => {
  const handleCategoryChange = (value) => onFilterChange({ ...activeFilters, category: value });
  const handleSortChange = (value) => onFilterChange({ ...activeFilters, sort: value });

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Category
            <span className="ml-2 text-xs bg-yellow-100 text-black px-2 py-1 rounded-full">
              {activeFilters.category === 'all' ? 'All' : activeFilters.category}
            </span>
          </label>
          <select
            value={activeFilters.category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-100 focus:border-yellow-300 transition-all duration-300 cursor-pointer text-black"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Sort By
            <span className="ml-2 text-xs bg-blue-100 text-black px-2 py-1 rounded-full">
              {activeFilters.sort === 'name' ? 'Name' : 'Category'}
            </span>
          </label>
          <select
            value={activeFilters.sort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-100 focus:border-yellow-300 transition-all duration-300 cursor-pointer text-black"
          >
            <option value="name">Sort by Name</option>
            <option value="category">Sort by Category</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={() => onFilterChange({ category: 'all', sort: 'name' })}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

const MediList = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({ category: 'all', sort: 'name' });

  // Fetch services from backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/medical-services`);
        if (response.data?.success) setServices(response.data.services);
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading services...</div>;

  const categories = [...new Set(services.map(service => service.category))];

  let filteredServices = services.filter(service => {
    const matchesSearch = !searchQuery || 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filters.category === 'all' || service.category === filters.category;
    return matchesSearch && matchesCategory;
  });

  filteredServices.sort((a, b) => filters.sort === 'name'
    ? a.name.localeCompare(b.name)
    : a.category.localeCompare(b.category)
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-200 rounded-lg">Back</button>
        <CustomLogo onClick={() => navigate("/")} />
      </div>

      <div className="max-w-4xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search medical services..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setSearchLoading(true);
            setTimeout(() => setSearchLoading(false), 300);
          }}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none"
        />
      </div>

      <FilterBar onFilterChange={setFilters} activeFilters={filters} categories={categories} />

      <div className={`max-w-7xl mx-auto ${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}`}>
        {filteredServices.length > 0 ? filteredServices.map(service => (
          <div
            key={service._id}
            onClick={() => navigate(`/medi-details/${service._id}`, { state: { service } })}
            className={`bg-white rounded-2xl shadow-lg p-4 cursor-pointer hover:shadow-xl transition-all ${viewMode === 'list' ? 'flex items-center gap-4' : ''}`}
          >
            <div className={`${viewMode === 'list' ? 'w-48 h-32 flex-shrink-0' : 'h-56'} relative`}>
              <img src={service.image} alt={service.name} className="w-full h-full object-cover rounded-xl" />
            </div>
            <div className={`${viewMode === 'list' ? 'flex-1' : 'mt-4'}`}>
              <h3 className="text-xl font-bold mb-2">{service.name}</h3>
              <p className="text-gray-500 line-clamp-2">{service.description}</p>
              <p className="text-sm text-gray-400 mt-1">Category: {service.category}</p>
            </div>
          </div>
        )) : (
          <div className="text-center py-20">No services found 😢</div>
        )}
      </div>
    </div>
  );
};

export default MediList;
