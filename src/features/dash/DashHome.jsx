import { Link, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { selectUserData, selectUserId, setUserData } from '../auth/authSlice'
import { useGetUserDataQuery } from '../users/userApiSlice'

const DashHome = () => {
  const dispatch = useDispatch()
  const userId = useSelector(selectUserId)

  const { data: userData, isLoading } = useGetUserDataQuery(userId)

  if (isLoading) return <div>Loading...</div>
  return (
    <>
      <Text fontSize={'xl'}>Welcome {userData?.firstName} </Text>
      <Link as={RouterLink} to='settings'>
        User Settings
      </Link>
      <Link as={RouterLink} to='/jobs'>
        View jobs
      </Link>
    </>
  )
}
export default DashHome
