import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/**
 * Backend URL (supports CRA + Vite)
 * - CRA: process.env.REACT_APP_BACKEND_URL
 * - Vite: import.meta.env.VITE_BACKEND_URL
 */
const backendUrl = process.env.REACT_APP_BACKEND_URL || "";


// Axios instance so we don't repeat baseURL everywhere
const api = axios.create({
  baseURL: backendUrl?.replace(/\/?$/, ""),
  withCredentials: false,
});

// ---------- helpers ----------
const isAbsoluteUrl = (u) => /^https?:\/\//i.test(u) || u?.startsWith("//");
const trimSlashes = (s = "") => s.replace(/^\/+/, "").replace(/\/+$/, "");

const resolveUrl = (path) => {
  if (!path) return null;
  if (isAbsoluteUrl(path)) return path;
  if (!backendUrl) return path; // fall back if no backendUrl found
  return `${backendUrl.replace(/\/+$/, "")}/${trimSlashes(path)}`;
};

const pickImageUrl = (item) => {
  const candidate =
    item?.itemImage ||
    item?.image ||
    (Array.isArray(item?.images) ? item.images[0] : null) ||
    (Array.isArray(item?.files)
      ? // common shapes: ["/uploads/a.jpg"] or [{ url: "/uploads/a.jpg" }]
        (typeof item.files[0] === "string"
          ? item.files[0]
          : item.files[0]?.url || item.files[0]?.path)
      : null);

  return resolveUrl(candidate) || "/api/placeholder/300/300";
};

const parsePrice = (v) => {
  if (v == null) return 0;
  const n = parseInt(String(v).replace(/[^\d]/g, ""), 10);
  return Number.isNaN(n) ? 0 : n;
};

const normalizeItem = (raw, index = 0) => {
  const id = raw?._id || raw?.id || String(index);
  const name = raw?.itemName || raw?.name || "Untitled";
  const price = parsePrice(raw?.price);
  const available =
    raw?.isAvailable !== false && raw?.available !== false ? true : false;
  const category = raw?.rentType || raw?.category || "Misc";
  const createdAt = raw?.createdAt || raw?.created_at || null;
  const ownerName = raw?.ownerName || raw?.owner || raw?.postedBy || "Unknown";

  return {
    id,
    name,
    price,
    available,
    category,
    createdAt,
    ownerName,
    raw, // keep full original in case you need it later
  };
};

// ---------- UI pieces ----------
const CustomLogo = ({ onClick, className = "" }) => (
  <div
    onClick={onClick}
    className={`cursor-pointer hover:scale-105 transition-transform duration-300 ${className}`}
  >
    <div className="bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 rounded-xl p-2 shadow-md">
      <div className="flex items-center gap-2">
        <div className="relative">
          <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full border border-white animate-pulse"></div>
        </div>
        <div className="text-white font-bold text-lg">UniTunes</div>
      </div>
    </div>
  </div>
);

const CategoriesNav = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    { id: "all", name: "All Items", icon: "🏪", color: "from-gray-500 to-gray-600" },
    { id: "Electronics", name: "Electronics", icon: "💻", color: "from-blue-500 to-blue-600", subCategories: ["Laptops", "Phones", "Tablets", "Cameras", "Gaming"] },
    { id: "Furniture", name: "Furniture", icon: "🪑", color: "from-orange-500 to-orange-600", subCategories: ["Study Table", "Chairs", "Storage", "Bed", "Decoration"] },
    { id: "Tools", name: "Tools", icon: "🔧", color: "from-cyan-500 to-cyan-600", subCategories: ["Study Tools", "Lab Equipment", "Art Supplies", "Tech Tools", "General"] },
    { id: "Books", name: "Books", icon: "📚", color: "from-indigo-500 to-indigo-600", subCategories: ["Textbooks", "Novels", "Reference", "Study Guides", "Magazines"] },
  ];

  const [showDropdown, setShowDropdown] = useState(null);

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-1 py-3 overflow-x-auto">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative"
              onMouseEnter={() => setShowDropdown(category.id)}
              onMouseLeave={() => setShowDropdown(null)}
            >
              <button
                onClick={() => onCategoryChange(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                  activeCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-md`
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="text-sm font-semibold">{category.name}</span>
                {category.subCategories && (
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>

              {category.subCategories && showDropdown === category.id && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl py-2 min-w-48 z-60">
                  {category.subCategories.map((subCategory) => (
                    <button
                      key={subCategory}
                      onClick={() => onCategoryChange(category.id, subCategory)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
                    >
                      {subCategory}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {activeCategory !== "all" && (
          <div className="py-2 border-t border-gray-100">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg px-4 py-2">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">
                  {(() => {
                    const cat = [
                      { id: "all", icon: "🏪", name: "All Items" },
                      { id: "Electronics", icon: "💻", name: "Electronics" },
                      { id: "Furniture", icon: "🪑", name: "Furniture" },
                      { id: "Tools", icon: "🔧", name: "Tools" },
                      { id: "Books", icon: "📚", name: "Books" },
                    ].find((c) => c.id === activeCategory);
                    return `${cat?.icon ?? ""} ${cat?.name ?? ""}`;
                  })()}
                </span>
                <span className="ml-2">- Perfect for university students</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const FilterBar = ({ onFilterChange, activeFilters }) => {
  const priceRanges = [
    { label: "All Prices", value: "all" },
    { label: "Under Rs 500", value: "0-500" },
    { label: "Rs 500 - 1,000", value: "500-1000" },
    { label: "Rs 1,000 - 2,000", value: "1000-2000" },
    { label: "Above Rs 2,000", value: "2000+" },
  ];

  const sortOptions = [
    { label: "Newest First", value: "newest" },
    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" },
    { label: "Relevance", value: "relevance" },
    { label: "Most Popular", value: "popular" },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-medium text-black mb-2 uppercase tracking-wide">
            Price Range
          </label>
          <select
            value={activeFilters.price}
            onChange={(e) => onFilterChange({ ...activeFilters, price: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-black"
          >
            {priceRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-black mb-2 uppercase tracking-wide">
            Sort By
          </label>
          <select
            value={activeFilters.sort}
            onChange={(e) => onFilterChange({ ...activeFilters, sort: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-black"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-black mb-2 uppercase tracking-wide">
            Availability
          </label>
          <select
            value={activeFilters.availability}
            onChange={(e) => onFilterChange({ ...activeFilters, availability: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-black"
          >
            <option value="all">All Items</option>
            <option value="available">Available Only</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={() => onFilterChange({ price: "all", sort: "newest", category: "all", availability: "all" })}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors duration-200 text-sm"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

const FloatingActionButton = ({ onClick }) => (
  <div className="fixed bottom-6 right-6 z-50">
    <button
      onClick={onClick}
      className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 p-4 rounded-full shadow-2xl hover:shadow-lg transform hover:scale-110 transition-all duration-300 group animate-bounce hover:animate-none"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    </button>
    <div className="absolute -top-2 -left-16 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
      Add Item
    </div>
  </div>
);

const ItemSkeleton = () => (
  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden animate-pulse">
    <div className="aspect-square bg-gray-200"></div>
    <div className="p-3">
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-3 bg-gray-200 rounded mb-2 w-2/3"></div>
      <div className="h-4 bg-gray-200 rounded mb-1 w-1/2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/3"></div>
    </div>
  </div>
);

const ErrorMessage = ({ message, onRetry }) => (
  <div className="text-center py-20">
    <div className="w-24 h-24 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-6">
      <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">Something went wrong</h3>
    <p className="text-gray-600 mb-6">{message || "Failed to load rental items. Please try again."}</p>
    <button onClick={onRetry} className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">
      Try Again
    </button>
  </div>
);

// Favorites in-memory (can be wired to localStorage if you want)
const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const toggleFavorite = (id) =>
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  return { favorites, toggleFavorite };
};

function RentItemsPage() {
  const navigate = useNavigate();
  const [itemsRaw, setItemsRaw] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [filters, setFilters] = useState({ price: "all", sort: "newest", category: "all", availability: "all" });
  const { favorites, toggleFavorite } = useFavorites();

  // multiple endpoint attempts like your taxi page
  const endpointCandidates = [
    "/api/rent/list",
    "/api/rent/items",
    "/api/rent/all",
    "/api/rental/list",
    "/api/rentals",
  ];

  const fetchRentalItems = async () => {
    if (!backendUrl) {
      setError("Backend URL is not configured");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    for (const endpoint of endpointCandidates) {
      try {
        const { data } = await api.get(endpoint);
        let list = [];

        if (data?.success && Array.isArray(data.items)) list = data.items;
        else if (data?.success && Array.isArray(data.data)) list = data.data;
        else if (Array.isArray(data)) list = data;
        else if (Array.isArray(data?.items)) list = data.items;
        else if (Array.isArray(data?.data)) list = data.data;

        if (list?.length) {
          setItemsRaw(list);
          setLoading(false);
          return;
        }
      } catch (e) {
        // try next endpoint
        continue;
      }
    }

    setItemsRaw([]);
    setError("Unable to fetch rental items. Please try again later.");
    setLoading(false);
  };

  useEffect(() => {
    fetchRentalItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Normalize raw -> items with derived fields
  useEffect(() => {
    const normalized = itemsRaw.map((r, i) => normalizeItem(r, i));
    setItems(normalized);
  }, [itemsRaw]);

  // filtering + sorting
  const filteredItems = React.useMemo(() => {
    let filtered = [...items];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter((it) => {
        const r = it.raw || {};
        return (
          it.name.toLowerCase().includes(q) ||
          String(r.description || "").toLowerCase().includes(q) ||
          String(it.ownerName || "").toLowerCase().includes(q)
        );
      });
    }

    if (activeCategory !== "all") {
      filtered = filtered.filter((it) => (it.category || "").toLowerCase() === activeCategory.toLowerCase());
    }

    if (filters.availability !== "all") {
      filtered = filtered.filter((it) =>
        filters.availability === "available" ? it.available === true : it.available === false
      );
    }

    if (filters.price !== "all") {
      filtered = filtered.filter((it) => {
        const p = it.price || 0;
        switch (filters.price) {
          case "0-500":
            return p <= 500;
          case "500-1000":
            return p > 500 && p <= 1000;
          case "1000-2000":
            return p > 1000 && p <= 2000;
          case "2000+":
            return p > 2000;
          default:
            return true;
        }
      });
    }

    filtered.sort((a, b) => {
      switch (filters.sort) {
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        case "newest": {
          const ad = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const bd = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return bd - ad;
        }
        case "popular":
          return (b.raw?.popularity || 0) - (a.raw?.popularity || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [items, searchQuery, activeCategory, filters]);

  const handleCategoryChange = (categoryId /*, subCategory*/ ) => {
    setActiveCategory(categoryId);
    setFilters((f) => ({ ...f, category: categoryId }));
  };

  const handleItemClick = (id) => navigate(`/rent-item/${id}`);
  const handleAddItem = () => navigate("/add-rent-item");

  // for attachments from backend (PDFs, docs, additional images, etc.)
  const extractAttachments = (raw) => {
    const out = [];
    if (Array.isArray(raw?.attachments)) {
      raw.attachments.forEach((a) => {
        if (typeof a === "string") out.push({ label: a.split("/").pop(), url: resolveUrl(a) });
        else if (a?.url || a?.path)
          out.push({ label: a?.name || a?.filename || a?.originalname || (a?.url || a?.path)?.split("/").pop(), url: resolveUrl(a?.url || a?.path) });
      });
    }
    if (Array.isArray(raw?.files)) {
      raw.files.forEach((a) => {
        if (typeof a === "string") out.push({ label: a.split("/").pop(), url: resolveUrl(a) });
        else if (a?.url || a?.path)
          out.push({ label: a?.name || a?.filename || a?.originalname || (a?.url || a?.path)?.split("/").pop(), url: resolveUrl(a?.url || a?.path) });
      });
    }
    return out;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-medium">Back</span>
            </button>

            <CustomLogo onClick={() => navigate("/")} />

            <div className="flex items-center gap-4">
              <button className="text-gray-600 hover:text-gray-800 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <button className="text-gray-600 hover:text-gray-800 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="mt-4">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for rental items, owners and more..."
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-700"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <CategoriesNav activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />

      {/* Main */}
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
          <span>UniTunes</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span>Rental Items</span>
          {activeCategory !== "all" && (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-700 font-medium capitalize">{activeCategory}</span>
            </>
          )}
        </nav>

        {/* Filters */}
        {!loading && !error && (
          <FilterBar onFilterChange={setFilters} activeFilters={filters} />
        )}

        {/* Error */}
        {error && <ErrorMessage message={error} onRetry={fetchRentalItems} />}

        {/* Loading */}
        {loading && !error && (
          <div className="space-y-6">
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
              <p className="ml-4 text-gray-600">Loading rental items...</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <ItemSkeleton key={i} />
              ))}
            </div>
          </div>
        )}

        {/* Results header */}
        {!loading && !error && (
          <div className="flex items-center justify-between mb-6">
            <div className="text-gray-600">
              <span className="text-sm">
                {filteredItems.length} item{filteredItems.length !== 1 ? "s" : ""} found
                {searchQuery && <span> for "{searchQuery}"</span>}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>View:</span>
                <button className="p-1 border border-orange-500 text-orange-500 rounded">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button className="p-1 border border-gray-300 text-gray-500 rounded hover:border-orange-500 hover:text-orange-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Items */}
        {!loading && !error && (
          filteredItems.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredItems.map((it) => {
                const img = pickImageUrl(it.raw);
                const attachments = extractAttachments(it.raw);
                return (
                  <div
                    key={it.id}
                    onClick={() => handleItemClick(it.id)}
                    className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group hover:border-orange-300"
                  >
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={img}
                        alt={it.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = "/api/placeholder/300/300";
                        }}
                      />

                      {/* Availability */}
                      <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${
                        it.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}>
                        {it.available ? "Available" : "Unavailable"}
                      </div>

                      {/* Favorite */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(it.id);
                        }}
                        className={`absolute top-2 right-2 p-1.5 rounded-full bg-white shadow-md transition-colors ${
                          favorites.includes(it.id) ? "text-red-500" : "text-gray-400 hover:text-red-500"
                        }`}
                        aria-label="Toggle favorite"
                      >
                        <svg className="w-4 h-4" fill={favorites.includes(it.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>

                    {/* Body */}
                    <div className="p-3">
                      <h3 className="text-sm font-medium text-gray-800 mb-1 group-hover:text-orange-600 transition-colors overflow-hidden">
                        <span className="line-clamp-2">{it.name}</span>
                      </h3>

                      {/* Category */}
                      <div className="text-xs text-gray-500 mb-2">{it.category}</div>

                      {/* Price */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-orange-500 font-bold text-sm">Rs {it.price.toLocaleString()}</span>
                        </div>
                        <div className="text-xs text-gray-500">per day</div>
                      </div>

                      {/* Owner */}
                      <div className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>{it.ownerName}</span>
                      </div>

                      {/* Attachments from backend (if any) */}
                      {attachments.length > 0 && (
                        <div className="mt-3 pt-2 border-t border-gray-100 space-y-1">
                          <div className="text-xs font-medium text-gray-600">Attachments</div>
                          <div className="flex flex-wrap gap-2">
                            {attachments.slice(0, 3).map((a, idx) => (
                              <a
                                key={idx}
                                href={a.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 01-6 0V5a3 3 0 016 0v7z" />
                                </svg>
                                <span className="truncate max-w-[8rem]" title={a.label}>{a.label}</span>
                              </a>
                            ))}
                            {attachments.length > 3 && (
                              <span className="text-xs text-gray-400">+{attachments.length - 3} more</span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No rental items found</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery
                  ? `We couldn't find any items matching "${searchQuery}". Try different keywords.`
                  : "No rental items are available at the moment. Check back later or add your own items!"}
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                  setFilters({ price: "all", sort: "newest", category: "all", availability: "all" });
                }}
                className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )
        )}
      </div>

      <FloatingActionButton onClick={handleAddItem} />
    </div>
  );
}

export default RentItemsPage;
