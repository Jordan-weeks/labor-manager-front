import { apiSlice } from "../../app/api/apiSlice";

export const jobsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignedJobs: builder.query({
      query: (userId) => ({
        url: `/jobs/${userId}`,
        method: "GET",
      }),
      providesTags: ["Jobs"],
    }),
    getIndividualJob: builder.query({
      query: (jobId) => ({
        url: `/jobs/${jobId}`,
        method: "GET",
      }),
      providesTags: ["Jobs"],
    }),
    addJob: builder.mutation({
      query: (initialJobData) => ({
        url: "/jobs",
        method: "POST",
        body: {
          ...initialJobData,
        },
      }),
      invalidatesTags: ["Jobs"],
    }),
  }),
});

export const {
  useAddJobMutation,
  useGetAssignedJobsQuery,
  useGetIndividualJobQuery,
} = jobsApiSlice;
