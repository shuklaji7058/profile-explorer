import { Loader } from "lucide-react";
import PropTypes from "prop-types";
import React, { useState } from "react";

const AddProfileForm = ({ onAddProfile }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    image: "/images/default.png",
    coordinates: {
      lat: 0,
      lng: 0,
    },
    contact: {
      email: "",
      phone: "",
    },
    interests: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleInterestsChange = (e) => {
    const interests = e.target.value.split(",").map((i) => i.trim());
    setFormData((prev) => ({
      ...prev,
      interests,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const newProfile = {
        ...formData,
        coordinates: {
          lat: parseFloat(formData.coordinates.lat),
          lng: parseFloat(formData.coordinates.lng),
        },
      };
      await onAddProfile(newProfile);

      setFormData({
        name: "",
        description: "",
        address: "",
        image: "/src/assets/images/default.png",
        coordinates: {
          lat: 0,
          lng: 0,
        },
        contact: {
          email: "",
          phone: "",
        },
        interests: [],
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 space-y-4 bg-white p-6 rounded-lg shadow"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          rows={3}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address *
        </label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          required
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Latitude *
          </label>
          <input
            type="number"
            name="coordinates.lat"
            value={formData.coordinates.lat}
            onChange={handleInputChange}
            required
            step="any"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Longitude *
          </label>
          <input
            type="number"
            name="coordinates.lng"
            value={formData.coordinates.lng}
            onChange={handleInputChange}
            required
            step="any"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email *
        </label>
        <input
          type="email"
          name="contact.email"
          value={formData.contact.email}
          onChange={handleInputChange}
          required
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone *
        </label>
        <input
          type="tel"
          name="contact.phone"
          value={formData.contact.phone}
          onChange={handleInputChange}
          required
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Interests (comma-separated) *
        </label>
        <input
          type="text"
          value={formData.interests.join(", ")}
          onChange={handleInterestsChange}
          placeholder="React, JavaScript, Design"
          required
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full px-4 py-2 rounded ${
          isSubmitting
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        } text-white transition-colors duration-200 flex items-center justify-center`}
      >
        {isSubmitting ? (
          <>
            <Loader className="animate-spin -ml-1 mr-3 h-5 w-5" />
            Adding Profile...
          </>
        ) : (
          "Add Profile"
        )}
      </button>
    </form>
  );
};

AddProfileForm.propTypes = {
  onAddProfile: PropTypes.func.isRequired,
};

export default AddProfileForm;
