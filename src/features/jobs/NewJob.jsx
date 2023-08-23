import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CustomButton from '../../components/CustomButton'
import Alert from '../../components/elements/Alert'
import { selectUserId } from '../auth/authSlice'
import { useAddJobMutation } from './jobsApiSlice'
import styles from './styles/new-job.module.css'

const NewJob = () => {
  const cx = classNames.bind(styles)
  const navigate = useNavigate()
  const userId = useSelector(selectUserId)
  const [jobName, setJobName] = useState('')
  const [jobNumber, setJobNumber] = useState('')

  const [addJob, { isLoading, isSuccess, isError, error }] = useAddJobMutation()

  const onJobNameChange = (e) => setJobName(e.target.value)
  const onJobNumberChange = (e) => setJobNumber(e.target.value)

  useEffect(() => {
    if (isSuccess) {
      navigate('/jobs')
    }
  }, [isSuccess, navigate])

  const onCreateJobSubmitted = async (e) => {
    e.preventDefault()
    await addJob({ jobName, userId, jobNumber })
  }
  return (
    <div className={cx('wrapper')}>
      <h1>Job Setup</h1>

      {isError ? (
        <Alert alertOpen={true} variant={'error'}>
          {error?.data?.message}
        </Alert>
      ) : null}

      <form
        onSubmit={onCreateJobSubmitted}
        className={cx('setup-form')}
        action=''
      >
        <label required htmlFor='Job name'>
          Job Name
        </label>
        <input value={jobName} onChange={onJobNameChange} type='text' />
        <label htmlFor='Job number'>Job Number</label>
        <input value={jobNumber} onChange={onJobNumberChange} type='text' />
        <CustomButton variant={'accent'} type={'submit'}>
          Create Job
        </CustomButton>
      </form>
    </div>
  )
}
export default NewJob
