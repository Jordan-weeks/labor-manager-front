import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import CustomButton from '../../components/CustomButton'
import Logo from '../../components/elements/Logo'
import { useSendLogoutMutation } from '../auth/authApiSlice'
import { logout } from '../auth/authSlice'
import styles from './styles/dash-header.module.css'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
    <header className={styles.header}>
      <Link to='/'>
        <Logo />
      </Link>
      <div className={styles['link-container']}>
        <Link to='/dash'>
          <CustomButton variant={'accent'}>Home</CustomButton>
        </Link>
        <Link>
          <CustomButton
            onClick={() => logoutClicked()}
            variant={'secondary'}
            size={{ base: 'md', sm: 'lg' }}
          >
            Logout
          </CustomButton>
        </Link>
      </div>
    </header>
  )
}

export default Header
