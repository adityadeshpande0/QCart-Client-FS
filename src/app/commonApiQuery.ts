import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "@/app/apiSetup";

export const commonApiQuery = createApi({
  reducerPath: "commonApiQuery",
  baseQuery,
  endpoints: (builder) => ({
    getUserProfileQuery: builder.query({
      query: () => ({
        url: "/user-profile",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserProfileQueryQuery } = commonApiQuery;
