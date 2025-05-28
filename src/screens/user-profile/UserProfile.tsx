import React, { useState } from "react";

import { useGetUserProfileQueryQuery } from "@/app/commonApiQuery";

const UserProfile: React.FC = () => {
  const {
    data: userProfile,
    error,
    isLoading,
  } = useGetUserProfileQueryQuery({});
  console.log(userProfile);
  return (
    <>
      This is
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => console.log(userProfile)}
      >
        Click to log user profile
      </button>
    </>
  );
};

export default UserProfile;
