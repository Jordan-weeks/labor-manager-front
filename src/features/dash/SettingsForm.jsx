import { useState } from "react";

import {
  Button,
  Container,
  Flex,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react";

const SettingsForm = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);

  const onFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const onLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  return (
    <Container>
      <FormControl>
        <FormLabel>First Name</FormLabel>
        <Input value={firstName} onChange={onFirstNameChange}></Input>
      </FormControl>
      <FormControl>
        <FormLabel>Last Name</FormLabel>
        <Input value={lastName} onChange={onLastNameChange}></Input>
      </FormControl>
      <Button>Save Changes</Button>
    </Container>
  );
};
export default SettingsForm;
