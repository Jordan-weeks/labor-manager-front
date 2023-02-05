import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData, selectUserId } from "../auth/authSlice";
// chackra components
import {
  Button,
  Container,
  Flex,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import {
  useUpdateUserMutation,
  useGetUserDataQuery,
} from "../users/userApiSlice";
import { setUserData } from "../auth/authSlice";
import { useNavigate } from "react-router-dom";

const SettingsForm = ({ userData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const userId = useSelector(selectUserId);
  // const {
  //   data: userData,
  //   isLoading: isUserLoading,
  //   isSuccess: isUserSuccess,
  // } = useGetUserDataQuery(userId);

  const [firstName, setFirstName] = useState(userData?.firstName);
  const [lastName, setLastName] = useState(userData?.lastName || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [phone, setPhone] = useState(userData?.phone || "");
  const [errorMsg, setErrorMsg] = useState("");
  const [validationError, setValidationError] = useState(false);

  const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  const onFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const onLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPhoneChange = (e) => {
    const formattedPhoneNumber = formatPhone(e.target.value);
    setPhone(formattedPhoneNumber);
  };

  const formatPhone = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(setUserData({ ...userData, firstName, lastName, email }));
      setFirstName("");
      navigate("/dash");
    }
  }, [isSuccess, navigate]);

  const onSaveChanges = () => {
    if (!EMAIL_REGEX.test(email)) {
      setErrorMsg("Please enter a valid email address: my-email@example.com");
      setValidationError(true);
    } else {
      setValidationError(false);
      sendUpdateRequest();
    }
  };
  const sendUpdateRequest = async () => {
    try {
      await updateUser({ id: userId, firstName, lastName, email, phone });
    } catch (err) {
      console.log(err);
    }
  };
  const errorAlert = () => {
    if (isError) {
      return (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>ERROR!</AlertTitle>
          <AlertDescription>{error?.data?.message}</AlertDescription>
        </Alert>
      );
    } else null;
  };
  const validationAlert = () => {
    if (validationError) {
      return (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>ERROR!</AlertTitle>
          <AlertDescription>{errorMsg}</AlertDescription>
        </Alert>
      );
    }
  };
  return (
    <Container mt={2}>
      {errorAlert()}
      {validationAlert()}
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
      <FormControl>
        <FormLabel>Contact Phone</FormLabel>
        <Input value={phone} onChange={onPhoneChange}></Input>
      </FormControl>
      <Button onClick={onSaveChanges}>Save Changes</Button>
    </Container>
  );
};
export default SettingsForm;
