import { Filter } from "lucide-react";
import PropTypes from "prop-types";
import React, { useState } from "react";

const ProfileSearch = ({
  filters,
  setFilters,
  availableInterests,
  availableLocations,
  onError,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (e) => {
    try {
      const value = e.target.value;
      if (value.length > 100) {
        throw new Error("Search term too long (max 100 characters)");
      }
      if (/[<>]/.test(value)) {
        throw new Error("Invalid characters in search");
      }
      setFilters((prev) => ({ ...prev, searchTerm: value }));
      onError(null);
    } catch (err) {
      onError(err.message);
    }
  };

  const handleLocationChange = (e) => {
    try {
      const value = e.target.value;
      if (value && !availableLocations.includes(value)) {
        throw new Error("Invalid location selected");
      }
      setFilters((prev) => ({ ...prev, location: value }));
      onError(null);
    } catch (err) {
      onError(err.message);
    }
  };

  const handleInterestToggle = (interest) => {
    try {
      if (!availableInterests.includes(interest)) {
        throw new Error("Invalid interest selected");
      }
      setFilters((prev) => ({
        ...prev,
        interests: prev.interests.includes(interest)
          ? prev.interests.filter((i) => i !== interest)
          : [...prev.interests, interest],
      }));
      onError(null);
    } catch (err) {
      onError(err.message);
    }
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="flex gap-4">
        <input
          type="text"
          value={filters.searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by name or description..."
          className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          maxLength={100}
        />
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-4 py-2 rounded border ${
            showFilters ? "border-blue-500 text-blue-500" : "border-gray-300"
          } hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2`}
        >
          <Filter className="h-4 w-4" />
          Filters{" "}
          {filters.interests.length > 0 || filters.location
            ? `(${
                (filters.interests.length > 0 ? 1 : 0) +
                (filters.location ? 1 : 0)
              })`
            : ""}
        </button>
      </div>

      {showFilters && (
        <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <select
              value={filters.location}
              onChange={handleLocationChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">All Locations</option>
              {availableLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interests
            </label>
            <div className="flex flex-wrap gap-2">
              {availableInterests.map((interest) => (
                <button
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.interests.includes(interest)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  } transition-colors duration-200`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {(filters.interests.length > 0 || filters.location) && (
            <button
              onClick={() =>
                setFilters((prev) => ({ ...prev, interests: [], location: "" }))
              }
              className="text-sm text-red-500 hover:text-red-600"
            >
              Clear filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

ProfileSearch.propTypes = {
  filters: PropTypes.shape({
    searchTerm: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    interests: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
  availableInterests: PropTypes.arrayOf(PropTypes.string).isRequired,
  availableLocations: PropTypes.arrayOf(PropTypes.string).isRequired,
  onError: PropTypes.func.isRequired,
};

export default ProfileSearch;
