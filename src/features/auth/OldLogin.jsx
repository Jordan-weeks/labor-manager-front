import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Spacer,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import usePersist from '../../hooks/usePersist'
import { useGetUserDataQuery } from '../users/userApiSlice'
import { useLoginMutation } from './authApiSlice'
import { setCredentials, setUserData, setUserId } from './authSlice'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [errMsg, setErrMsg] = useState('')

  const [login, { isLoading: isLoginLoading, isSuccess: isLoginSuccess }] =
    useLoginMutation()
  // const [getUserData, { data }] = useGetUserDataQuery(
  //   "63ca0fedc5d0cbf96cabdeaa"
  // );

  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [persist, setPersist] = usePersist()

  useEffect(() => {
    if (
      isLoginSuccess
      // || isUserDataSuccess
    ) {
      navigate('/dash')
    }
  }, [isLoginSuccess, navigate])

  const ShowHidePassword = () => {
    setShow(!show)
  }
  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }
  const onTogglePersist = () => setPersist((prev) => !prev)

  // Add Error banner

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { accessToken, userId } = await login({
        email,
        password,
      }).unwrap()

      dispatch(setCredentials({ accessToken }))
      dispatch(setUserId(userId))
      dispatch(setUserData(userData))

      setEmail('')
      setPassword('')
    } catch (err) {
      if (!err.status) {
        setErrMsg('No Server Response')
      } else if (err.status === 400) {
        setErrMsg('Missing Email or Password')
      } else if (err.status === 401) {
        setErrMsg('Unauthorized')
      } else {
        setErrMsg(err.data?.message)
      }
    }
  }

  if (isLoginLoading) return <p>Loading...</p>
  return (
    <Container>
      <div>{errMsg}</div>
      <Container centerContent>
        <Heading as='h3' size='lg'>
          Login
        </Heading>
      </Container>

      <FormLabel fontSize='2rem'>Email</FormLabel>
      <Input value={email} onChange={onEmailChange} size='lg' />
      <FormLabel fontSize='2rem'>Password</FormLabel>
      <InputGroup>
        <Input
          value={password}
          onChange={onPasswordChange}
          type={show ? 'text' : 'password'}
          size='lg'
        />
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={ShowHidePassword}>
            {show ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>
      <Flex minWidth='max-content'>
        <Checkbox defaultChecked={persist} onChange={onTogglePersist}>
          Remember Me
        </Checkbox>
        <Spacer />
        <Link>Forgot Password?</Link>
      </Flex>

      <ButtonGroup>
        <Button onClick={handleSubmit} width='full'>
          Login
        </Button>
      </ButtonGroup>
    </Container>
  )
}

export default Login
