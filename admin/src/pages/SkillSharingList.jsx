import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const backendUrl = import.meta.env.VITE_BACKEND_URL ;

const SkillSharingList = () => {
  const [skills, setSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    experience: '',
    activeOnly: true
  });

  const skillCategories = [
    'Programming', 'Design', 'Music', 'Sports', 
    'Cooking', 'Language', 'Academic', 'Art', 
    'Photography', 'Other'
  ];
  const experienceLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const fetchSkills = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Start with basic list endpoint
      const response = await axios.get(`${backendUrl}/api/skillshare/list`);
      
      console.log('API Response:', response.data); // Debug log
      
      if (response.data.success) {
        let skillsData = response.data.data || response.data.skills || [];
        
        console.log('Skills data:', skillsData); // Debug log
        
        // Apply filters
        if (filters.activeOnly) {
          skillsData = skillsData.filter(skill => skill.isActive !== false);
        }
        if (filters.category) {
          skillsData = skillsData.filter(skill => skill.skillType === filters.category);
        }
        if (filters.experience) {
          skillsData = skillsData.filter(skill => skill.experience === filters.experience);
        }

        setSkills(skillsData);
        setFilteredSkills(skillsData);
      } else {
        setError(response.data.message || 'Failed to fetch skills');
        toast.error(response.data.message || 'Failed to fetch skills');
      }
    } catch (error) {
      console.error('Full error object:', error);
      console.error('Error fetching skills:', error.message);
      
      const errorMessage = error.response?.data?.message || error.message || 'Network error';
      setError(errorMessage);
      toast.error(`Failed to fetch skills: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      experience: '',
      activeOnly: true
    });
  };

  const getExperienceBadgeColor = (experience) => {
    switch (experience) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-blue-100 text-blue-800';
      case 'Advanced': return 'bg-orange-100 text-orange-800';
      case 'Expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatPrice = (price) => {
    return price === 0 ? 'Free' : `LKR ${price.toLocaleString()}`;
  };

  useEffect(() => {
    fetchSkills();
  }, [filters]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading skills...</div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Skill Sharing Marketplace</h2>
        <div className="text-sm text-gray-600">
          {filteredSkills.length} skill{filteredSkills.length !== 1 ? 's' : ''} available
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold mb-3">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            >
              <option value="">All Categories</option>
              {skillCategories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Experience Filter */}
          <div>
            <label className="block text-sm font-medium mb-1">Experience</label>
            <select
              value={filters.experience}
              onChange={(e) => handleFilterChange('experience', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            >
              <option value="">All Levels</option>
              {experienceLevels.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          {/* Active Only Toggle */}
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <div className="flex items-center h-10">
              <input
                type="checkbox"
                id="activeOnly"
                checked={filters.activeOnly}
                onChange={(e) => handleFilterChange('activeOnly', e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="activeOnly" className="text-sm">Active only</label>
            </div>
          </div>

          {/* Clear Filters */}
          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          <p><strong>Error:</strong> {error}</p>
          <button 
            onClick={fetchSkills}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )}

      {/* Skills Grid */}
      {!error && filteredSkills.length === 0 && !loading ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No skills found matching your criteria.</p>
        </div>
      ) : !error ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <div key={skill._id || index} className="border rounded-lg shadow-md bg-white overflow-hidden hover:shadow-lg transition-shadow">
              
              {/* Image Display */}
              <div className="relative h-48 bg-gray-200">
                {skill.images && skill.images.length > 0 ? (
                  <div className="h-full">
                    <img 
                      src={`${backendUrl}/${skill.images[0]}`} 
                      alt={skill.skillType}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/placeholder-image.jpg';
                        e.target.onerror = null;
                      }}
                    />
                    {skill.images.length > 1 && (
                      <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                        +{skill.images.length - 1} more
                      </div>
                    )}
                  </div>
                ) : skill.image ? (
                  <img 
                    src={`${backendUrl}/${skill.image}`} 
                    alt={skill.skillType || skill.skill}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
                
                {/* Status Badge */}
                {!skill.isActive && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                    Inactive
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg text-gray-800">{skill.skillType || skill.skill}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getExperienceBadgeColor(skill.experience)}`}>
                    {skill.experience || 'Beginner'}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Instructor:</strong> {skill.studentName}</p>
                  <p><strong>Contact:</strong> {skill.contact}</p>
                  
                  {skill.location && (
                    <p><strong>Location:</strong> {skill.location}</p>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <p><strong>Price:</strong> 
                      <span className={`ml-1 font-semibold ${(skill.price || 0) === 0 ? 'text-green-600' : 'text-blue-600'}`}>
                        {formatPrice(skill.price || 0)}
                      </span>
                    </p>
                    {skill.createdAt && (
                      <p className="text-xs text-gray-400">
                        {new Date(skill.createdAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-sm text-gray-700">
                    <strong>Details:</strong> {skill.moreDetails || skill.description}
                  </p>
                </div>

                {/* Additional Images Thumbnails */}
                {skill.images && skill.images.length > 1 && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500 mb-2">Additional Images:</p>
                    <div className="flex gap-2">
                      {skill.images.slice(1, 4).map((image, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={`${backendUrl}/${image}`}
                          alt={`${skill.skillType} ${imgIndex + 2}`}
                          className="w-12 h-12 object-cover rounded border"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <div className="mt-4">
                  <button 
                    className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                    onClick={() => {
                      toast.info(`Contact ${skill.studentName} at ${skill.contact}`);
                    }}
                  >
                    Contact Instructor
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SkillSharingList;