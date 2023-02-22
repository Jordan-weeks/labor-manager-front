import {
  Container,
  Heading,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  ButtonGroup,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserId } from "../../auth/authSlice";
import { useGetAssignedJobsQuery } from "../jobsApiSlice";
import { useAddTaskMutation } from "../jobsApiSlice";

const NewTask = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const userId = useSelector(selectUserId);

  const { job } = useGetAssignedJobsQuery(userId, {
    selectFromResult: ({ data }) => ({
      job: data?.find((job) => job.id === jobId),
    }),
  });

  const [addTask, { isSuccess, isLoading, isError }] = useAddTaskMutation();

  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState(undefined);

  const onTaskNameChange = (e) => setTaskName(e.target.value);
  const onDescriptionChange = (e) => setDescription(e.target.value);
  const onHoursChange = (e) => setHours(e.target.value);

  const onCreateTaskClicked = async () => {
    await addTask({ jobId, taskName, description, hours });
    console.log("Task Created");
  };
  useEffect(() => {
    if (isSuccess) {
      navigate(-1);
    }
  }, [isSuccess, navigate]);

  return (
    <Container>
      <Container centerContent>
        <Heading as="h3" size="lg">
          Create Task
        </Heading>
      </Container>
      <FormControl isRequired>
        <FormLabel fontSize="2xl">Task Name</FormLabel>
        <Input
          type="text"
          isRequired
          value={taskName}
          onChange={onTaskNameChange}
          size="lg"
        />
      </FormControl>

      <FormControl>
        <FormLabel fontSize="2xl">Description:</FormLabel>

        <Textarea
          size="lg"
          value={description}
          onChange={onDescriptionChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel fontSize="2xl">Hours:</FormLabel>

        <Input
          type="number"
          size="lg"
          placeholder="Man-Hours"
          value={hours}
          onChange={onHoursChange}
        />
      </FormControl>

      <ButtonGroup>
        <Button onClick={onCreateTaskClicked} width="full">
          Add Task
        </Button>
      </ButtonGroup>
    </Container>
  );
};
export default NewTask;
