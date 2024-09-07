import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BlogsResponse } from '../models/types';

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: (builder) => ({
    getBlogs: builder.query<BlogsResponse, void>({
      query: () => '/blogs',
    }),
    getBlogById: builder.query({
      query: (fileName) => `/blogs/${fileName}`,
    }),
    createBlog: builder.mutation({
      query: (newBlog) => ({
        url: '/blogs',
        method: 'POST',
        body: newBlog,
      }),
    }),
    updateBlog: builder.mutation({
      query: ({ fileName, updatedBlog }) => ({
        url: `/blogs/${fileName}`,
        method: 'PUT',
        body: updatedBlog,
      }),
    }),
    deleteBlog: builder.mutation({
      query: (fileName) => ({
        url: `/blogs/${fileName}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetBlogsQuery, useGetBlogByIdQuery, useCreateBlogMutation, useUpdateBlogMutation, useDeleteBlogMutation } = blogApi;
