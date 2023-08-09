import { useEffect } from 'react'
import {
  RiHome7Line,
  RiLogoutBoxLine,
  RiSettings2Line,
  RiToolsLine,
} from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import Logo from '../../components/elements/Logo'
import { useSendLogoutMutation } from '../auth/authApiSlice.js'
import { logout, selectUserId } from '../auth/authSlice'
import { useGetUserDataQuery } from '../users/userApiSlice'
import styles from './styles/dash-sidebar.module.css'

const DashSidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userId = useSelector(selectUserId)
  const { data: userData, isLoading } = useGetUserDataQuery(userId)
  const [sendLogout, { isSuccess: isLogoutSuccess }] = useSendLogoutMutation()

  useEffect(() => {
    if (isLogoutSuccess) {
      dispatch(logout)
      navigate('/')
    }
  }, [isLogoutSuccess, navigate])
  const logoutClicked = () => {
    sendLogout()
  }
  return (
    <div className={styles.sidebar}>
      <div className={styles['svg-wrapper']}>
        <Logo className={styles.test} />
      </div>
      <img
        className={styles['profile-picture']}
        src='src/assets/test-profile.png'
        alt='profile picture'
      />
      <div className={styles['name-wrapper']}>
        Welcome Back
        <div>{userData?.firstName}</div>
      </div>
      <ul className={styles['link-list']}>
        <li className={styles['nav-link']}>
          <NavLink
            to={'/dash'}
            className={({ isActive }) =>
              isActive ? styles['active-link'] : ''
            }
          >
            <RiHome7Line />
            Dashboard
          </NavLink>
        </li>
        <li className={styles['nav-link']}>
          <NavLink
            to={'/jobs'}
            className={({ isActive }) =>
              isActive ? styles['active-link'] : ''
            }
          >
            <RiToolsLine />
            Jobs
          </NavLink>
        </li>
        <li className={styles['nav-link']}>
          <NavLink
            to={'/account'}
            className={({ isActive }) =>
              isActive ? styles['active-link'] : ''
            }
          >
            <RiSettings2Line />
            User Settings
          </NavLink>
        </li>
        <li className={styles['nav-link']}>
          <Link onClick={() => logoutClicked()}>
            <RiLogoutBoxLine />
            Logout
          </Link>
        </li>
      </ul>
    </div>
  )
}
export default DashSidebar
