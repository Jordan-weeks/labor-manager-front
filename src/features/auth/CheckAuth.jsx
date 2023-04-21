import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Layout from '../../components/Layout'
import LoggedInLayout from '../../components/LoggedInLayout.jsx'
import useAuth from '../../hooks/useAuth'
import usePersist from '../../hooks/usePersist'
import { useRefreshMutation } from './authApiSlice'
import { selectCurrentToken } from './authSlice'
const CheckAuth = () => {
  const [persist] = usePersist() // grab persist checkbox value from local storage
  const token = useSelector(selectCurrentToken)

  const effectRan = useRef(false) // for useEffect strict mode

  const [trueSuccess, setTrueSuccess] = useState(false)

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation() // isUninitialized if the refresh function has not been called yet.

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      // React 18 Strict Mode

      const verifyRefreshToken = async () => {
        await refresh()
        setTrueSuccess(true)
      }

      verifyRefreshToken()
    }

    return () => (effectRan.current = true)

    // eslint-disable-next-line
  }, [])

  let content

  if (!persist && !token) {
    // persist: no, token: no
    content = <Layout />

    if (token) {
      // persist: no, token: yes
      content = <LoggedInLayout />
    }
  } else if (isLoading) {
    //persist: yes, token: no
    content = <div>Loading...</div>
  } else if (isError) {
    //persist: yes, token: no
    console.log('No refresh token')
    content = <Layout />
  } else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes
    console.log('success')
    content = <LoggedInLayout />
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    console.log('token and uninit')
    console.log(isUninitialized)
    content = <LoggedInLayout />
  }

  return content
}

export default CheckAuth
