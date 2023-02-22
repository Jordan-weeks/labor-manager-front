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

    addTaskToJob: builder.mutation({
      query: (TaskData) => ({
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
