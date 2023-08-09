import { Link, Text } from '@chakra-ui/react'
import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import Logo from '../../components/elements/Logo'
import { selectUserData, selectUserId, setUserData } from '../auth/authSlice'
import { useGetUserDataQuery } from '../users/userApiSlice'
import DashSidebar from './DashSidebar'
import styles from './styles/dash-home.module.css'

const DashHome = () => {
  const dispatch = useDispatch()
  const userId = useSelector(selectUserId)

  const { data: userData, isLoading } = useGetUserDataQuery(userId)

  if (isLoading) return <div>Loading...</div>
  console.log(userData)
  return <div>This is the home</div>
}

export default DashHome
