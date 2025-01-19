import { useEffect, useState } from "react";
import { initialProfiles } from "../data/mockData";

export const useProfiles = () => {
  const [profiles, setProfiles] = useState(() => {
    const savedProfiles = sessionStorage.getItem("profiles");
    return savedProfiles ? JSON.parse(savedProfiles) : initialProfiles;
  });

  const [filters, setFilters] = useState({
    searchTerm: "",
    location: "",
    interests: [],
  });
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    sessionStorage.setItem("profiles", JSON.stringify(profiles));
  }, [profiles]);

  const availableLocations = [
    ...new Set(
      profiles
        .map((profile) => {
          try {
            if (profile.address && profile.address.includes(",")) {
              const city = profile.address.split(",")[1]?.trim();
              return city || null;
            }
            return null;
          } catch (error) {
            console.error("Error processing address:", error);
            return null;
          }
        })
        .filter(Boolean)
    ),
  ].sort();

  const availableInterests = [
    ...new Set(profiles.flatMap((profile) => profile.interests || [])),
  ].sort();

  const filteredProfiles = profiles.filter((profile) => {
    const searchMatch =
      profile.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      profile.description
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase());

    const locationMatch =
      !filters.location ||
      profile.address.toLowerCase().includes(filters.location.toLowerCase());

    const interestsMatch =
      filters.interests.length === 0 ||
      filters.interests.some((interest) =>
        profile.interests
          .map((i) => i.toLowerCase())
          .includes(interest.toLowerCase())
      );

    return searchMatch && locationMatch && interestsMatch;
  });

  const handleUpdateProfile = (id, updatedProfile) => {
    setProfiles(
      profiles.map((profile) =>
        profile.id === id ? { ...profile, ...updatedProfile } : profile
      )
    );
  };

  const handleDelete = (id) => {
    try {
      setIsLoading(true);
      setProfiles(profiles.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addProfile = async (newProfile) => {
    try {
      setIsLoading(true);
      const profileWithId = {
        ...newProfile,
        id: Math.max(...profiles.map((p) => p.id), 0) + 1,
      };
      setProfiles([...profiles, profileWithId]);
      return profileWithId;
    } catch (error) {
      console.error("Error adding profile:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetProfiles = () => {
    setProfiles(initialProfiles);
    sessionStorage.removeItem("profiles");
  };

  return {
    profiles: filteredProfiles,
    isAdminMode,
    isLoading,
    filters,
    setFilters,
    availableInterests,
    availableLocations,
    setIsAdminMode,
    handleDelete,
    addProfile,
    handleUpdateProfile,
    resetProfiles,
  };
};
