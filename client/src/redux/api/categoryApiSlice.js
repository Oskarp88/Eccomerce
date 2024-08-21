import { CATEGORY_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCategory: builder.mutation({
            query: (newCategory) => ({
                url: `${CATEGORY_URL}`,
                method: "POST",
                body: newCategory
            }),
        }),
        updateCategory: builder.mutation({
            query: ({categoryId, updateCategory}) => ({
                url: `${CATEGORY_URL}/${categoryId}`,
                method: 'PUT',
                body: updateCategory
            }),
        }),
        deletedCategor: builder.mutation({
            query: (categoryId) => ({
                url: `${CATEGORY_URL}/${categoryId}`,
                method: 'DELETE',
            })
        }),
        fetchCategories: builder.query({
            query: () => `${CATEGORY_URL}/categories`,
        }),
    }),
});

export const {
   useCreateCategoryMutation,
   useDeletedCategorMutation,
   useFetchCategoriesQuery,
   useUpdateCategoryMutation,
} = categoryApiSlice;