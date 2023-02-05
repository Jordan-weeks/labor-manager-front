import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import {
  InputGroup,
  Input,
  InputRightElement,
  Heading,
} from "@chakra-ui/react";
import { Container, ButtonGroup, Button, Flex, Spacer } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { useAddUserMutation } from "../users/userApiSlice";
import { useLoginMutation } from "./authApiSlice";
import { setCredentials, setUserData } from "./authSlice";

const CreateAccount = () => {
  const navigate = useNavigate();
  const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddUserMutation();
  const [login] = useLoginMutation();

  const ShowHidePassword = () => {
    setShow(!show);
  };
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const onConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  useEffect(() => {
    if (confirmPassword === "") {
      setConfirmPasswordError(false);
    } else if (confirmPassword !== password) {
      setConfirmPasswordError(true);
    } else {
      setConfirmPasswordError(false);
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    const result = [
      EMAIL_REGEX.test(email),
      PASSWORD_REGEX.test(password),
      PASSWORD_REGEX.test(confirmPassword),
    ];
    setButtonDisabled(!result.every(Boolean));
  }, [email, password, confirmPassword]);

  const handleLogin = async () => {
    try {
      const { accessToken, userData } = await login({
        email,
        password,
      }).unwrap();
      console.log(accessToken, userData);
      dispatch(setCredentials({ accessToken }));
      dispatch(setUserData({ userData }));
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Email or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
    }
  };

  const createUserClicked = async (e) => {
    e.preventDefault();
    await addNewUser({ email, password });
    await handleLogin();
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    navigate("/dash/settings");
  };

  return (
    <Container>
      <Container centerContent>
        <Heading as="h3" size="lg">
          Create Account
        </Heading>
      </Container>
      <FormControl isRequired>
        <FormLabel fontSize="2rem">Email</FormLabel>
        <Input
          type="email"
          isRequired
          value={email}
          onChange={onEmailChange}
          size="lg"
        />
        <FormHelperText>example@example.com</FormHelperText>
      </FormControl>

      <FormControl isRequired>
        <FormLabel fontSize="2rem">Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            size="lg"
            value={password}
            onChange={onPasswordChange}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={ShowHidePassword}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormHelperText>
          Minimum 8 characters with 1 uppercase letter, 1 lowercase letter and 1
          number.
        </FormHelperText>
      </FormControl>

      <FormControl isRequired isInvalid={confirmPasswordError}>
        <FormLabel fontSize="2rem">Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={"password"}
            size="lg"
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
          />
        </InputGroup>
        <FormErrorMessage>Passwords must match</FormErrorMessage>
      </FormControl>

      <Flex minWidth="max-content">
        <Link as={RouterLink} to="/login">
          Already have an account?
        </Link>
      </Flex>

      <ButtonGroup>
        <Button
          onClick={createUserClicked}
          disabled={buttonDisabled}
          width="full"
        >
          Create Account
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default CreateAccount;
