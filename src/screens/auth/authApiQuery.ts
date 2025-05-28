import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "@/app/apiSetup";

export const authApiQuery = createApi({
  reducerPath: "authApiQuery",
  baseQuery,
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
} = authApiQuery;
