import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "@/app/apiSetup";

export const adminRelatedApiQuery = createApi({
  reducerPath: "adminApiQuery",
  baseQuery,
  endpoints: (builder) => ({
    addNewProducts: builder.mutation({
      query: (data) => ({
        url: "/add-product",
        method: "POST",
        body: data,
      }),
    }),
    getAllProducts: builder.query({
      query: () => ({
        url: "/getAllProducts",
        method: "GET",
      }),
    }),
  }),
});

export const { useAddNewProductsMutation, useGetAllProductsQuery } =
  adminRelatedApiQuery;
