import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

// ----------------- Reusable Components -----------------
const CustomLogo = ({ onClick, className = "" }) => (
  <div
    onClick={onClick}
    className={`cursor-pointer hover:scale-110 transition-transform duration-300 ${className}`}
  >
    <div className="bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 rounded-2xl p-3 shadow-lg">
      <div className="flex items-center gap-2">
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2a9 9 0 100 18 9 9 0 000-18zm3.5 9.5l-4 4-2-2 1.5-1.5 0.5 0.5 2.5-2.5 1.5 1.5z" />
        </svg>
        <div className="text-white font-bold text-lg">UniTunes</div>
      </div>
    </div>
  </div>
);

const FloatingActionButton = ({ onClick }) => (
  <div className="fixed bottom-6 right-6 z-50">
    <button
      onClick={onClick}
      className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 group animate-bounce hover:animate-none"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    </button>
    <div className="absolute -top-2 -left-20 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
      Add Item
    </div>
  </div>
);

const FilterBar = ({ onFilterChange, activeFilters }) => {
  const priceRanges = [
    { label: "All Prices", value: "all" },
    { label: "Under Rs 500", value: "0-500" },
    { label: "Rs 500 - 1,000", value: "500-1000" },
    { label: "Rs 1,000 - 2,500", value: "1000-2500" },
    { label: "Above Rs 2,500", value: "2500+" }
  ];

  const sortOptions = [
    { label: "Newest First", value: "newest" },
    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" },
    { label: "A-Z", value: "name_asc" }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Price Range</label>
          <select
            value={activeFilters.price}
            onChange={(e) => onFilterChange({ ...activeFilters, price: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-100 focus:border-yellow-300 transition-all duration-300 cursor-pointer text-black"
          >
            {priceRanges.map((range) => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Sort By</label>
          <select
            value={activeFilters.sort}
            onChange={(e) => onFilterChange({ ...activeFilters, sort: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-100 focus:border-yellow-300 transition-all duration-300 cursor-pointer text-black"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={() => onFilterChange({ price: "all", sort: "newest", showFavoritesOnly: false })}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("rentFavorites") || "[]");
    setFavorites(saved);
  }, []);
  const toggleFavorite = (id) => {
    const updated = favorites.includes(id)
      ? favorites.filter(fav => fav !== id)
      : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem("rentFavorites", JSON.stringify(updated));
  };
  return { favorites, toggleFavorite };
};

// ----------------- Rent Items Page -----------------
const RentItemsPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [filters, setFilters] = useState({ price: "all", sort: "newest", showFavoritesOnly: false });
  const { favorites, toggleFavorite } = useFavorites();

  // Fetch items from backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/rent/list`);
        // Use 'products' like boarding backend
        if (res.data?.success && Array.isArray(res.data.products)) {
          setItems(res.data.products);
          setFiltered(res.data.products);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  // Apply search + filters + sorting
  useEffect(() => {
    let list = [...items];
    if (searchQuery) {
      list = list.filter(item =>
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.owner?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.price !== "all") {
      list = list.filter(item => {
        const p = parseInt(item.price) || 0;
        switch (filters.price) {
          case "0-500": return p <= 500;
          case "500-1000": return p > 500 && p <= 1000;
          case "1000-2500": return p > 1000 && p <= 2500;
          case "2500+": return p > 2500;
          default: return true;
        }
      });
    }

    list.sort((a, b) => {
      switch (filters.sort) {
        case "price_asc": return (parseInt(a.price)||0) - (parseInt(b.price)||0);
        case "price_desc": return (parseInt(b.price)||0) - (parseInt(a.price)||0);
        case "name_asc": return (a.title||"").localeCompare(b.title||"");
        case "newest":
        default:
          if(a.createdAt && b.createdAt) return new Date(b.createdAt)-new Date(a.createdAt);
          return 0;
      }
    });

    setFiltered(list);
  }, [items, searchQuery, filters]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm shadow z-40">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <button onClick={()=>navigate(-1)} className="bg-gradient-to-r from-gray-800 to-gray-700 text-white px-6 py-3 rounded-xl hover:from-yellow-500 hover:to-yellow-400 hover:text-gray-900 transition">Back</button>
          <CustomLogo onClick={()=>navigate("/")} />
        </div>
      </div>

      {/* Title */}
      <div className="text-center my-12">
        <h1 className="text-5xl font-bold text-gray-800">Rental Items</h1>
        <p className="text-gray-600 mt-3">Find, compare, and rent with ease</p>
      </div>

      {/* Search + View Toggle */}
      <div className="max-w-4xl mx-auto mb-8 flex gap-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e)=>setSearchQuery(e.target.value)}
          placeholder="Search by name, category, owner..."
          className="flex-1 px-4 py-3 border border-gray-200 rounded-xl shadow focus:ring-2 focus:ring-yellow-200"
        />
        <div className="flex border border-gray-200 rounded-xl overflow-hidden">
          <button onClick={()=>setViewMode("grid")} className={`px-4 py-2 ${viewMode==="grid"?"bg-yellow-300":""}`}>Grid</button>
          <button onClick={()=>setViewMode("list")} className={`px-4 py-2 ${viewMode==="list"?"bg-yellow-300":""}`}>List</button>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <FilterBar onFilterChange={setFilters} activeFilters={filters} />

        {loading ? (
          <div className="flex justify-center py-20">Loading...</div>
        ) : filtered.length > 0 ? (
          <div className={`${viewMode==="grid"?"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8":"space-y-6"}`}>
            {filtered
              .filter(item => !filters.showFavoritesOnly || favorites.includes(item._id))
              .map(item => (
              <div key={item._id} onClick={()=>navigate(`/rent-details/${item._id}`)} className="bg-white rounded-2xl shadow hover:shadow-xl p-4 cursor-pointer relative">
                <img src={item.image?.[0]} alt={item.title} className="w-full h-48 object-cover rounded-xl" />
                <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold">Rs {item.price}</span>
                  <button onClick={(e)=>{e.stopPropagation(); toggleFavorite(item._id);}} className={`p-2 rounded-full ${favorites.includes(item._id)?"text-red-500":"text-gray-400"}`}>❤️</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-600">No rental items found</div>
        )}
      </div>

      <FloatingActionButton onClick={()=>navigate("/add-rent")} />

      <div className="mt-20 py-8 bg-white/80 backdrop-blur-sm border-t border-gray-100 text-center text-sm text-gray-500">
        © 2025 UniTunes. Rent smarter.
      </div>
    </div>
  );
};

export default RentItemsPage;
