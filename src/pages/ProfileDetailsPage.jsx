import { ArrowLeft } from "lucide-react";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LeafletMapComponent from "../components/common/LeafletMapComponents";
import LoadingSpinner from "../components/common/LoadingSpinner";

const ProfileDetailsPage = ({ profiles }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isMapLoading, setIsMapLoading] = useState(true);

  const profile = profiles.find((p) => p.id === parseInt(id));

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Profile not found</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleMapLoad = () => {
    setIsMapLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 bg-white shadow-md p-4 flex justify-between items-center z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-semibold">{profile.name}</h1>
        </div>
      </div>

      <div className="container mx-auto p-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:sticky lg:top-24 h-[calc(100vh-6rem)]">
            <div className="bg-white p-6 rounded-lg shadow-md h-full">
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <div className="relative h-[calc(100%-2rem)] rounded-lg overflow-hidden">
                {isMapLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <LoadingSpinner />
                  </div>
                )}
                <LeafletMapComponent
                  coordinates={profile.coordinates}
                  address={profile.address}
                  onLoad={handleMapLoad}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start gap-6">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold mb-2">{profile.name}</h2>
                  <p className="text-gray-600">{profile.description}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">
                Contact Information
              </h2>
              <div className="space-y-3">
                <p className="flex items-center">
                  <span className="font-medium w-20">Email:</span>
                  <span className="text-gray-600">{profile.contact.email}</span>
                </p>
                <p className="flex items-center">
                  <span className="font-medium w-20">Phone:</span>
                  <span className="text-gray-600">{profile.contact.phone}</span>
                </p>
                <p className="flex items-center">
                  <span className="font-medium w-20">Address:</span>
                  <span className="text-gray-600">{profile.address}</span>
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Interests</h2>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileDetailsPage.propTypes = {
  profiles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      coordinates: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
      }).isRequired,
      contact: PropTypes.shape({
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
      }).isRequired,
      interests: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
};

export default ProfileDetailsPage;
