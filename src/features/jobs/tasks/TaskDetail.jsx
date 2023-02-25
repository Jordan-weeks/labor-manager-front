import { selectCurrentTask } from "./taskSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetAssignedJobsQuery } from "../jobsApiSlice";
import { selectUserId } from "../../auth/authSlice";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Heading,
  HStack,
  Text,
  Stack,
  ButtonGroup,
} from "@chakra-ui/react";
import { useDeleteTaskMutation } from "./tasksApiSlice";
import { useEffect } from "react";

const TaskDetail = () => {
  const navigate = useNavigate();
  const taskId = useSelector(selectCurrentTask);
  const userId = useSelector(selectUserId);

  const [deleteTask, { isSuccess, isError, error }] = useDeleteTaskMutation();

  const { jobId } = useParams();

  const { job } = useGetAssignedJobsQuery(userId, {
    selectFromResult: ({ data }) => ({
      job: data?.find((job) => job.id === jobId),
    }),
  });

  const task = job.tasks.find((task) => task._id === taskId);
  console.log(task);

  useEffect(() => {
    if (isSuccess) {
      navigate(`/jobs/${jobId}`);
    }
  }, [isSuccess, navigate]);

  const onDeleteClicked = async () => {
    deleteTask({ jobId, taskId });
  };

  return (
    <Stack ml={4}>
      <Heading>{task.taskName}</Heading>

      <Text fontSize="xl">{task.description}</Text>
      {task.estimatedHours ? (
        <Text fontSize="xl">Estimated hours: {task.estimatedHours}</Text>
      ) : null}
      <Text fontSize="xl">Current Status: {task.status}</Text>
      <ButtonGroup>
        <Button variant="outline">Add Comment</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" onClick={onDeleteClicked}>
          Delete Task
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
export default TaskDetail;
