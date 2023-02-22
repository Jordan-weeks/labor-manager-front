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
  EditableInput,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useAddJobMutation } from "./jobsApiSlice";
import { useSelector } from "react-redux";
import { selectUserId } from "../auth/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAssignedJobsQuery,
  useDeleteJobMutation,
  useUpdateJobMutation,
} from "./jobsApiSlice";

const EditJob = () => {
  const { jobId } = useParams();
  const userId = useSelector(selectUserId);

  const { job } = useGetAssignedJobsQuery(userId, {
    selectFromResult: ({ data }) => ({
      job: data?.find((job) => job.id === jobId),
    }),
  });
  const [
    deleteJob,
    {
      isSuccess: isDeleteSuccess,
      isLoading: isDeleteLoading,
      isError: isDeleteError,
      error: deleteError,
    },
  ] = useDeleteJobMutation();
  const [
    updateJob,
    {
      isSuccess: isUpdateSuccess,
      isLoading: isUpdateLoading,
      isError: isUpdateError,
      error: updateError,
    },
  ] = useUpdateJobMutation();

  const navigate = useNavigate();
  console.log(job);

  const [jobName, setJobName] = useState(job.jobName);
  const [workers, setWorkers] = useState(job.usersOnJob);
  const [showAddWorker, setShowAddWorker] = useState(false);
  const [addWorkerInput, setAddWorkerInput] = useState("");

  const onJobNameChange = (e) => setJobName(e.target.value);
  const onAddWorkerChange = (e) => setAddWorkerInput(e.target.value);

  const addWorker = () => {
    setWorkers([...workers, addWorkerInput]);
    setAddWorkerInput("");
    setShowAddWorker(false);
  };
  const onDeleteClicked = async () => {
    await deleteJob(jobId);
  };
  const onSaveClicked = async () => {
    await updateJob({ jobId, jobName, usersOnJob: workers });
  };
  useEffect(() => {
    if (isDeleteSuccess) {
      navigate("/jobs");
    }
  }, [isDeleteSuccess, navigate]);
  useEffect(() => {
    if (isUpdateSuccess) {
      navigate(-1);
    }
  }, [isUpdateSuccess, navigate]);

  return (
    <Container>
      <Container centerContent>
        <Heading as="h3" size="lg">
          Edit Job
        </Heading>
      </Container>
      <FormControl isRequired>
        <FormLabel fontSize="2xl">Job Name</FormLabel>
        <Input
          type="text"
          isRequired
          value={jobName}
          onChange={onJobNameChange}
          size="lg"
        />
      </FormControl>
      <Text fontSize="2xl">Workers:</Text>
      {workers.map((worker) => (
        <Text key={worker} fontSize="2xl">
          {worker}
        </Text>
      ))}
      <Button onClick={() => setShowAddWorker(true)}>Add Worker</Button>

      {showAddWorker ? (
        <>
          <FormControl>
            <InputGroup>
              <Input
                type="text"
                size="lg"
                placeholder="Worker Name"
                value={addWorkerInput}
                onChange={onAddWorkerChange}
              />
              <InputRightElement>
                <Button onClick={addWorker}>Add</Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </>
      ) : null}

      <ButtonGroup>
        <Button onClick={onSaveClicked} width="full">
          Save Changes
        </Button>
        <Button onClick={onDeleteClicked} width="full">
          Delete Job
        </Button>
      </ButtonGroup>
    </Container>
  );
};
export default EditJob;
