import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import CustomButton from '../../components/CustomButton'
import Alert from '../../components/elements/Alert'
import Logo from '../../components/elements/Logo'
import usePersist from '../../hooks/usePersist'
import { useLoginMutation } from './authApiSlice'
import { setCredentials, setUserData, setUserId } from './authSlice'
import styles from './styles/login.module.css'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [
    login,
    {
      isLoading: isLoginLoading,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
      error: loginError,
    },
  ] = useLoginMutation()

  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [persist, setPersist] = usePersist()

  useEffect(() => {
    if (isLoginSuccess) {
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { accessToken, userId } = await login({
      email,
      password,
    }).unwrap()

    dispatch(setCredentials({ accessToken }))
    dispatch(setUserId(userId))
    dispatch(setUserData(userData))
    setEmail('')
    setPassword('')
  }

  if (isLoginLoading) return <p>Loading...</p>

  return (
    <main className={styles.main}>
      <div className={styles['left-side']}>
        <Link to={'/'}>
          <Logo />
        </Link>

        <h1 className=''>Log in to your account</h1>
        {isLoginError ? (
          <Alert alertOpen={true} variant={'error'}>
            {loginError?.data?.message}
          </Alert>
        ) : null}
        <form onSubmit={() => console.log('logging')} action=''>
          <label htmlFor='email'>Email</label>
          <input value={email} onChange={onEmailChange} type='email'></input>

          <label htmlFor='password'>Password</label>
          <input
            value={password}
            onChange={onPasswordChange}
            type='password'
          ></input>
          <div>
            <label className={styles['check-label']} htmlFor='remember me'>
              <input
                defaultChecked={persist}
                onChange={onTogglePersist}
                className={styles.check}
                type='checkbox'
              />{' '}
              Keep me logged in
            </label>
          </div>

          <CustomButton
            onClick={handleSubmit}
            type={'submit'}
            variant={'accent'}
          >
            Log in
          </CustomButton>
        </form>
        <div className={styles['bottom-links']}>
          <Link to={'/password-reset'}>Forgot Password?</Link>
          <span>|</span>
          <Link to={'/create'}>Need an account?</Link>
        </div>
      </div>
      <div className={styles['right-side']}>
        <img src='src/assets/photo-1454694220579-9d6672b1ec2a.png' alt='' />
      </div>
    </main>
  )
}
export default Login
