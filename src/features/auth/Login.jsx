import React, { useState } from "react";
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
  Checkbox,
  Heading,
} from "@chakra-ui/react";
import {
  Container,
  ButtonGroup,
  Button,
  Flex,
  Box,
  Spacer,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "./authApiSlice";
import { setCredentials, loginState } from "./authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errMsg, setErrMsg] = useState("");

  const [login, { isLoading }] = useLoginMutation();

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const ShowHidePassword = () => {
    setShow(!show);
  };
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Add Error banner

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ email, password }).unwrap();

      dispatch(setCredentials({ accessToken }));
      dispatch(loginState({ email }));
      setEmail("");
      setPassword("");
      navigate("/dash");
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

  if (isLoading) return <p>Loading...</p>;
  return (
    <Container>
      <div>{errMsg}</div>
      <Container centerContent>
        <Heading as="h3" size="lg">
          Login
        </Heading>
      </Container>

      <FormLabel fontSize="2rem">Email</FormLabel>
      <Input value={email} onChange={onEmailChange} size="lg" />
      <FormLabel fontSize="2rem">Password</FormLabel>
      <InputGroup>
        <Input
          value={password}
          onChange={onPasswordChange}
          type={show ? "text" : "password"}
          size="lg"
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={ShowHidePassword}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <Flex minWidth="max-content">
        <Checkbox>Remember Me</Checkbox>
        <Spacer />
        <Link>Forgot Password?</Link>
      </Flex>

      <ButtonGroup>
        <Button onClick={handleSubmit} width="full">
          Login
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default Login;
