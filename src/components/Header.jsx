import { AlertCircle } from "lucide-react";
import PropTypes from "prop-types";
import React, { useState } from "react";
import ProfileSearch from "./profile/ProfileSearch";

const Header = ({
  isAdminMode,
  setIsAdminMode,
  filters,
  setFilters,
  availableInterests,
  availableLocations,
}) => {
  const [error, setError] = useState(null);

  const handleFilterChange = (newFilters) => {
    try {
      if (newFilters.searchTerm && typeof newFilters.searchTerm !== "string") {
        throw new Error("Search term must be text");
      }

      if (
        newFilters.location &&
        !availableLocations.includes(newFilters.location)
      ) {
        throw new Error("Invalid location selected");
      }

      if (newFilters.interests && Array.isArray(newFilters.interests)) {
        const invalidInterests = newFilters.interests.filter(
          (interest) => !availableInterests.includes(interest)
        );
        if (invalidInterests.length > 0) {
          throw new Error(`Invalid interests: ${invalidInterests.join(", ")}`);
        }
      } else if (newFilters.interests) {
        throw new Error("Interests must be an array");
      }

      setError(null);
      setFilters(newFilters);
    } catch (err) {
      setError(err.message);
      setFilters(filters);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Profile Explorer</h1>
        <button
          onClick={() => setIsAdminMode(!isAdminMode)}
          className={`px-4 py-2 rounded ${
            isAdminMode
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-gray-500 text-white hover:bg-gray-600"
          } transition-colors duration-200`}
        >
          {isAdminMode ? "Exit Admin Mode" : "Admin Mode"}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-600">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <ProfileSearch
        filters={filters}
        setFilters={handleFilterChange}
        availableInterests={availableInterests}
        availableLocations={availableLocations}
        onError={setError}
      />
    </div>
  );
};

Header.propTypes = {
  isAdminMode: PropTypes.bool.isRequired,
  setIsAdminMode: PropTypes.func.isRequired,
  filters: PropTypes.shape({
    searchTerm: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    interests: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
  availableInterests: PropTypes.arrayOf(PropTypes.string).isRequired,
  availableLocations: PropTypes.arrayOf(PropTypes.string).isRequired,
};

class HeaderErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Header Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Something went wrong
          </h2>
          <p className="text-red-500 mb-4">
            There was an error loading the search interface.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

HeaderErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

const HeaderWithErrorHandling = (props) => (
  <HeaderErrorBoundary>
    <Header {...props} />
  </HeaderErrorBoundary>
);

export default HeaderWithErrorHandling;
