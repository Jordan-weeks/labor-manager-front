import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'
import CustomButton from './CustomButton.jsx'
import Logo from './elements/Logo'
import styles from './styles/header.module.css'
const Header = () => {
  return (
    <header className={styles.header}>
      <Link to='/'>
        <Logo />
      </Link>
      <div className={styles['link-container']}>
        <Link to='login'>
          <CustomButton variant={'accent'}>Login</CustomButton>
        </Link>
        <Link to='create'>
          <CustomButton variant={'secondary'} size={{ base: 'md', sm: 'lg' }}>
            Register
          </CustomButton>
        </Link>
      </div>
    </header>
  )
}

export default Header
