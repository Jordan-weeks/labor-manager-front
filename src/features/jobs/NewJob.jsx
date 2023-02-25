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
import { useState, useEffect } from "react";
import { useAddJobMutation } from "./jobsApiSlice";
import { useSelector } from "react-redux";
import { selectUserId } from "../auth/authSlice";
import { useNavigate } from "react-router-dom";

const NewJob = () => {
  const navigate = useNavigate();
  const userId = useSelector(selectUserId);
  const [jobName, setJobName] = useState("");
  const [jobNumber, setJobNumber] = useState("");
  const [crews, setCrews] = useState([]);
  const [showAddCrew, setShowAddCrew] = useState(false);
  const [addCrewInput, setAddCrewInput] = useState("");

  const [addJob, { isLoading, isSuccess, isError, error }] =
    useAddJobMutation();

  const onJobNameChange = (e) => setJobName(e.target.value);
  const onJobNumberChange = (e) => setJobNumber(e.target.value);
  const onAddCrewChange = (e) => setAddCrewInput(e.target.value);

  const addCrew = () => {
    setCrews([...crews, addCrewInput]);
    setAddCrewInput("");
    setShowAddCrew(false);
  };
  useEffect(() => {
    if (isSuccess) {
      navigate("/jobs");
    }
  }, [isSuccess, navigate]);

  const onCreateJobClicked = async (e) => {
    e.preventDefault();
    await addJob({ jobName, userId, jobNumber });
  };
  return (
    <Container>
      <Container centerContent>
        <Heading as="h3" size="lg">
          Job Setup
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
                placeholder="Name"
                value={addCrewInput}
                onChange={onAddCrewChange}
              />
              <InputRightElement alignItems={"center"}>
                <Button onClick={addCrew}>Add</Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </>
      ) : null}

      <ButtonGroup>
        <Button onClick={onCreateJobClicked} width="full">
          Create Job
        </Button>
      </ButtonGroup>
    </Container>
  );
};
export default NewJob;
