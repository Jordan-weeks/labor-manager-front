import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import {
  RiExpandLeftFill,
  RiExpandRightFill,
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
  const cx = classNames.bind(styles)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)

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
  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div className={cx('sidebar-wrapper')}>
      <div className={cx('sidebar-animation', { active: isOpen })}>
        <div className={cx(['sidebar', { active: isOpen }])}>
          {/* <div className={styles.closer}>
          <RiExpandLeftFill />
        </div> */}

          <div className={styles['svg-wrapper']}>
            <Logo className />
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
      </div>
      <div onClick={toggleOpen} className={cx('toggler', { active: isOpen })}>
        <RiExpandRightFill className={cx('toggler-svg', { active: isOpen })} />
      </div>
    </div>
  )
}
export default DashSidebar
