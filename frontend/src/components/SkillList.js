import React, { useEffect, useState, useCallback, useRef } from "react";
import { toast } from "react-toastify";

const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

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

const FilterBar = ({ filters, onFilterChange, skillCount }) => {
  const categories = [
    "Programming", "Design", "Music", "Sports",
    "Cooking", "Language", "Academic", "Art",
    "Photography", "Other"
  ];
  const experienceLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
      <div className="flex flex-wrap gap-4 items-center">
        {/* Category Filter */}
        <select
          value={filters.category}
          onChange={(e) => onFilterChange("category", e.target.value)}
          className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-100 focus:border-yellow-300 transition-all"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Experience Filter */}
        <select
          value={filters.experience}
          onChange={(e) => onFilterChange("experience", e.target.value)}
          className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-100 focus:border-yellow-300 transition-all"
        >
          <option value="">All Levels</option>
          {experienceLevels.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>

        {/* Active Only Toggle */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.activeOnly}
            onChange={(e) => onFilterChange("activeOnly", e.target.checked)}
            className="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 rounded focus:ring-yellow-400 focus:ring-2"
          />
          <span className="text-gray-700 font-medium">Active Only</span>
        </label>

        {/* Clear Filters */}
        <button
          onClick={() => onFilterChange("clear")}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-yellow-100 hover:text-yellow-700 transition-all duration-200 font-medium"
        >
          Clear Filters
        </button>

        {/* Results Count */}
        <div className="ml-auto flex items-center gap-2 text-sm text-gray-600">
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full font-medium">
            {skillCount} skills found
          </span>
        </div>
      </div>

      {/* Active Filters Display */}
      {(filters.category || filters.experience || !filters.activeOnly) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {filters.category && (
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm flex items-center gap-2">
              Category: {filters.category}
              <button
                onClick={() => onFilterChange("category", "")}
                className="text-yellow-600 hover:text-yellow-800"
              >
                ×
              </button>
            </span>
          )}
          {filters.experience && (
            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm flex items-center gap-2">
              Level: {filters.experience}
              <button
                onClick={() => onFilterChange("experience", "")}
                className="text-orange-600 hover:text-orange-800"
              >
                ×
              </button>
            </span>
          )}
          {!filters.activeOnly && (
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm flex items-center gap-2">
              Including Inactive
              <button
                onClick={() => onFilterChange("activeOnly", true)}
                className="text-red-600 hover:text-red-800"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

const SkillCard = ({ skill, onRemove, token }) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async () => {
    if (!token) return;
    
    setIsRemoving(true);
    try {
      const response = await fetch(`${backendUrl}/api/skill/remove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        },
        body: JSON.stringify({ id: skill._id })
      });
      
      const data = await response.json();
      if (data.success) {
        toast.success(data.message || "Skill removed successfully");
        onRemove(skill._id);
      } else {
        toast.error(data.message || "Failed to remove skill");
      }
    } catch (error) {
      console.error("Remove skill error:", error);
      toast.error("Network error occurred");
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1">
      {/* Image Section */}
      <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
        {skill.images && skill.images.length > 0 ? (
          <img
            src={`${backendUrl}/${skill.images[0]}`}
            alt={skill.skillType}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            onError={(e) => { 
              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50' y='50' font-family='Arial, sans-serif' font-size='12' fill='%239ca3af' text-anchor='middle' dominant-baseline='middle'%3ENo Image%3C/text%3E%3C/svg%3E";
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 4h16v12H4V4zm2 2v8h12V6H6zm2 2h8v4H8V8z"/>
            </svg>
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          {skill.isActive !== false ? (
            <span className="px-2 py-1 bg-green-500 text-white rounded-full text-xs font-medium">
              Active
            </span>
          ) : (
            <span className="px-2 py-1 bg-red-500 text-white rounded-full text-xs font-medium">
              Inactive
            </span>
          )}
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-medium">
            {skill.category || skill.skillType}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {skill.skillType}
        </h3>
        
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          <p className="text-sm text-gray-600 font-medium">
            {skill.studentName || "Anonymous"}
          </p>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <p className="text-sm text-orange-600 font-medium">
            {skill.experience || "Beginner"}
          </p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold">
            {skill.price === 0 ? (
              <span className="text-green-600">Free</span>
            ) : (
              <span className="text-yellow-600">
                LKR {skill.price?.toLocaleString() || '0'}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            Verified
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button className="flex-1 py-2 px-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-xl font-medium hover:from-yellow-500 hover:to-orange-500 transition-all duration-200 transform hover:scale-105">
            View Details
          </button>
          
          {token && (
            <button
              onClick={handleRemove}
              disabled={isRemoving}
              className="px-4 py-2 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRemoving ? (
                <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              ) : (
                "Remove"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const LoadingSpinner = () => (
  <div className="min-h-screen flex justify-center items-center">
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-yellow-400"></div>
      <p className="mt-4 text-gray-600 font-medium">Loading skills...</p>
    </div>
  </div>
);

const StatsSection = ({ skills, filteredCount }) => {
  const activeSkills = skills.filter(skill => skill.isActive !== false).length;
  const freeSkills = skills.filter(skill => skill.price === 0).length;
  const paidSkills = skills.length - freeSkills;
  
  const categories = [...new Set(skills.map(skill => skill.skillType))].length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl p-4 text-white">
        <div className="text-2xl font-bold">{filteredCount}</div>
        <div className="text-yellow-100 text-sm">Total Skills</div>
      </div>
      <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl p-4 text-white">
        <div className="text-2xl font-bold">{activeSkills}</div>
        <div className="text-orange-100 text-sm">Active</div>
      </div>
      <div className="bg-gradient-to-br from-red-400 to-red-500 rounded-2xl p-4 text-white">
        <div className="text-2xl font-bold">{categories}</div>
        <div className="text-red-100 text-sm">Categories</div>
      </div>
      <div className="bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl p-4 text-white">
        <div className="text-2xl font-bold">{freeSkills}</div>
        <div className="text-amber-100 text-sm">Free Skills</div>
      </div>
    </div>
  );
};

const SkillList = ({ token }) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    experience: "",
    activeOnly: true
  });
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  // WebSocket connection for real-time updates
  const connectWebSocket = useCallback(() => {
    try {
      const wsUrl = `ws${backendUrl.includes('https') ? 's' : ''}://${backendUrl.replace(/^https?:\/\//, '')}/ws/skills`;
      wsRef.current = new WebSocket(wsUrl);

      wsRef.current.onopen = () => {
        console.log('WebSocket connected for real-time skill updates');
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
          reconnectTimeoutRef.current = null;
        }
      };

      wsRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'skill_update') {
            setSkills(prevSkills => {
              const updatedSkills = [...prevSkills];
              const index = updatedSkills.findIndex(skill => skill._id === data.skill._id);
              
              if (index !== -1) {
                updatedSkills[index] = data.skill;
              } else if (data.action === 'created') {
                updatedSkills.push(data.skill);
              }
              
              return updatedSkills;
            });
            setLastUpdated(new Date());
            toast.info('Skills updated in real-time!', { autoClose: 2000 });
          } else if (data.type === 'skill_removed') {
            setSkills(prevSkills => prevSkills.filter(skill => skill._id !== data.skillId));
            setLastUpdated(new Date());
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      wsRef.current.onclose = () => {
        console.log('WebSocket disconnected, attempting reconnect...');
        reconnectTimeoutRef.current = setTimeout(connectWebSocket, 3000);
      };

      wsRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } catch (error) {
      console.error('WebSocket connection failed:', error);
      reconnectTimeoutRef.current = setTimeout(connectWebSocket, 5000);
    }
  }, [backendUrl]);

  // Fetch skills from API
  const fetchSkills = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendUrl}/api/skillshare/list`);
      const data = await response.json();
      
      if (data.success) {
        const skillsData = data.data || data.skills || [];
        setSkills(skillsData);
        setLastUpdated(new Date());
      } else {
        toast.error(data.message || "Failed to fetch skills");
      }
    } catch (error) {
      console.error("Fetch skills error:", error);
      toast.error("Network error occurred");
    } finally {
      setLoading(false);
    }
  }, [backendUrl]);

  // Initialize data and WebSocket
  useEffect(() => {
    fetchSkills();
    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [fetchSkills, connectWebSocket]);

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    if (key === "clear") {
      setFilters({ category: "", experience: "", activeOnly: true });
    } else {
      setFilters(prev => ({ ...prev, [key]: value }));
    }
  };

  // Handle skill removal
  const handleSkillRemove = (skillId) => {
    setSkills(prev => prev.filter(skill => skill._id !== skillId));
  };

  // Filter skills based on search and filters
  const filteredSkills = skills.filter(skill => {
    const matchesSearch = !searchQuery || 
      (skill.skillType && skill.skillType.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (skill.studentName && skill.studentName.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = !filters.category || skill.skillType === filters.category;
    const matchesExperience = !filters.experience || skill.experience === filters.experience;
    const matchesActive = !filters.activeOnly || skill.isActive !== false;

    return matchesSearch && matchesCategory && matchesExperience && matchesActive;
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-orange-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-red-200 rounded-full opacity-15 animate-pulse"></div>
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-white shadow-md rounded-xl hover:bg-yellow-50 hover:shadow-lg transition-all duration-200 font-medium text-gray-700"
          >
            ← Back
          </button>
          <CustomLogo onClick={() => window.location.href = "/"} />
          <div className="text-sm text-gray-500">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search skills by name or instructor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pl-12 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-100 focus:border-yellow-300 shadow-md text-lg"
            />
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-7xl mx-auto">
          <StatsSection skills={skills} filteredCount={filteredSkills.length} />
        </div>

        {/* Filter Bar */}
        <div className="max-w-7xl mx-auto">
          <FilterBar 
            filters={filters} 
            onFilterChange={handleFilterChange}
            skillCount={filteredSkills.length}
          />
        </div>

        {/* Skills Grid */}
        <div className="max-w-7xl mx-auto">
          {filteredSkills.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSkills.map(skill => (
                <SkillCard
                  key={skill._id}
                  skill={skill}
                  onRemove={handleSkillRemove}
                  token={token}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.463-.64-6.314-1.76M6 15l3-3m0 0l-3-3m3 3h12" />
              </svg>
              <h3 className="text-xl font-medium text-gray-500 mb-2">No skills found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setFilters({ category: "", experience: "", activeOnly: true });
                }}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-xl font-medium hover:from-yellow-500 hover:to-orange-500 transition-all"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* Real-time Status Indicator */}
        <div className="fixed bottom-6 right-6">
          <div className="flex items-center gap-2 bg-white shadow-lg rounded-full px-4 py-2">
            <div className={`w-3 h-3 rounded-full ${wsRef.current?.readyState === WebSocket.OPEN ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
            <span className="text-sm font-medium text-gray-600">
              {wsRef.current?.readyState === WebSocket.OPEN ? 'Live' : 'Offline'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillList;