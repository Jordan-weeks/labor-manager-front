import { apiSlice } from "../../app/api/apiSlice";

export const jobsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addJob: builder.mutation({
      query: (initialJobData) => ({
        url: "/jobs",
        method: "POST",
        body: {
          ...initialJobData,
        },
      }),
      //   invalidatesTags: [{ type: Jobs }],
    }),
  }),
});

export const { useAddJobMutation } = jobsApiSlice;
