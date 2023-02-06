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
} from "@chakra-ui/react";
import { useState } from "react";
import { useAddJobMutation } from "./jobsApiSlice";
import { useSelector } from "react-redux";
import { selectUserId } from "../auth/authSlice";

const NewJob = () => {
  const userId = useSelector(selectUserId);
  const [jobName, setJobName] = useState("");
  const [workers, setWorkers] = useState([]);
  const [showAddWorker, setShowAddWorker] = useState(false);
  const [addWorkerInput, setAddWorkerInput] = useState("");

  const onJobNameChange = (e) => setJobName(e.target.value);
  const onAddWorkerChange = (e) => setAddWorkerInput(e.target.value);

  const addWorker = () => {
    setWorkers([...workers, addWorkerInput]);
    setAddWorkerInput("");
    setShowAddWorker(false);
  };

  const [addJob, { isLoading, isSuccess, isError, error }] =
    useAddJobMutation();

  const createJobClicked = async (e) => {
    e.preventDefault();
    await addJob({ jobName, userId });
  };
  return (
    <Container>
      <Container centerContent>
        <Heading as="h3" size="lg">
          Create Job
        </Heading>
      </Container>
      <FormControl isRequired>
        <FormLabel fontSize="2xl">Job Name</FormLabel>
        <Input
          type="email"
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
        <Button disabled={true} width="full">
          Create Job
        </Button>
      </ButtonGroup>
    </Container>
  );
};
export default NewJob;
