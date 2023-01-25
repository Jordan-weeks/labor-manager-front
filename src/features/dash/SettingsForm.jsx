import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUserData } from "../auth/authSlice";
import {
  Button,
  Container,
  Flex,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react";

const SettingsForm = () => {
  const userData = useSelector(selectUserData);
  const [firstName, setFirstName] = useState("user.firstName");
  const [lastName, setLastName] = useState("user.lastName");
  const [email, setEmail] = useState(userData.email);

  const onFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const onLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const onEmailChange = (e) => {
    setEmail(e.target.value);
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
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input value={email} onChange={onEmailChange}></Input>
      </FormControl>
      <Button>Save Changes</Button>
    </Container>
  );
};
export default SettingsForm;
