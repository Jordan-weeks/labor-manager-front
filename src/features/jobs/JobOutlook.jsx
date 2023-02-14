import { useGetIndividualJobQuery } from "./jobsApiSlice";
import { selectUserId } from "../auth/authSlice";
import { useSelector } from "react-redux";

const JobOutlook = () => {
  const userId = useSelector(selectUserId);

  const { data: jobData, isLoading } = useGetIndividualJobQuery(userId);

  if (isLoading) if (isLoading) return <div>Loading...</div>;

  return <div>{jobData.jobName}</div>;
};
export default JobOutlook;
