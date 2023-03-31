import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Link,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useSendLogoutMutation } from '../auth/authApiSlice'
import { logout } from '../auth/authSlice'

const Header = () => {
  const [sendLogout, { isLoading, isSuccess }] = useSendLogoutMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) {
      dispatch(logout)
      navigate('/')
    }
  }, [isSuccess, navigate])

  const logoutClicked = () => {
    sendLogout()
  }
  return (
    <Box>
      <Flex m='3'>
        <Heading size={'xl'}>JobBoost</Heading>
        <Spacer />
        <ButtonGroup>
          <Link as={RouterLink} to='/dash'>
            Home
          </Link>

          <Link onClick={() => logoutClicked()}>Logout</Link>
        </ButtonGroup>
      </Flex>
    </Box>
  )
}

export default Header
