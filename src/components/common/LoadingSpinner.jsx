import { Loader } from "lucide-react";
import React from "react";

const LoadingSpinner = ({ size = "default", className = "" }) => {
  const sizeClasses = {
    small: "h-4 w-4",
    default: "h-8 w-8",
    large: "h-12 w-12",
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <Loader className={`${sizeClasses[size]} animate-spin text-blue-500`} />
    </div>
  );
};

export default LoadingSpinner;
