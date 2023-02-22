import {
  useGetAssignedJobsQuery,
  useGetIndividualJobQuery,
} from "./jobsApiSlice";
import { selectUserId } from "../auth/authSlice";
import { useSelector } from "react-redux";
import { useNavigate, useParams, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Center,
  Heading,
  Link,
  Stack,
  Button,
  VStack,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { IoSettingsOutline } from "react-icons/io5";

const JobOutlook = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const userId = useSelector(selectUserId);

  const { job } = useGetAssignedJobsQuery(userId, {
    selectFromResult: ({ data }) => ({
      job: data?.find((job) => job.id === jobId),
    }),
  });
  let currentTasks;
  if (job?.tasks.length === 0) {
    currentTasks = <div>No active tasks</div>;
  } else
    currentTasks = job?.tasks.map((task) => (
      <div key={task.name}>{task.name}</div>
    ));

  return (
    <VStack spacing={6}>
      <Box>
        <HStack>
          <Heading>{job?.jobName}</Heading>
          <Icon
            onClick={() => navigate("edit-job")}
            as={IoSettingsOutline}
            boxSize={10}
          />
        </HStack>

        {currentTasks}
      </Box>

      <Button>
        <Link as={RouterLink} to="new-task">
          Add Task
        </Link>
      </Button>
    </VStack>
  );
};
export default JobOutlook;
