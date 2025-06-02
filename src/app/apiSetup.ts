import {
  fetchBaseQuery,
  type BaseQueryApi,
  type FetchArgs,
} from "@reduxjs/toolkit/query/react";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || "http://localhost:5000/api/auth",
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  // Only redirect if there was a token and 401 happened
  if (result.error?.status === 401 && localStorage.getItem("token")) {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return result;
};

export default baseQuery;
