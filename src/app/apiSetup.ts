import { fetchBaseQuery, type BaseQueryApi, type FetchArgs } from "@reduxjs/toolkit/query/react";

const baseQuery = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL_DEV,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return result;
};

export default baseQuery;
