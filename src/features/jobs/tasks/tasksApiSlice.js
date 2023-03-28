import { apiSlice } from '../../../app/api/apiSlice'

export const tasksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addTask: builder.mutation({
      query: (initialTaskData) => ({
        url: '/tasks/add-task',
        method: 'PATCH',
        body: {
          ...initialTaskData,
        },
      }),
      invalidatesTags: ['Jobs'],
    }),
    updateTask: builder.mutation({
      query: (taskData) => ({
        url: '/tasks',
        method: 'PATCH',
        body: {
          ...taskData,
        },
      }),
      invalidatesTags: ['Jobs'],
    }),
    deleteTask: builder.mutation({
      query: (taskData) => ({
        url: 'tasks',
        method: 'DELETE',
        body: {
          ...taskData,
        },
      }),
      invalidatesTags: ['Jobs'],
    }),
    addComment: builder.mutation({
      query: (commentData) => ({
        url: '/tasks/add-comment',
        method: 'PATCH',
        body: {
          ...commentData,
        },
      }),
      invalidatesTags: ['Jobs'],
    }),
    editComment: builder.mutation({
      query: (commentData) => ({
        url: '/tasks/edit-comment',
        method: 'PATCH',
        body: {
          ...commentData,
        },
      }),
      invalidatesTags: ['Jobs'],
    }),
    deleteComment: builder.mutation({
      query: (commentData) => ({
        url: '/tasks/delete-comment',
        method: 'DELETE',
        body: {
          ...commentData,
        },
      }),
      invalidatesTags: ['Jobs'],
    }),
  }),
})

export const {
  useUpdateTaskMutation,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useAddCommentMutation,
  useEditCommentMutation,
  useDeleteCommentMutation,
} = tasksApiSlice
