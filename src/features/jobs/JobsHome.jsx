import { Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserId } from "../auth/authSlice";
import { useGetAssignedJobsQuery } from "./jobsApiSlice";

const JobsHome = () => {
  const userId = useSelector(selectUserId);
  const { data: jobData, isLoading } = useGetAssignedJobsQuery(userId);
  if (isLoading) return <div>Loading...</div>;

  console.log(jobData);

  return (
    <>
      <Text fontSize={30} mx={3}>
        JobsHome
      </Text>
      {jobData.map((job) => (
        <Link
          fontSize={20}
          m={3}
          key={job._id}
          as={RouterLink}
          to={`${job._id}`}
        >
          {job.jobName}
        </Link>
      ))}
      <Link as={RouterLink} to="new-job">
        Create new job
      </Link>
    </>
  );
};
export default JobsHome;
