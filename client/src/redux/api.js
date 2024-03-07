// rtkFolder/signinApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const signinApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
  }),
  endpoints: (builder) => ({
    getposts: builder.query({
      query: () => "product/allproduct",
    }),
    GetProductById: builder.query({
      query: (id) => `product/${id}`,
    }),
    getcategory: builder.query({
      query: () => "product/getcategory",
    }),
    getProductsByCategory: builder.query({
      query: (category) => `product/category/${category}`,
    }),
    addToCart: builder.mutation({
      query: ({ productId, quantity }) => ({
        url: "addCart/cart",
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: { productId, quantity },
      }),
    }),
  }),
});

export const {
  useGetpostsQuery,
  useGetcategoryQuery,
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery,
  useAddToCartMutation,
} = signinApi;
