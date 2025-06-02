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
    getOrders: builder.query({
      query: () => ({
        url: "/get-recent-orders",
        method: "GET",
      }),
    }),
    placeOrder: builder.mutation({
      query: (orderData) => ({
        url: "/place-order",
        method: "POST",
        body: orderData,
      }),
    }),
    cancelOrder: builder.mutation({
      query: (orderId) => ({
        url: `/cancel-order/${orderId}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useGetAddressesQuery,
  useGetOrdersQuery,
  usePlaceOrderMutation,
  useCancelOrderMutation,
} = userProfileApiQueries;
