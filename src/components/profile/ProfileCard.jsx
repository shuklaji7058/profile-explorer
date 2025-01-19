import {
  ChevronDown,
  ChevronUp,
  Edit,
  Mail,
  MapPin,
  Phone,
  Save,
  Trash,
  X,
} from "lucide-react";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProfileCard = ({ profile, isAdminMode, onDelete, onUpdateProfile }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    try {
      onUpdateProfile(profile.id, editedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setIsExpanded(true);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [name]: value,
      },
    }));
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200">
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  name="name"
                  value={editedProfile.name}
                  onChange={handleInputChange}
                  className="text-xl font-semibold w-full p-1 border rounded"
                />
                <textarea
                  name="description"
                  value={editedProfile.description}
                  onChange={handleInputChange}
                  className="text-sm text-gray-500 w-full p-1 border rounded"
                  rows={2}
                />
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold">{profile.name}</h2>
                <p className="text-sm text-gray-500">{profile.description}</p>
              </>
            )}
          </div>
          <img
            src={profile.image}
            alt={profile.name}
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>

        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-gray-500" />
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={editedProfile.address}
              onChange={handleInputChange}
              className="text-sm w-full p-1 border rounded"
            />
          ) : (
            <p className="text-sm">{profile.address}</p>
          )}
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-blue-500 hover:text-blue-600"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4" /> Less Details
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" /> More Details
              </>
            )}
          </button>

          <div className="flex gap-2">
            {!isEditing && (
              <Link
                to={`/profile/${profile.id}`}
                className="px-4 py-2 rounded border border-gray-500 text-gray-500 hover:bg-gray-100 transition-colors duration-200"
              >
                Summary
              </Link>
            )}

            {isAdminMode && (
              <>
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="px-3 py-1 rounded bg-green-500 text-white flex items-center gap-2 hover:bg-green-600 transition-colors duration-200"
                    >
                      <Save className="h-4 w-4" />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-3 py-1 rounded bg-gray-500 text-white flex items-center gap-2 hover:bg-gray-600 transition-colors duration-200"
                    >
                      <X className="h-4 w-4" />
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleEdit}
                      className="px-2 py-1 rounded bg-gray-500 text-white flex items-center justify-center hover:bg-gray-600 transition-colors duration-200"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      className="px-2 py-1 rounded bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                      onClick={() => onDelete(profile.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-100">
          <div className="p-4 bg-gray-50">
            <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-gray-500" />
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={editedProfile.contact.email}
                    onChange={handleContactChange}
                    className="w-full p-1 border rounded"
                  />
                ) : (
                  <span className="text-gray-600">{profile.contact.email}</span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-gray-500" />
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={editedProfile.contact.phone}
                    onChange={handleContactChange}
                    className="w-full p-1 border rounded"
                  />
                ) : (
                  <span className="text-gray-600">{profile.contact.phone}</span>
                )}
              </div>
            </div>
          </div>

          <div className="p-4">
            <h3 className="text-lg font-semibold mb-3">Interests</h3>
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
      )}
    </div>
  );
};

ProfileCard.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    contact: PropTypes.shape({
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    }).isRequired,
    interests: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  isAdminMode: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdateProfile: PropTypes.func.isRequired,
};

export default ProfileCard;
