import { apiSlice } from '../../app/api/apiSlice'

export const jobsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignedJobs: builder.query({
      query: (userId) => ({
        url: `/jobs/${userId}`,
        method: 'GET',
      }),
      transformResponse: (responseData) => {
        const loadedJobs = responseData.map((job) => {
          job.id = job._id
          return job
        })
        return loadedJobs
      },
      providesTags: ['Jobs'],
    }),

    getUsernames: builder.query({
      query: (jobId) => ({
        url: `/jobs/usernames/${jobId}`,
        method: 'GET',
      }),
      providesTags: ['UsersOnJob'],
    }),

    getJob: builder.query({
      query: (jobId) => ({
        url: `/jobs/get-job/${jobId}`,
        method: 'GET',
      }),
      providesTags: ['Job'],
    }),

    addJob: builder.mutation({
      query: (initialJobData) => ({
        url: '/jobs',
        method: 'POST',
        body: {
          ...initialJobData,
        },
      }),
      invalidatesTags: ['Jobs'],
    }),

    deleteJob: builder.mutation({
      query: (jobId) => ({
        url: '/jobs/delete-job',
        method: 'DELETE',
        body: {
          jobId,
        },
      }),
      invalidatesTags: ['Jobs'],
    }),
    updateJob: builder.mutation({
      query: (updatedJobData) => ({
        url: '/jobs/update-job',
        method: 'PATCH',
        body: {
          ...updatedJobData,
        },
      }),
      invalidatesTags: ['Jobs'],
    }),
    sendInvite: builder.mutation({
      query: (inviteData) => ({
        url: '/jobs/invite',
        method: 'POST',
        body: {
          ...inviteData,
        },
      }),
      invalidatesTags: ['Jobs'],
    }),
    joinJob: builder.mutation({
      query: (inviteData) => ({
        url: '/jobs/join',
        method: 'PATCH',
        body: {
          ...inviteData,
        },
      }),
      invalidatesTags: ['Jobs'],
    }),
  }),
})

export const {
  useGetJobQuery,
  useJoinJobMutation,
  useSendInviteMutation,
  useGetUsernamesQuery,
  useAddJobMutation,
  useGetAssignedJobsQuery,
  useDeleteJobMutation,
  useUpdateJobMutation,
} = jobsApiSlice
