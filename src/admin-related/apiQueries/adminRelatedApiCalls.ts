import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "@/app/apiSetup";

export const adminRelatedApiQuery = createApi({
  reducerPath: "adminApiQuery",
  baseQuery,
  endpoints: (builder) => ({
    addNewProducts: builder.mutation({
      query: (data) => {
        if (data instanceof FormData) {
          return {
            url: "/add-product",
            method: "POST",
            body: data,
          };
        }
        return {
          url: "/add-product",
          method: "POST",
          body: data,
          headers: { "Content-Type": "application/json" },
        };
      },
    }),

    getAllProducts: builder.query({
      query: () => ({
        url: "/getAllProducts",
        method: "GET",
      }),
    }),

    editProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/edit-product/${id}`,
        method: "PUT",
        body: data,
        headers: { "Content-Type": "application/json" },
      }),
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/delete-product/${id}`,
        method: "DELETE",
      }),
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: "/get-orders",
        method: "GET",
      }),
    }),
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/orders/${orderId}/status`,
        method: "PUT",
        body: { status },
        headers: { "Content-Type": "application/json" },
      }),
    }),
  }),
});

export const {
  useAddNewProductsMutation,
  useGetAllProductsQuery,
  useEditProductMutation,
  useDeleteProductMutation,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} = adminRelatedApiQuery;
