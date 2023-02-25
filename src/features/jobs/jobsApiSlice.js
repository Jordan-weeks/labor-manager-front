import { apiSlice } from "../../app/api/apiSlice";

export const jobsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignedJobs: builder.query({
      query: (userId) => ({
        url: `/jobs/${userId}`,
        method: "GET",
      }),
      transformResponse: (responseData) => {
        const loadedJobs = responseData.map((job) => {
          job.id = job._id;
          return job;
        });
        return loadedJobs;
      },
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

    deleteJob: builder.mutation({
      query: (jobId) => ({
        url: "/jobs/delete-job",
        method: "DELETE",
        body: {
          jobId,
        },
      }),
      invalidatesTags: ["Jobs"],
    }),
    updateJob: builder.mutation({
      query: (updatedJobData) => ({
        url: "/jobs/update-job",
        method: "PATCH",
        body: {
          ...updatedJobData,
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
  useDeleteJobMutation,
  useUpdateJobMutation,
} = jobsApiSlice;
