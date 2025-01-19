import { Plus } from "lucide-react";
import React, { useState } from "react";
import AddProfileForm from "../AddProfileForm";

const AdminControls = ({ onAddProfile }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleToggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <div className="mb-6">
      <button
        onClick={handleToggleForm}
        className="w-full px-4 py-2 rounded bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
      >
        <Plus className="mr-2 h-4 w-4" /> Add New Profile
      </button>
      {isFormOpen && <AddProfileForm onAddProfile={onAddProfile} />}
    </div>
  );
};

export default AdminControls;
