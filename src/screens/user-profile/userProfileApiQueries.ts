import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "@/app/apiSetup";

export const userProfileApiQueries = createApi({
  reducerPath: "userProfileApiQueries",
  baseQuery,
  endpoints: (builder) => ({
    getAddresses: builder.query({
      query: () => ({
        url: "/getallAddresses",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAddressesQuery } = userProfileApiQueries;
