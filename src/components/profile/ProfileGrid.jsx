import React from "react";
import ProfileCard from "./ProfileCard";
const ProfileSkeleton = () => (
  <div className="p-4 bg-white shadow rounded overflow-hidden animate-pulse">
    <div className="flex justify-between items-start">
      <div className="space-y-2">
        <div className="h-6 w-32 bg-gray-200 rounded"></div>
        <div className="h-4 w-48 bg-gray-200 rounded"></div>
      </div>
      <div className="w-16 h-16 rounded-full bg-gray-200"></div>
    </div>
    <div className="mt-4 h-4 w-full bg-gray-200 rounded"></div>
    <div className="mt-4 flex justify-between">
      <div className="h-8 w-24 bg-gray-200 rounded"></div>
    </div>
  </div>
);

const ProfileGrid = ({
  profiles,
  isLoading,
  isAdminMode,
  onDelete,
  onUpdateProfile,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <ProfileSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.id}
          profile={profile}
          isAdminMode={isAdminMode}
          onDelete={onDelete}
          onUpdateProfile={onUpdateProfile}
        />
      ))}
    </div>
  );
};
export default ProfileGrid;
