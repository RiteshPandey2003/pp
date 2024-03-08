// rtkFolder/signinApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const signinApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
  }),
  endpoints: (builder) => ({
    getposts: builder.query({
      query: () => "product/getproduct",
    }),
    getcategory: builder.query({
      query: () => "product/getcategory",
    }),
  }),
});

export const {
  useGetpostsQuery,
  useGetcategoryQuery,
} = signinApi;