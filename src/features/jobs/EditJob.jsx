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
  Checkbox,
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
  const [jobNumber, setJobNumber] = useState(job.jobNumber);
  const [crews, setCrews] = useState(job.usersOnJob);
  const [showAddCrew, setShowAddCrew] = useState(false);
  const [addCrewInput, setAddCrewInput] = useState("");
  const [active, setActive] = useState(!job.active);

  const onJobNameChange = (e) => setJobName(e.target.value);
  const onJobNumberChange = (e) => setJobNumber(e.target.value);
  const onAddCrewChange = (e) => setAddCrewInput(e.target.value);
  const onActiveChange = (e) => {
    setActive(e.target.checked);
  };

  const addCrew = () => {
    setCrews([...crews, addCrewInput]);
    setAddCrewInput("");
    setShowAddCrew(false);
  };
  const onDeleteClicked = async () => {
    await deleteJob(jobId);
  };
  const onSaveClicked = async () => {
    await updateJob({
      jobId,
      jobName,
      jobNumber,
      usersOnJob: crews,
      active: !active,
    });
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
      <FormControl>
        <FormLabel fontSize="2xl">Job Number</FormLabel>
        <Input
          type="text"
          isRequired
          value={jobNumber}
          onChange={onJobNumberChange}
          size="lg"
        />
      </FormControl>
      <Text fontSize="2xl">Crew:</Text>
      {crews.map((crew) => (
        <Text key={crew} fontSize="2xl">
          {crew}
        </Text>
      ))}
      <Button onClick={() => setShowAddCrew(true)}>Add Crew</Button>

      {showAddCrew ? (
        <>
          <FormControl>
            <InputGroup>
              <Input
                type="text"
                size="lg"
                placeholder="Crew Name"
                value={addCrewInput}
                onChange={onAddCrewChange}
              />
              <InputRightElement>
                <Button onClick={addCrew}>Add</Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </>
      ) : null}
      <Checkbox isChecked={active} onChange={onActiveChange}>
        {" "}
        Job Complete
      </Checkbox>

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
